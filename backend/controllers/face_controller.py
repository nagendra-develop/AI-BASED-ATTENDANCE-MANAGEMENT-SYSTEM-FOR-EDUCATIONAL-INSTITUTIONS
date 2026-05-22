import os
import uuid
from flask import request, current_app
from werkzeug.utils import secure_filename
from models.student_model import StudentModel
from models.face_model import FaceDatasetModel
from database.db import db
from utils.response_handler import success_response, error_response

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

class FaceController:
    @staticmethod
    def upload_face():
        if 'image' not in request.files:
            return error_response("No image file in request")
        
        student_id = request.form.get('student_id')
        if not student_id:
            return error_response("student_id is required in form data")
        
        file = request.files['image']
        if file.filename == '':
            return error_response("No selected file")
        
        if file and allowed_file(file.filename):
            student = StudentModel.query.filter_by(student_id=student_id).first()
            if not student:
                return error_response("Student not found", status_code=404)
            
            # Generate safe unique filename
            ext = file.filename.rsplit('.', 1)[1].lower()
            unique_filename = f"{student_id}_{uuid.uuid4().hex[:8]}.{ext}"
            
            # Ensure upload folder exists
            upload_dir = current_app.config['UPLOAD_FOLDER']
            if not os.path.exists(upload_dir):
                os.makedirs(upload_dir)
                
            filepath = os.path.join(upload_dir, unique_filename)
            file.save(filepath)
            
            # Save to database
            try:
                face_data = FaceDatasetModel(student_id=student_id, image_path=filepath)
                db.session.add(face_data)
                db.session.commit()
                return success_response("Face image uploaded successfully", face_data.to_dict(), 201)
            except Exception as e:
                db.session.rollback()
                return error_response(str(e), status_code=500)
                
        return error_response("Invalid file type. Allowed: png, jpg, jpeg")
