import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_session import Session
from flask_socketio import SocketIO


def config_app(app):
    app.config['DEBUG'] = os.environ['DEBUG']
    app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = os.environ['SQLALCHEMY_TRACK_MODIFICATIONS']
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
    app.config['SESSION_TYPE'] = os.environ['SESSION_TYPE']
    app.config['SESSION_SQLALCHEMY_TABLE'] = os.environ['SESSION_SQLALCHEMY_TABLE']
    app.config['REMEMBER_COOKIE_DURATION'] = os.environ['REMEMBER_COOKIE_DURATION']


def create_app():
    app = Flask(__name__, static_folder="../client/build", static_url_path="")
    config_app(app)
    db = SQLAlchemy(app)
    app.config['SESSION_SQLALCHEMY'] = db
    flask_sess = Session(app)
    socketio = SocketIO(app, manage_session=False)
    login_manager = LoginManager()
    login_manager.init_app(app)

    return [app, db, socketio, login_manager, flask_sess]


app, db, socketio, login_manager, flask_sess = create_app()
