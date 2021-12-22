import os
from dotenv import load_dotenv
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_session import Session
from flask_socketio import SocketIO


def config_app(app):
    load_dotenv()
    app.config['DEBUG'] = os.getenv('DEBUG')
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['SESSION_TYPE'] = os.getenv('SESSION_TYPE')
    app.config['SESSION_SQLALCHEMY_TABLE'] = os.getenv(
        'SESSION_SQLALCHEMY_TABLE')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = os.getenv(
        'SQLALCHEMY_TRACK_MODIFICATIONS')
    database_uri = os.getenv('DATABASE_URL')
    if database_uri.startswith('postgres://'):
        database_uri = database_uri.replace("postgres://", "postgresql://", 1)
    app.config['SQLALCHEMY_DATABASE_URI'] = database_uri


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
