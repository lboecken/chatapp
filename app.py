import os
import functools
from dotenv import load_dotenv
from flask import Flask, send_from_directory, request, session
from flask_login import LoginManager, login_user, logout_user, current_user, UserMixin
from flask_session import Session
from flask_socketio import SocketIO, emit, join_room, leave_room, disconnect
from flask_sqlalchemy import SQLAlchemy
from passlib.hash import sha256_crypt
from server import app, db, socketio
from server.auth import authenticated_only
from server.sql_models import Rooms, Users, Messages
import server.http_socketio_endpoints


@app.route('/', defaults={'path': ''})
@app.route('/<path>')
def index(path):
    return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    socketio.run(app)
