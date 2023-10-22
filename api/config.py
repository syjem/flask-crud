import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class Config:
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_SAMESITE = 'None'
    SECRET_KEY = os.getenv("SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = "sqlite:///birthdays.db"