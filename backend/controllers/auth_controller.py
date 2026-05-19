from flask import request
from flask_jwt_extended import create_access_token
from models.admin_model import AdminModel
from database.db import db
from utils.response_handler import success_response, error_response

class AuthController:
    @staticmethod
    def login():
        data = request.get_json()
        if not data or 'username' not in data or 'password' not in data:
            return error_response("Username and password are required")
            
        admin = AdminModel.query.filter_by(username=data['username']).first()
        
        if admin and admin.check_password(data['password']):
            # Create token with roles in claims
            access_token = create_access_token(
                identity=str(admin.id), 
                additional_claims={"role": admin.role, "username": admin.username}
            )
            return success_response("Login successful", {
                "access_token": access_token,
                "user": admin.to_dict()
            })
            
        return error_response("Invalid username or password", status_code=401)
        
    @staticmethod
    def create_first_admin():
        # Helper endpoint to initialize DB, in production use CLI script
        if AdminModel.query.count() > 0:
            return error_response("Admin already exists")
            
        try:
            admin = AdminModel(username="admin", role="admin")
            admin.set_password("admin123")
            db.session.add(admin)
            db.session.commit()
            return success_response("Default admin created (admin/admin123)")
        except Exception as e:
            db.session.rollback()
            return error_response(str(e), status_code=500)
