from flask_sqlalchemy import SQLAlchemy
from config import config
import os

db = SQLAlchemy()

def init_db(app):
    """Initialize database with the Flask app"""
    # Get configuration
    config_name = os.getenv('FLASK_ENV', 'development')
    app.config.from_object(config[config_name])
    
    db.init_app(app)
    
    with app.app_context():
        db.create_all()
        # Import and seed data
        from database.seed.index import seed_database
        seed_database()
