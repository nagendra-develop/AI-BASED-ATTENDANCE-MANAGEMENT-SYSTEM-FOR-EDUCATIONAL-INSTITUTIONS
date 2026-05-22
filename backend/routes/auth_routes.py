from flask import Blueprint
from controllers.auth_controller import AuthController

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    """
    Login to get JWT token
    ---
    tags:
      - Auth
    parameters:
      - in: body
        name: body
        required: true
        schema:
          type: object
          properties:
            username:
              type: string
              example: admin
            password:
              type: string
              example: admin123
    responses:
      200:
        description: Login successful
      401:
        description: Invalid username or password
    """
    return AuthController.login()

@auth_bp.route('/setup-admin', methods=['POST'])
def setup_admin():
    """
    Initialize default admin
    ---
    tags:
      - Auth
    responses:
      200:
        description: Default admin created
      400:
        description: Admin already exists
    """
    # Helper for first time setup
    return AuthController.create_first_admin()
