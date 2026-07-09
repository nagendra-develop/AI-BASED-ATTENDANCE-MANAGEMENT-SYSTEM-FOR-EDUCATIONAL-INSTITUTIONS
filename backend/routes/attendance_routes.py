from flask import Blueprint
from controllers.attendance_controller import AttendanceController
from flask_jwt_extended import jwt_required
from utils.auth import admin_required

attendance_bp = Blueprint('attendance', __name__)

@attendance_bp.route('/mark', methods=['POST'])
def mark_attendance():
    """
    Mark student attendance
    ---
    tags:
      - Attendance
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
    responses:
      201:
        description: Attendance marked successfully
      404:
        description: Student not found
      409:
        description: Attendance already marked for today
    """
    # Typically called by the AI module, might be protected by an API key in production
    return AttendanceController.mark_attendance()

@attendance_bp.route('', methods=['GET'])
#@jwt_required()
def get_all_attendance():
    """
    Get all attendance records
    ---
    tags:
      - Attendance
    security:
      - Bearer: []
    responses:
      200:
        description: Attendance records retrieved
      401:
        description: Unauthorized
    """
    return AttendanceController.get_all_attendance()

@attendance_bp.route('/student/<student_id>', methods=['GET'])
@jwt_required()
def get_student_attendance(student_id):
    """
    Get attendance records for a specific student
    ---
    tags:
      - Attendance
    security:
      - Bearer: []
    parameters:
      - in: path
        name: student_id
        type: string
        required: true
        description: ID of the student
    responses:
      200:
        description: Attendance records for student
      401:
        description: Unauthorized
    """
    return AttendanceController.get_student_attendance(student_id)

@attendance_bp.route('/analytics', methods=['GET'])
@jwt_required()
def get_analytics():
    """
    Get attendance analytics and statistics
    ---
    tags:
      - Attendance
    security:
      - Bearer: []
    responses:
      200:
        description: Analytics retrieved successfully
      401:
        description: Unauthorized
    """
    return AttendanceController.get_analytics()
