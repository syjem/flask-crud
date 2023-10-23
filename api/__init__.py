from flask import Flask
from flask_cors import CORS 
from flask_sqlalchemy import SQLAlchemy


from api.config import Config

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)
db = SQLAlchemy(app)

@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

with app.app_context():
    db.create_all()

from api import routes