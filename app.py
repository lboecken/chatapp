
from flask import Flask, send_from_directory
from flask_socketio import SocketIO, emit
from flask_sqlalchemy import SQLAlchemy

# Flask App init
app = Flask(__name__, static_folder="client/build", static_url_path="")

# Config
app.config['SECRET_KEY'] = 'secret'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://lennart:password@localhost:5432/chatapp'
# socket IO init
socketio = SocketIO(app)
# flask SQL Alchemy init
db = SQLAlchemy(app)


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    username = db.Column(db.String(80), nullable=False)
    password = db.Column(db.String(80), nullable=False)


class Channels(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(80), nullable=False)


class Messages(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    message = db.Column(db.Text, nullable=False)
    timestamp_utc = db.Column(db.Integer, nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(
        'channels.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

# Routing


@app.route("/", defaults={"path": ""})
@app.route("/<path>")
@app.route('/')
def index(path=False):
    return send_from_directory(app.static_folder, "index.html")


# Socket listeners
# test var for socket
messages = []


@socketio.on('connect event')
def handle_my_event(data):
    print('my event on server fired')
    print(data['data'])
    emit('welcome from server', {"message": 'hello from server'})


@socketio.on('new message')
def handle_new_message(payload):
    messages.append(payload['message'])
    new_db_entry = Messages(
        message=payload['message'], timestamp_utc=payload['timeStamp'], channel_id=1, user_id=1)
    db.session.add(new_db_entry)
    db.session.commit()
    db_messages = []
    query = db.session.query(Messages).all()
    for entry in query:
        print(entry.__dict__)
        updated_entry = {'message': entry.__dict__['message'],
                         'timeStamp': entry.__dict__['timestamp_utc']}
        db_messages.append(updated_entry)
    emit('messages from server', {
         "messages": messages, 'db_messages': db_messages}, broadcast=True, include_self=True)


@socketio.on('load all messages')
def handle_load_all_messages():
    db_messages = []
    query = db.session.query(Messages).all()
    for entry in query:
        print(entry.__dict__)
        updated_entry = {'message': entry.__dict__['message'],
                         'timeStamp': entry.__dict__['timestamp_utc']}
        db_messages.append(updated_entry)
    emit('messages from server', {
         "messages": messages, 'db_messages': db_messages})


if __name__ == "__main__":
    socketio.run(app)
