from database.db import db
from datetime import datetime

class StudentModel(db.Model):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.String(50), unique=True, nullable=False, index=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    department = db.Column(db.String(50), nullable=False)
    year = db.Column(db.String(20), nullable=False)
    section = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    face_datasets = db.relationship('FaceDatasetModel', backref='student', lazy=True, cascade="all, delete-orphan")
    attendance_records = db.relationship('AttendanceModel', backref='student', lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'student_id': self.student_id,
            'full_name': self.full_name,
            'email': self.email,
            'department': self.department,
            'year': self.year,
            'section': self.section,
            'created_at': self.created_at.isoformat()
        }
