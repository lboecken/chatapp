from server import db, app, socketio, http_routing, socketio_events

if __name__ == "__main__":
    socketio.run(app)
