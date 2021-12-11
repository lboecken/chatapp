import functools
from flask import send_from_directory, request
from flask_login import current_user, login_user, logout_user, UserMixin
from flask_socketio import emit, disconnect
from server.create_app import app, db, socketio, login_manager, flask_sess
from server.sql_models import Users, Channels, Messages


@login_manager.user_loader
def load_user(user_id):
    return Users.query.get(int(user_id))


def authenticated_only(f):
    @functools.wraps(f)
    def wrapped(*args, **kwargs):
        if not current_user.is_authenticated:
            disconnect()
        else:
            return f(*args, **kwargs)
    return wrapped


# class Users(UserMixin, db.Model):
#     id = db.Column(db.Integer, primary_key=True, nullable=False)
#     username = db.Column(db.String(80), nullable=False, unique=True)
#     password = db.Column(db.String(80), nullable=False)


# class Channels(db.Model):
#     id = db.Column(db.Integer, primary_key=True, nullable=False)
#     name = db.Column(db.String(80), nullable=False)


# class Messages(db.Model):
#     id = db.Column(db.Integer, primary_key=True, nullable=False)
#     message = db.Column(db.Text, nullable=False)
#     timestamp_utc = db.Column(db.Integer, nullable=False)
#     channel_id = db.Column(db.Integer, db.ForeignKey(
#         'channels.id'), nullable=False)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)


# Routing
@app.route('/', defaults={'path': ''})
@app.route('/<path>')
def index(path):
    return send_from_directory(app.static_folder, "index.html")


@app.route('/api/register', methods=['POST'])
def register_new_user():
    if request.method == 'POST':
        data = request.get_json(silent=True)
        new_db_entry = Users(
            username=data['username'], password=data['password'])
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
            if data['password'] == user.password:
                login_user(user)
                return 'logged in '
            return 'wrong password'
        except AttributeError:
            return 'invalid username'
    else:
        return '405 METHOD NOT ALLOWED'


@app.route('/api/logout')
def logout():
    logout_user()
    return 'logged out'


@socketio.on('connect event')
@authenticated_only
def handle_my_event(data):
    print('my event on server fired')
    print(data['data'])
    emit('welcome from server', {"message": 'hello from server'})


@socketio.on('new message')
@authenticated_only
def handle_new_message(payload):
    new_db_entry = Messages(
        message=payload['message'], timestamp_utc=payload['timeStamp'], channel_id=1, user_id=1)
    db.session.add(new_db_entry)
    db.session.commit()
    db_messages = []

    def emit_new_messages():
        query = db.session.query(Messages).all()
        for entry in query:
            print(entry.__dict__)
            updated_entry = {'message': entry.__dict__['message'],
                             'timeStamp': entry.__dict__['timestamp_utc'],
                             'userID': entry.__dict__['user_id']}
            db_messages.append(updated_entry)
        emit('messages from server', {
            'db_messages': db_messages}, broadcast=True, include_self=True)
    emit_new_messages()


@socketio.on('load all messages')
@authenticated_only
def handle_load_all_messages():
    db_messages = []
    query = db.session.query(Messages).all()
    for entry in query:
        print(entry.__dict__)
        updated_entry = {'message': entry.__dict__['message'],
                         'timeStamp': entry.__dict__['timestamp_utc'],
                         'userID': entry.__dict__['user_id']}
        db_messages.append(updated_entry)
    emit('messages from server', {
         'db_messages': db_messages})


if __name__ == "__main__":
    socketio.run(app)
