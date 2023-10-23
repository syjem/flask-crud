from flask import jsonify, request
from api import app, db
from api.models import Birthdays

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