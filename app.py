
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


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120))
    name = db.Column(db.String(80))
    password = db.Column(db.String(80))

    def __repr__(self):
        return '<User %r>' % self.username


class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.Text)
    time_stamp = db.Column(db.String(80), primary_key=True)

    def __repr__(self) -> str:
        return '<Message %r>' % self.message
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
    new_db_entry = Message(
        message=payload['message'], time_stamp=payload['timeStamp'])
    db.session.add(new_db_entry)
    db.session.commit()
    db_messages = []
    query = db.session.query(Message).all()
    for entry in query:
        print(entry.__dict__)
        updated_entry = {'message': entry.__dict__['message'],
                         'timeStamp': entry.__dict__['time_stamp']}
        db_messages.append(updated_entry)
    emit('messages from server', {
         "messages": messages, 'db_messages': db_messages}, broadcast=True, include_self=True)


@socketio.on('load all messages')
def handle_load_all_messages():
    db_messages = []
    query = db.session.query(Message).all()
    for entry in query:
        print(entry.__dict__)
        updated_entry = {'message': entry.__dict__['message'],
                         'timeStamp': entry.__dict__['time_stamp']}
        db_messages.append(updated_entry)
    emit('messages from server', {
         "messages": messages, 'db_messages': db_messages})


if __name__ == "__main__":
    socketio.run(app)
