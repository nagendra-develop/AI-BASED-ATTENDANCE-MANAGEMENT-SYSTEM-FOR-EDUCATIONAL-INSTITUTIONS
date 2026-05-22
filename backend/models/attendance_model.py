from database.db import db
from datetime import datetime, date

class AttendanceModel(db.Model):
    __tablename__ = 'attendance'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.String(50), db.ForeignKey('students.student_id'), nullable=False, index=True)
    attendance_date = db.Column(db.Date, default=date.today, nullable=False, index=True)
    attendance_time = db.Column(db.Time, default=datetime.utcnow().time, nullable=False)
    status = db.Column(db.String(20), nullable=False, default='Present') # Present/Absent

    def to_dict(self):
        return {
            'id': self.id,
            'student_id': self.student_id,
            'attendance_date': self.attendance_date.isoformat(),
            'attendance_time': self.attendance_time.isoformat(),
            'status': self.status
        }
