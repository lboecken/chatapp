from passlib.hash import sha256_crypt
from flask import request, send_from_directory
from flask_login import login_user, current_user, logout_user
from server import app, db
from server.sql_models import Users


@app.route('/', defaults={'path': ''})
@app.route('/<path>')
def index(path):
    return send_from_directory(app.static_folder, "index.html")


@app.route('/api/register', methods=['POST'])
def register_new_user():
    if request.method == 'POST':
        data = request.get_json(silent=True)
        hashed_password = sha256_crypt.hash(data['password'])
        new_db_entry = Users(
            username=data['username'], password=hashed_password)
        db.session.add(new_db_entry)
        db.session.commit()
        return 'success'
    else:
        return '405 METHOD NOT ALLOWED'


@app.route('/api/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.get_json(silent=True)
        try:
            user = Users.query.filter_by(username=data['username']).first()
            if sha256_crypt.verify(data['password'], user.password):
                login_user(user, remember=False)
                return 'logged in '
            return 'wrong password'
        except AttributeError:
            return 'invalid username'
    else:
        return '405 METHOD NOT ALLOWED'


@app.route('/api/validate-previous-session', methods=['POST'])
def validate_previous_session():
    if current_user.is_authenticated:
        return 'valid'
    return 'invalid'


@app.route('/api/logout', methods=['POST'])
def logout():
    logout_user()
    return 'logged out'


