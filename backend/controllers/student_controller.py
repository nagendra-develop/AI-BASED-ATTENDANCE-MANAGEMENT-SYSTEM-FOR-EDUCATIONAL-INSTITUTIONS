from flask import request
from models.student_model import StudentModel
from database.db import db
from utils.response_handler import success_response, error_response
from utils.validators import validate_required_fields, validate_email
from sqlalchemy.exc import IntegrityError

class StudentController:
    @staticmethod
    def register_student():
        data = request.get_json()
        if not data:
            return error_response("No input data provided")

        required_fields = ['student_id', 'full_name', 'email', 'department', 'year', 'section']
        missing_fields = validate_required_fields(data, required_fields)
        if missing_fields:
            return error_response(f"Missing required fields: {', '.join(missing_fields)}")

        if not validate_email(data['email']):
            return error_response("Invalid email format")

        try:
            new_student = StudentModel(
                student_id=data['student_id'],
                full_name=data['full_name'],
                email=data['email'],
                department=data['department'],
                year=data['year'],
                section=data['section']
            )
            db.session.add(new_student)
            db.session.commit()
            return success_response("Student registered successfully", new_student.to_dict(), 201)
        except IntegrityError:
            db.session.rollback()
            return error_response("Student ID or Email already exists", status_code=409)
        except Exception as e:
            db.session.rollback()
            return error_response(str(e), status_code=500)
