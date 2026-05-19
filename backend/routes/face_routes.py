from flask import Blueprint
from controllers.face_controller import FaceController

face_bp = Blueprint('face', __name__)

@face_bp.route('/upload', methods=['POST'])
def upload_face():
    """
    Upload a student face image
    ---
    tags:
      - Face Dataset
    consumes:
      - multipart/form-data
    parameters:
      - in: formData
        name: student_id
        type: string
        required: true
        description: ID of the student
      - in: formData
        name: image
        type: file
        required: true
        description: Face image file (png, jpg, jpeg)
    responses:
      201:
        description: Face image uploaded successfully
      400:
        description: Invalid input or missing fields
      404:
        description: Student not found
    """
    return FaceController.upload_face()
