from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# Initialize SQLAlchemy and Migrate without app context
# They will be initialized in app.py with init_app
db = SQLAlchemy()
migrate = Migrate()
