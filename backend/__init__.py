import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from .config import Config
from .models.db import db
from .models.candidate import Candidate
from .models.company import Company
from flask_migrate import Migrate
from flask_cors import CORS
import pandas as pd

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
    if Candidate.query.count() > 0 and Company.query.count() > 0:
        return "Database already filled"

    # clear data in case of duplcates before loading data
    db.session.query(Candidate).delete()
    db.session.query(Company).delete()

    candidates_csv = pd.read_csv("data/score-records.csv")
    companies_csv = pd.read_csv("data/companies.csv")

    # Iterate over the company csv file data and create Company objects
    for i, row in companies_csv.iterrows():
        company = Company(id=row["company_id"], fractal_index=row["fractal_index"])
        db.session.add(company)
    db.session.commit()

    # Iterate over the candidate csv file data and create Candidate objects
    for i, row in candidates_csv.iterrows():
        candidate = Candidate(
            id=row["candidate_id"],
            communication_score=row["communication_score"],
            coding_score=row["coding_score"],
            title=row["title"],
            company_id=row["company_id"],
        )
        db.session.add(candidate)
    db.session.commit()

    return "Data loaded successfully"
