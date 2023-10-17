from flask_cors import CORS 
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, jsonify, request

from config import Config

app = Flask(__name__)
CORS(app) 

# Configs
app.config.from_object(Config)
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config["SESSION_COOKIE_SECURE"] = True
app.config["SESSION_COOKIE_SAMESITE"] = "None"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///birthdays.db"
db = SQLAlchemy(app)


class Birthdays(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    date = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f"Name: ('{self.name}', Birthday: '{self.date}')"

with app.app_context():
    db.create_all()

@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

@app.route('/birthdays', methods=["GET", "POST"])
def index():
    if request.method == 'POST':
        data = request.get_json()
        name = data.get("name")
        date = data.get("date")

        user = Birthdays(name=name, date=date)
        db.session.add(user)
        db.session.commit()
        return jsonify({"message": "Birthday added successfully!"})
        
    birthdays = Birthdays.query.all()

     # Create a list of dictionaries for each birthday
    birthday_data = [{"name": birthday.name, "date": birthday.date} for birthday in birthdays]
        
    # Return the data as JSON
    return jsonify(birthday_data)

if __name__ == ("__main__"):
    app.run(debug=True)