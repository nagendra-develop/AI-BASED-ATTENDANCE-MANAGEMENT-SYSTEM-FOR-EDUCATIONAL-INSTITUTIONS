import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flasgger import Swagger
from config import config_by_name
from database.db import db, migrate

# Import Models to ensure they are registered with SQLAlchemy
import models  # noqa: F401

# Import Blueprints
from routes.student_routes import student_bp
from routes.face_routes import face_bp
from routes.attendance_routes import attendance_bp
from routes.auth_routes import auth_bp

def create_app(config_name='dev'):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])

    # Initialize extensions
    CORS(app) # Enable CORS for React frontend
    db.init_app(app)
    migrate.init_app(app, db)
    jwt = JWTManager(app)
    
    swagger_template = {
        "swagger": "2.0",
        "info": {
            "title": "Attendance Management API",
            "description": "API for AI-Based Attendance Management System",
            "version": "1.0.0"
        },
        "securityDefinitions": {
            "Bearer": {
                "type": "apiKey",
                "name": "Authorization",
                "in": "header",
                "description": 'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"'
            }
        },
        "security": [
            {
                "Bearer": []
            }
        ]
    }
    Swagger(app, template=swagger_template)

    # Global Error Handlers
    @app.errorhandler(404)
    def not_found_error(error):
        return jsonify({"success": False, "message": "Resource not found"}), 404

    @app.errorhandler(500)
    def internal_error(error):
        db.session.rollback()
        return jsonify({"success": False, "message": "Internal server error"}), 500
        
    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return jsonify({"success": False, "message": "Missing JWT token"}), 401
        
    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return jsonify({"success": False, "message": "Invalid JWT token"}), 401
        
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return jsonify({"success": False, "message": "Expired JWT token"}), 401

    # Register Blueprints
    app.register_blueprint(student_bp, url_prefix='/api/students')
    app.register_blueprint(face_bp, url_prefix='/api/faces')
    app.register_blueprint(attendance_bp, url_prefix='/api/attendance')
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    # Basic health check route
    @app.route('/')
    def index():
        return jsonify({"success": True, "message": "Attendance Management API is running"})

    return app

if __name__ == '__main__':
    env = os.environ.get('FLASK_ENV', 'dev')
    app = create_app(env)
    
    # Ensure upload folder exists
    upload_folder = app.config.get('UPLOAD_FOLDER', 'uploads')
    if not os.path.exists(upload_folder):
        os.makedirs(upload_folder)
        
    app.run(host='0.0.0.0', port=5001, debug=app.config['DEBUG'])
