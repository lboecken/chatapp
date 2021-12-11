from flask_login import UserMixin
from server import db


class Users(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    username = db.Column(db.String(80), nullable=False, unique=True)
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
