from flask import request
from datetime import date, datetime
from sqlalchemy import func
from models.attendance_model import AttendanceModel
from models.student_model import StudentModel
from database.db import db
from utils.response_handler import success_response, error_response

class AttendanceController:
    @staticmethod
    def mark_attendance():
        
        data = request.get_json()
        if not data or 'student_id' not in data:
            return error_response("student_id is required")
            
        student_id = data['student_id']
        #debug purpose
        print("Received student_id:", student_id)
        
        student = StudentModel.query.filter_by(student_id=student_id).first()
        #debug purpose
        print("Student found:", student) 
        
        if not student:
            return error_response("Student not found", status_code=404)
            
        today = date.today()
        
        # Check if already marked today
        existing = AttendanceModel.query.filter_by(student_id=student_id, attendance_date=today).first()
        if existing:
            return error_response("Attendance already marked for today", status_code=409)
            
        try:
            new_attendance = AttendanceModel(
                student_id=student_id,
                attendance_date=today,
                attendance_time=datetime.now().time(),
                status='Present'
            )
            db.session.add(new_attendance)
            db.session.commit()
            return success_response("Attendance marked successfully", new_attendance.to_dict(), 201)
        except Exception as e:
            db.session.rollback()
            return error_response(str(e), status_code=500)

    @staticmethod
    def get_all_attendance():
     records = AttendanceModel.query.order_by(
        AttendanceModel.attendance_date.desc(),
        AttendanceModel.attendance_time.desc()
    ).all()

     attendance_data = []
     for r in records:
        student = StudentModel.query.filter_by(
            student_id=r.student_id
        ).first()

        attendance_data.append({
            "id": r.id,
            "student_id": r.student_id,
            "full_name": student.full_name if student else "Unknown",
            "attendance_date": str(r.attendance_date),
            "attendance_time": str(r.attendance_time),
            "status": r.status
        })
       
        return success_response(
        "Attendance records retrieved",
        attendance_data
    )

    @staticmethod
    def get_student_attendance(student_id):
        records = AttendanceModel.query.filter_by(student_id=student_id).order_by(AttendanceModel.attendance_date.desc()).all()
        return success_response(f"Attendance records for {student_id}", [r.to_dict() for r in records])

    @staticmethod
    def get_analytics():
        today = date.today()
        total_students = StudentModel.query.count()
        today_attendance = AttendanceModel.query.filter_by(attendance_date=today).count()
        
        attendance_percentage = 0
        if total_students > 0:
            attendance_percentage = (today_attendance / total_students) * 100
            
        # Department wise for today
        dept_wise = db.session.query(
            StudentModel.department, 
            func.count(AttendanceModel.id)
        ).join(
            AttendanceModel, StudentModel.student_id == AttendanceModel.student_id
        ).filter(
            AttendanceModel.attendance_date == today
        ).group_by(StudentModel.department).all()
        
        dept_data = {dept: count for dept, count in dept_wise}

        data = {
            "total_students": total_students,
            "today_attendance": today_attendance,
            "attendance_percentage": round(attendance_percentage, 2),
            "department_wise_today": dept_data
        }
        return success_response("Analytics retrieved successfully", data)
