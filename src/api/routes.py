from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from api.models import db, User, Country, Language, Tag, Post
from api.utils import generate_sitemap, APIException
from datetime import datetime


api = Blueprint('api', __name__)

def set_password(password):
    return generate_password_hash(password)

def check_password(hash_password, password):
    return check_password_hash(hash_password, password)

@api.route('/login', methods=['POST'])
def login():
    if request.method =='POST':
        body = request.json

        # Form data retrieval.
        email = body.get('email', None)
        password = body.get('password', None)
        
        if (email is None) or (password is None):
            return jsonify({'error': 'Password or email needed'}), 400
        else:

            # Checking if data is correct.
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

@api.route('/getuser/<int:id>', methods=['GET'])
def get_user(id=None):
    if request.method =='GET':
        user = User.query.filter_by(id=id).first()

        if user:
            return jsonify(user.serialize()), 200
        else:
            return jsonify({"message": "User with the id provided doesn't exist"}), 404


@api.route('/sign_up', methods=['POST'])
def sign_up():
    if request.method =='POST':

        body = request.json
        languages = []

        # Retrieving the body data.
        name = body.get('name', None)
        email = body.get('email', None)
        password = body.get('password', None)
        languages_list = body.get('languages', None)
        country = body.get('country', None)
        city = body.get('city', None)
        is_school = body.get('is_school', None)

        # Checking if it is complete.
        if (email == "") or (password == "") or (name == "") or (languages_list == "") or (country == "") or (is_school == "") or (city == ""):
            return jsonify({'message': "Form incomplete."}), 400
        else:
            
            # Getting the languages objects using the list of languages received. And checking if the language doesn't exist.
            for i in languages_list:
                language = Language.query.filter_by(language=i).first()
                languages.append(language)
            if not languages:
                return jsonify({"message": "A language received is not supported."}), 400
            
            # Checking if the country exists.
            if not Country.query.filter_by(country=country).first():
                return jsonify({"message": "A country received is not supported."}), 400

            password_hash = generate_password_hash(password)

            # Database creation of User.
            # Location is hardcoded for the moment. 
            user = User(name=name, email=email, password=password_hash, languages=languages, country=country, city=city, is_school=False, is_active=True, location="10.489037 -66.93847")
            db.session.add(user)
            try:
                db.session.commit()
                return jsonify({"message": "User created successfully"}), 201
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

        # Checking if it is complete.
        if (title == "") or (description == "") or (location == "") or (tags_list == []) or (date == "") or (time == ""):
            return jsonify({'message': "Form incomplete."}), 400
        else:

            # Location formatting
            location = str(location["lat"]) + " " + str(location["lng"])
            
            # Date Time formatting
            # I gotta simplify this code
            date = date[:9].split("-")
            time = time.split(":")
            dateFormatted = date + time
            dateFormatted = datetime(int(dateFormatted[0]), int(dateFormatted[1]), int(dateFormatted[2]), int(dateFormatted[3]), int(dateFormatted[4]) )
            
            # Getting the tags objects using the list of tags received. And checking if the tag doesn't exist.
            for i in tags_list:
                tag = Tag.query.filter_by(tag_name=i).first()
                tags.append(tag)
            if not tags:
                return jsonify({"message": "A tag received is not supported."}), 400
            
            # Database creation of Post.
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
    if request.method =='GET':
        posts = Post.query.all()
        posts_list = []
        for post in posts:
            posts_list.append(post.serialize())

        return jsonify(posts_list), 200
    
@api.route('/getpost/<int:id>', methods=['GET'])
def get_post(id=None):
    if request.method =='GET':
        post = Post.query.filter_by(id=id).first()

        if post:
            return jsonify(post.serialize()), 200
        else:
            return jsonify({"error": "Post with the id provided doesn't exist"}), 404
