import os
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from .config import Config
from .models.db import db
from .models.candidate import Candidate
from .models.company import Company
from flask_migrate import Migrate
from flask_cors import CORS
import pandas as pd
import math
import numpy as np


app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
Migrate(app, db)
CORS(app)


def are_similar(fractal_index_1, fractal_index_2):
    return math.fabs(fractal_index_1 - fractal_index_2) < 0.15


# API route

# Read the data from csv and load it into database
@app.route("/read_data", methods=["GET"])
def read_Data():
    try:
        # do not load data from csv files once db has been filled
        if Candidate.query.count() > 0 and Company.query.count() > 0:
            return "Database already filled"

        # clear data in case of duplcates before loading data
        db.session.query(Candidate).delete()
        db.session.query(Company).delete()

        # read the csv files
        try:
            candidates_csv = pd.read_csv("data/score-records.csv")
            companies_csv = pd.read_csv("data/companies.csv")
        except FileNotFoundError:
            return "CSV file not found", 500
        except pd.errors.EmptyDataError:
            return "Empty CSV file", 500
        except pd.errors.ParserError:
            return "Error parsing CSV file", 500

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

    except Exception:
        return str(Exception), 500


# Get the percentile
@app.route("/percentile/<int:candidate_id>", methods=["GET"])
def get_Percentile(candidate_id):
    similar_companies_Id = []
    candidate = Candidate.query.get(candidate_id)
    if not candidate:
        return jsonify({"error": "Candidate not found"}), 404

    # Get companies that are similar
    for company in Company.query.all():
        if are_similar(company.fractal_index, candidate.company.fractal_index):
            similar_companies_Id.append(company.id)

    # Get candidates with the same job title and at similar companies
    target_candidates = Candidate.query.filter(
        Candidate.title == candidate.title,
        Candidate.company_id.in_(similar_companies_Id),
    ).all()

    # Extract the communication and coding scores and put it into arrays
    communication_scores = [
        candidate.communication_score for candidate in target_candidates
    ]
    coding_scores = [candidate.coding_score for candidate in target_candidates]

    # calculate the index of the candidate's scores
    communication_index = sorted(communication_scores).index(
        candidate.communication_score
    )
    coding_index = sorted(coding_scores).index(candidate.coding_score)

    # calculate the percentiles
    candidate_communication_percentile = (
        communication_index / len(communication_scores)
    ) * 100
    candidate_coding_percentile = (coding_index / len(coding_scores)) * 100

    # return the candidate profile & percentiles & the scores array
    return jsonify(
        {
            "candidate": [candidate.to_dict()],
            "communication_percentile": candidate_communication_percentile,
            "coding_percentile": candidate_coding_percentile,
            "communication_scores": communication_scores,
            "coding_scores": coding_scores,
        }
    )
