from passlib.hash import sha256_crypt
from flask import request, session
from flask_login import login_user, current_user, logout_user
from flask_socketio import leave_room, join_room, emit
from server import app, db, socketio
from server.sql_models import Users, Rooms, Messages
from server.auth import authenticated_only


@app.route('/api/register', methods=['POST'])
def register_new_user():
    if request.method == 'POST':
        data = request.get_json(silent=True)
        hashed_password = sha256_crypt.hash(data['password'])
        print(hashed_password)
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


@socketio.on('update room')
@authenticated_only
def update_room(payload):
    if 'room' in session:
        leave_room(session.get('room'))
    room_info = Rooms.query.filter(Rooms.name == payload['roomName']).first()
    session['room'] = room_info.id
    join_room(room_info.id)
    return 'room updated'


@socketio.on('new message')
@authenticated_only
def handle_new_message(payload):
    user = db.session.query(Users).filter(
        Users.id == session.get('_user_id')).first()
    new_message = {
        'message': payload['message'],
        'timeStamp': payload['timeStamp'],
        'userID': user.username
    }
    emit('message from server', {
         "db_message": new_message}, broadcast=True, include_self=True, to=session.get('room'))
    new_db_entry = Messages(
        message=payload['message'],
        timestamp_utc=payload['timeStamp'],
        room_id=session.get('room'),
        user_id=session.get('_user_id'))
    db.session.add(new_db_entry)
    db.session.commit()


@socketio.on('load all messages')
@authenticated_only
def handle_load_all_messages():
    db_messages = []
    print(session.get('room'))
    query = db.session.query(Messages).filter(
        Messages.room_id == session.get('room')).all()
    for entry in query:
        print(entry.__dict__)
        print(entry.user)
        print(entry.user.__dict__)
        updated_entry = {'message': entry.message,
                         'timeStamp': entry.timestamp_utc,
                         'userID': entry.user.username}
        db_messages.insert(0, updated_entry)
    return {'db_messages': db_messages}
