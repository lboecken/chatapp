from flask import session
from flask_socketio import leave_room, join_room, emit
from server import db, socketio
from server.sql_models import Users, Rooms, Messages
from server.auth import authenticated_only


@socketio.on('update-room')
@authenticated_only
def update_room(payload):
    if 'room' in session:
        leave_room(session.get('room'))
    room_info = Rooms.query.filter(Rooms.name == payload['roomName']).first()
    session['room'] = room_info.id
    join_room(room_info.id)
    return 'room updated'


@socketio.on('new-message')
@authenticated_only
def handle_new_message(payload):
    user = db.session.query(Users).filter(
        Users.id == session.get('_user_id')).first()
    new_message = {
        'message': payload['message'],
        'timeStamp': payload['timeStamp'],
        'userName': user.username
    }
    emit('message-from-server', {
         "db_message": new_message}, broadcast=True, include_self=True, to=session.get('room'))
    new_db_entry = Messages(
        message=payload['message'],
        timestamp_utc=payload['timeStamp'],
        room_id=session.get('room'),
        user_id=session.get('_user_id'))
    db.session.add(new_db_entry)
    db.session.commit()


@socketio.on('load-all-messages')
@authenticated_only
def handle_load_all_messages():
    db_messages = []
    query = db.session.query(Messages).filter(
        Messages.room_id == session.get('room')).all()
    for entry in query:
        updated_entry = {'message': entry.message,
                         'timestamp': entry.timestamp_utc,
                         'userName': entry.user.username}
        db_messages.insert(0, updated_entry)
    return {'db_messages': db_messages}
