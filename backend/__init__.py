import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from .config import Config
from .models.db import db
from .models.candidate import Candidate
from .models.company import Company
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
# db.create_all()
Migrate(app, db)
CORS(app)

# with app.app_context():
#     db.create_all()
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def react_root(path):
    if path == "favicon.ico":
        return app.send_static_file("favicon.ico")
    return app.send_static_file("index.html")


@app.route("/read_data", methods=["GET"])
def read_Data():
    # do not load data from csv files once db has been filled
    if Candidate.query.count() == 0:
        return "Database already filled"
    else:
        return "Database already filled"


# @app.route("/", defaults={"path": ""})
# @app.route("/<path:path>")
# def react_root(path):
#     if path == "favicon.ico":
#         return app.send_static_file("favicon.ico")
#     return app.send_static_file("index.html")
