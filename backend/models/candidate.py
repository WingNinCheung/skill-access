from .db import db
from sqlalchemy.orm import relationship


class Candidate(db.Model):
    __tablename__ = "candidates"

    id = db.Column(db.Integer, primary_key=True)
    communication_score = db.Column(db.Integer, nullable=False)
    coding_score = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(50), nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey("companies.id"), nullable=False)

    company = relationship("Company", back_populates="candidates")

    def to_dict(self):

        return {
            "id": self.id,
            "communication_score": self.communication_score,
            "coding_score": self.coding_score,
            "title": self.title,
            "company_id": self.company_id,
            "company": self.company.to_dict(),
        }

    def __repr__(self):

        return f"<Candidates ({self.id},{self.company_id},{self.communication_score}, {self.coding_score},{self.title}"
