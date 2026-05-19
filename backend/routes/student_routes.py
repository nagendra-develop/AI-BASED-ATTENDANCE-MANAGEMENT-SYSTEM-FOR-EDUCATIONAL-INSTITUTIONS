from flask import Blueprint
from controllers.student_controller import StudentController
from flask_jwt_extended import jwt_required

student_bp = Blueprint('student', __name__)

@student_bp.route('/register', methods=['POST'])
def register():
    """
    Register a new student
    ---
    tags:
      - Student
    parameters:
      - in: body
        name: body
        required: true
        schema:
          type: object
          properties:
            student_id:
              type: string
              example: CSE001
            full_name:
              type: string
              example: John Doe
            email:
              type: string
              example: john@example.com
            department:
              type: string
              example: CSE
            year:
              type: string
              example: "3"
            section:
              type: string
              example: A
    responses:
      201:
        description: Student registered successfully
      400:
        description: Invalid input or missing fields
      409:
        description: Student ID or Email already exists
    """
    return StudentController.register_student()

# Example protected route: 
# @student_bp.route('/all', methods=['GET'])
# @jwt_required()
# def get_all_students():
#     pass
