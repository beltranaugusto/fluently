from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey

# 03/04/23
# I achieved something I was stuck on. A User should be able to select multiple Languages when creating its account.
# I wasn't very clear on which approach to take at the beginning, but at the end I settled with a Many to Many Relationship.


db = SQLAlchemy()

# This declares how tables User and Language will connect.
user_languages = db.Table('user_languages',
    db.Column('user_id', db.Integer, ForeignKey('user.id'), primary_key=True),
    db.Column('language_name', db.String(50), ForeignKey('language.language'), primary_key=True)
)

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(500), unique=False, nullable=False)
    email = db.Column(db.String(500), unique=True, nullable=False)
    password = db.Column(db.String(500), unique=False, nullable=False)
    country = db.Column(db.String(50), ForeignKey("country.country"), nullable=False)
    city = db.Column(db.String(100), unique=False, nullable=False)

    # I declare the relationship in User, using the 'secondary' parameter with 'user_languages' as the value.
    languages = db.relationship('Language', secondary=user_languages, backref=db.backref('users', lazy=True))

    is_school = db.Column(db.Boolean(), nullable=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
class Language(db.Model):
    __tablename__ = "language"
    id = db.Column(db.Integer, primary_key=True)
    language = db.Column(db.String(120), unique=True, nullable=False)
    def __repr__(self):
        return f'<Language {self.language}>'

class Country(db.Model):
    __tablename__ = "country"
    id = db.Column(db.Integer, primary_key=True)
    country = db.Column(db.String(120), unique=True, nullable=False)
    user = db.relationship('User', backref='User Country')
    def __repr__(self):
        return f'<Country {self.country}>'

