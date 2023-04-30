from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from api.models import db, User, Country, Language, Tag, Post
from api.utils import generate_sitemap, APIException
from datetime import datetime
from sqlalchemy import desc

api = Blueprint('api', __name__)

def set_password(password):
    return generate_password_hash(password)

def check_password(hash_password, password):
    return check_password_hash(hash_password, password)

@api.route('/login', methods=['POST'])
def login():
    if request.method =='POST':

        body = request.json
        email = body.get('email', '')
        password = body.get('password', '')
        form = {'email': email, 'password':password}
        
        for key, value in list(form.items()):
            if value == '':
                return jsonify({'error': key + ' is missing from the form.'}), 400
  
        login = User.query.filter_by(email=email).one_or_none()
        if login is None:
            return jsonify({'error': 'Bad credentials'}), 400
        else:
            # Creation of Login Token.
            if check_password(login.password, password):
                access_token = create_access_token(identity=login.id)
                return jsonify({ 'token': access_token, 'user_data':login.serialize() }), 200
            else:
                return jsonify({'error': 'Bad credentials'}), 400

@api.route('/sign_up', methods=['POST'])
def sign_up():
    if request.method =='POST':

        body = request.json
        name = body.get('name', None)
        email = body.get('email', None)
        password = body.get('password', None)
        languages_list = body.get('languages', None)
        country = body.get('country', None)
        city = body.get('city', None)
        is_school = body.get('is_school', None)
        about_me = body.get('about_me', None)

        form = {'name': name, 'email':email, 'password': password, 'languages_list': languages_list, 'country': country, 'city': city, 'is_school': is_school, 'about_me': about_me}
        for key, value in list(form.items()):
            if value == '':
                return jsonify({'error': key + ' is missing from the form.'}), 400

        languages = []
        for i in languages_list:
            language = Language.query.filter_by(language=i).first()
            languages.append(language)
        if not languages:
            return jsonify({"message": "A language received is not supported."}), 400
        
        if not country:
            return jsonify({"message": "A country received is not supported."}), 400

        password_hash = generate_password_hash(password)
        user = User(name=name, email=email, password=password_hash, languages=languages, country=country, city=city, about_me=about_me, is_school=is_school, is_active=True)
        db.session.add(user)
        try:
            db.session.commit()
            return jsonify({"message": "User created successfully"}), 201
        except Exception as error:
            print(error.args)
            db.session.rollback()
            return  jsonify({"message": f"Error: {error.args}", "error": "error"}), 500
            
@api.route('/getuser/<int:id>', methods=['GET'])
def get_user(id=None):
    if request.method =='GET':
        user = User.query.filter_by(id=id).first()
        if user:
            return jsonify(user.serialize()), 200
        else:
            return jsonify({"error": "User with the id provided doesn't exist"}), 404

@api.route('/follow', methods=['POST'])
def follow():
    if request.method =='POST':

        body = request.json

        user1_id = body.get('user1_id', None)
        user2_id = body.get('user2_id', None)

        user1 = User.query.filter_by(id=user1_id).first()
        user2 = User.query.filter_by(id=user2_id).first()

        try:
            if user1.is_following(user2):
                user1.unfollow(user2)
                db.session.commit()
                return jsonify({"message": "Unfollowed user successfully"}), 200
            else:
                user1.follow(user2)
                db.session.commit()
                return jsonify({"message": "Followed user successfully"}), 200
        except Exception as error:
            print(error.args)
            db.session.rollback()
            return  jsonify({"message": f"Error: {error.args}", "error": "error"}), 500

@api.route('/checkemail/<string:email>', methods=['GET'])
def checkemail(email=None):
    if request.method =='GET':
        if User.query.filter_by(email=email).first():
            return jsonify({'error': 'User with that email already exists'}), 400
        else:
            return jsonify({'success': 'Email available'}), 200
                
@api.route('/createpost', methods=['POST'])
def createpost():
    if request.method =='POST':

        body = request.json
        tags = []
        dateFormatted = []

        # Retrieving the body data.
        title = body.get('title', None)
        description = body.get('description', None)
        tags_list = body.get('tags', None)
        date = body.get('date', None)
        time = body.get('hour', None)
        user_id = body.get('user_id', None)
        location = body.get('position', None)

        form = {'title': title, 'description':description, 'tags_list': tags_list, 'date': date, 'time': time, 'user_id': user_id, 'location': location}
        for key, value in list(form.items()):
            if value == '':
                return jsonify({'error': key + ' is missing from the form.'}), 400

        # Location formatting
        location = str(location["lat"]) + " " + str(location["lng"])
        print(date)
        print(time)
        # Date Time formatting
        # I gotta simplify this code
        date = date[:10].split("-")
        time = time.split(":")
        dateFormatted = date + time
        dateFormatted = datetime(int(dateFormatted[0]), int(dateFormatted[1]), int(dateFormatted[2]), int(dateFormatted[3]), int(dateFormatted[4]) )
        
        # Getting the tags objects using the list of tags received. And checking if the tag doesn't exist.
        for i in tags_list:
            tag = Tag.query.filter_by(tag_name=i).first()
            tags.append(tag)
        if not tags:
            return jsonify({"message": "A tag received is not supported."}), 400
        
        post = Post(title=title, description=description, location=location, tags=tags, date=dateFormatted, user=user_id)
        db.session.add(post)
        try:
            db.session.commit()
            return jsonify({"message": "Post created successfully"}), 201
        except Exception as error:
            print(error.args)
            db.session.rollback()
            return  jsonify({"message": f"Error: {error.args}", "error": "error"}), 500
                    
@api.route('/getposts', methods=['GET'])
def getting_posts():
    if request.method == 'GET':
        page = request.args.get('page', default=1, type=int)
        limit = request.args.get('limit', default=10, type=int)
        posts = Post.query.order_by(desc(Post.id)).paginate(page=page, per_page=limit)
        posts_list = [post.serialize() for post in posts.items]
        return jsonify(posts_list), 200

@api.route('/getpost/<int:id>', methods=['GET'])
def get_post(id=None):
    if request.method =='GET':
        post = Post.query.filter_by(id=id).first()
        if post:
            return jsonify(post.serialize()), 200
        else:
            return jsonify({"error": "Post with the id provided doesn't exist"}), 404
        

