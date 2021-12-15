import pprint
from flask import send_from_directory, request, session
from flask_login import current_user, login_user, logout_user
from flask_socketio import emit, disconnect
from server import app, db, socketio, login_manager, flask_sess
from server.sql_models import Users, Channels, Messages
from server.auth import authenticated_only


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
        print(data)
        print(session)
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


@app.route('/api/logout', methods=['POST'])
def logout():
    logout_user()
    disconnect()
    return 'logged out'


@socketio.on('new message')
@authenticated_only
def handle_new_message(payload):
    print(session)
    new_db_entry = Messages(
        message=payload['message'], timestamp_utc=payload['timeStamp'], channel_id=1, user_id=session['_user_id'])
    db.session.add(new_db_entry)
    db.session.commit()
    new_message = {
        'message': payload['message'],
        'timeStamp': payload['timeStamp'],
        'userID': session['_user_id']
    }
    emit('message from server', {
         "db_message": new_message}, broadcast=True, include_self=True)


@socketio.on('load all messages')
@authenticated_only
def handle_load_all_messages():
    db_messages = []
    query = db.session.query(Messages).all()
    for entry in query:
        updated_entry = {'message': entry.message,
                         'timeStamp': entry.timestamp_utc,
                         'userID': entry.user_id}
        db_messages.append(updated_entry)
    return {'db_messages': db_messages}


if __name__ == "__main__":
    socketio.run(app)
