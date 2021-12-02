from flask import Flask, send_from_directory, request
from flask_socketio import SocketIO, emit
from flask_sqlalchemy import SQLAlchemy

# Flask App init
app = Flask(__name__, static_folder="client/build", static_url_path="")
# socket IO config + init
app.config['SECRET_KEY'] = 'secret'
socketio = SocketIO(app)
# flask SQL Alchemy Config + init
app.config['SQLALCHEMY_DATABSE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)
# test var for socket
messages = []


@app.route("/", defaults={"path": ""})
@app.route("/<path>")
@app.route('/')
def index(path=False):
    return send_from_directory(app.static_folder, "index.html")


@socketio.on('connect event')
def handle_my_event(data):
    print('my event on server fired')
    print(data['data'])
    emit('welcome from server', {"message": 'hello from Flask-socketIO'})


@socketio.on('new message')
def handle_new_message(payload):
    messages.append(payload['message'])
    print(messages)
    emit('messages from server', {
         "messages": messages}, broadcast=True, include_self=True)


@socketio.on('load all messages')
def handle_load_all_messages():
    return messages


if __name__ == "__main__":
    socketio.run(app)
