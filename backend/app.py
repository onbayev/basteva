#!/usr/bin/env python
import os
import argparse
import json
import sys
import datetime
import time

from flask import Flask, jsonify
from flask import request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt import JWT, jwt_required, current_identity
from werkzeug.security import safe_str_cmp
from flask_sqlalchemy import SQLAlchemy
from models import db, Instance

# Variables
POSTGRES = { 'user': os.getenv('PG_USER', 'basteva'), 
    'pw':   os.getenv('POSTGRES_PASSWORD', 'postgres'),
    'db':   os.getenv('POSTGRES_DB', 'basteva'),
    'host': os.getenv('POSTGRES_HOST', 'localhost'),
    'port': os.getenv('POSTGRES_PORT', 5432)}



# User model
class User(object):
    def __init__(self, id, username, password):
        self.id = id
        self.username = username
        self.password = password

    def __str__(self):
        return "User(id='%s')" % self.id
users = [
    User(1, 'admin', 'admin'),
]

username_table = {u.username: u for u in users}
userid_table = {u.id: u for u in users}

def authenticate(username, password):
    user = username_table.get(username, None)
    print(user, file=sys.stderr)
    print(username, file=sys.stderr)
    print(password, file=sys.stderr)
    if user and safe_str_cmp(user.password.encode('utf-8'), password.encode('utf-8')):
        return user

def identity(payload):
    user_id = payload['identity']
    return userid_table.get(user_id, None)

# App config 
app = Flask(__name__)
app.debug = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%(user)s:%(pw)s@%(host)s:%(port)s/%(db)s' % POSTGRES
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

app.config['SECRET_KEY'] = 'super-secret'
jwt = JWT(app, authenticate, identity)

@app.route('/me', methods=['GET'])
@jwt_required()
def get_me():
    return "Hello World"

@app.route('/api/instance', methods=['POST'])
@jwt_required()
def handle_instance():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            print("--------------------------------------", file=sys.stderr)
            print(data, file=sys.stderr)
            new_instance = Instance(name=data['name'], ip=data['ip'], fqdn=data['fqdn'], user=data['user'], password=data['password'], ssh_key=data['ssh_key'])
            db.session.add(new_instance)
            db.session.commit()
            return {"message": f"Instance {new_instance.name} has been created successfully."}
        else:
            return {"error": "The request payload is not in JSON format"}

@app.route('/api/instances', methods=['GET'])
@jwt_required()
def get_instance():
    if request.method == 'GET':
        instances = Instance.query.all()
        results = [
            {
                "name": instance.name,
                "ip": instance.ip,
                "fqdn": instance.fqdn,
                "user": instance.user,
                "password": instance.password,
                "ssh_key": instance.ssh_key
            } for instance in instances]

        return {"count": len(results), "instances": results}

if __name__ == '__main__':
    APP_CONFIG = {
        'debug': bool(os.environ.get('DEBUG', False)),
        'listen_address': os.environ.get('ADDR', '0.0.0.0'),
        'listen_port' :os.environ.get('PORT', 5000)
    }

    app_config = APP_CONFIG

    app.run(
        debug=app_config['debug'],
        host=app_config['listen_address'],
        port=app_config['listen_port'])
