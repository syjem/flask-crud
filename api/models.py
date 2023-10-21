from app import db

class Birthdays(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    date = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f"Name: ('{self.name}', Birthday: '{self.date}')"