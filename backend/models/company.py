from .db import db
from sqlalchemy.orm import relationship


class Company(db.Model):
    __tablename__ = "companies"

    id = db.Column(db.Integer, primary_key=True)
    fractal_index = db.Column(db.Double, nullable=False)

    candidates = relationship("Candidate", back_populates="company")

    def to_dict(self):

        return {
            "id": self.id,
            "fractal_index": self.fractal_index,
        }

    def __repr__(self):

        return f"<Company ({self.id},{self.fractal_index}"
