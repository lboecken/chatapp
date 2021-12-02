from flask import Flask, send_from_directory, request
from flask_socketio import SocketIO, emit
import socketio

app = Flask(__name__, static_folder="client/build", static_url_path="")
app.config['SECRET_KEY'] = 'secret'
socketio = SocketIO(app)

messages = []


@app.route('/')
def index():
    return send_from_directory(app.static_folder, "index.html")


@socketio.on('connect event')
def handle_my_event(data):
    print('my event on server fired')
    print(data['data'])
    emit('welcome from server', {"message": 'hello from Flask-socketIO'})


@socketio.on('ping_server')
def handle_ping_server(payload):
    print(payload)


@socketio.on('new message')
def handle_new_message(payload):
    messages.append(payload['message'])
    print(messages)
    emit('messages from server', {
         "messages": messages}, broadcast=True, include_self=True)


if __name__ == "__main__":
    socketio.run(app)
