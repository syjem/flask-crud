from flask_cors import CORS 
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, jsonify, request

from config import Config

app = Flask(__name__)
CORS(app)

# Configs
app.config.from_object(Config)
db = SQLAlchemy(app)


class Birthdays(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    date = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f"Name: ('{self.name}', Birthday: '{self.date}')"

with app.app_context():
    db.create_all()

# @app.after_request
# def after_request(response):
#     """Ensure responses aren't cached"""
#     response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
#     response.headers["Expires"] = 0
#     response.headers["Pragma"] = "no-cache"
#     return response

@app.route('/birthdays', methods=["GET", "POST", "DELETE", "PATCH"])
def index():
    # POST REQUEST
    if request.method == 'POST':
        data = request.get_json()
        name = data.get("name")
        date = data.get("date")

        if not name:
            return jsonify({"error": "Please enter a valid name."})
        if not date:
            return jsonify({"error": "Please enter a valid date."})

        user = Birthdays(name=name, date=date)
        db.session.add(user)
        db.session.commit()
        return jsonify({"success": "Added to the database successfully!"})

    # PATCH REQUEST
    if request.method == "PATCH":
        data = request.get_json()
        id = data.get("id")
        name = data.get("name")
        date = data.get("date")

        row = Birthdays.query.get(id)
        if row:
            if name is not None:
                row.name = name
            if date is not None:
                row.date = date
            db.session.commit()
            return jsonify({"success": "Updated successfully."})
        else:
            return jsonify({"error": "Not found."})

    # DELETE REQUEST
    if request.method == 'DELETE':
        data = request.get_json()
        id = data.get("id")

        row = Birthdays.query.get(id)
        if row:
            db.session.delete(row)
            db.session.commit()
            return jsonify({'success': "Deleted successfully."})
        else:
            return jsonify({"error": "Not found."})
        

    # GET REQUEST
    birthdays = Birthdays.query.all()
    birthday_data = [{'id': birthday.id, "name": birthday.name, "date": birthday.date} for birthday in birthdays]
    return jsonify(birthday_data)

if __name__ == ("__main__"):
    app.run(debug=True)