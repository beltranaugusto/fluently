from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey

# 03/04/23
# I achieved something I was stuck on. A User should be able to select multiple Languages when creating its account.
# I wasn't very clear on which approach to take at the beginning, but at the end I settled with a Many to Many Relationship.


db = SQLAlchemy()

followers = db.Table(
    'followers',
    db.Column('follower_id', db.Integer, ForeignKey('user.id'), primary_key=True),
    db.Column('followed_id', db.Integer, ForeignKey('user.id'), primary_key=True)
)

user_languages = db.Table('user_languages',
    db.Column('user_id', db.Integer, ForeignKey('user.id'), primary_key=True),
    db.Column('language_name', db.String(50), ForeignKey('language.language'), primary_key=True)
)

post_tags = db.Table('post_tags',
    db.Column('post_id', db.Integer, ForeignKey('post.id'), primary_key=True),
    db.Column('tag_name', db.String(120), ForeignKey('tag.tag_name'), primary_key=True)
)

event_attendees = db.Table('event_attendees',
    db.Column('user_id', db.Integer(), ForeignKey('user.id'), primary_key=True),
    db.Column('post_id', db.Integer(), ForeignKey('post.id'), primary_key=True)
)

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(500), unique=False, nullable=False)
    email = db.Column(db.String(500), unique=True, nullable=False)
    password = db.Column(db.String(500), unique=False, nullable=False)
    country = db.Column(db.String(50), ForeignKey("country.country"), nullable=False)
    city = db.Column(db.String(100), unique=False, nullable=False)
    posts = db.relationship('Post', backref='user_posts')
    about_me = db.Column(db.String(800), unique=False, nullable=False, default="About me...")

    followed = db.relationship(
        'User', secondary=followers,
        primaryjoin=(followers.c.follower_id == id),
        secondaryjoin=(followers.c.followed_id == id),
        backref=db.backref('followers', lazy='dynamic'), lazy='dynamic')

    # I declare the relationship in User, using the 'secondary' parameter with 'user_languages' as the value.
    languages = db.relationship('Language', secondary=user_languages, backref=db.backref('users', lazy=True))

    is_school = db.Column(db.Boolean(), nullable=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False, default=False)

    def follow(self, user):
        if not self.is_following(user):
            self.followed.append(user)

    def unfollow(self, user):
        if self.is_following(user):
            self.followed.remove(user)

    def is_following(self, user):
        return self.followed.filter(
            followers.c.followed_id == user.id).count() > 0

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        print(self.followed)

        posts = []
        languages = []
        followed = []

        for item in self.followed:
            followed.append({"id": item.id, "name": item.name})

        for item in self.posts:
            posts.append(item.serialize())

        for item in self.languages:
            languages.append(item.language)

        return{
            "id":self.id,
            "name": self.name,
            "email": self.email,
            "country": self.country,
            "city": self.city,
            "posts": posts,
            "languages": languages,
            "about_me": self.about_me,
            "is_school": self.is_school,
            "followed": followed
            }
    
    
class Language(db.Model):
    __tablename__ = "language"
    id = db.Column(db.Integer, primary_key=True)
    language = db.Column(db.String(120), unique=True, nullable=False)
    def __repr__(self):
        return f'<Language {self.language}>'
    def serialize(self):
        return {
            "language": self.language,
        }

class Country(db.Model):
    __tablename__ = "country"
    id = db.Column(db.Integer, primary_key=True)
    country = db.Column(db.String(120), unique=True, nullable=False)
    user = db.relationship('User', backref='User Country')
    def __repr__(self):
        return f'<Country {self.country}>'

class Post(db.Model):
    __tablename__ = "post"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), unique=False, nullable=False)
    description = db.Column(db.String(2000), unique=False, nullable=False)
    user = db.Column(db.Integer(), ForeignKey("user.id"), nullable=False)   
    date = db.Column(db.DateTime, nullable=False)
    # Location need to have this format to work with the maps: "21.442 8.234". A string with two numbers
    location = db.Column(db.String(400), unique=False, nullable=False)

    tags = db.relationship('Tag', secondary=post_tags, backref=db.backref('posts', lazy=True))
    attendees = db.relationship('User', secondary=event_attendees, backref='events_attended')

    def __repr__(self):
        return f'<Post {self.title}>'
    
    def serialize(self):

    
        tags = []
        attendees = []
        languages = []
        location = self.location.split(" ")

        for item in self.tags:
            tags.append([item.tag_name, item.tag_color])

        for item in self.attendees:
            attendees.append([item.name, item.id])

        for item in self.user_posts.languages:
            languages.append(item.language)

        return{
            "id":self.id,
            "user_name": self.user_posts.name,
            "user_languages": languages,
            "user_country": self.user_posts.country,
            "user_city": self.user_posts.city,
            "user_id": self.user,
            "title": self.title,
            "description":self.description,
            "tags":tags,
            "date":self.date,
            "location": [float(location[0]), float(location[1])],
            "attendees": attendees
            }
    

class Tag(db.Model):
    __tablename__ = "tag"
    id = db.Column(db.Integer, primary_key=True)
    tag_name = db.Column(db.String(120), unique=True, nullable=False)
    tag_color = db.Column(db.String(120), unique=False, nullable=False)
    def __repr__(self):
        return f'<Tag {self.tag_name}>'