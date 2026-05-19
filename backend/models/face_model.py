from database.db import db
from datetime import datetime

class FaceDatasetModel(db.Model):
    __tablename__ = 'face_dataset'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.String(50), db.ForeignKey('students.student_id'), nullable=False, index=True)
    image_path = db.Column(db.String(255), nullable=False)
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'student_id': self.student_id,
            'image_path': self.image_path,
            'uploaded_at': self.uploaded_at.isoformat()
        }
