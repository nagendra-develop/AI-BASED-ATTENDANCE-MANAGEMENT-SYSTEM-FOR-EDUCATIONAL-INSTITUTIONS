# AI-Based Attendance Management System - Backend

This is the backend service for the AI-Based Attendance Management System, built with Flask, SQLAlchemy, and MySQL.

## Project Structure

```
backend/
├── app.py                     # Main application entry point
├── config.py                  # Configuration settings
├── requirements.txt           # Python dependencies
├── .env                       # Environment variables (create from .env.example)
├── database/                  
│   └── db.py                  # SQLAlchemy & Migrate initialization
├── models/                    # Database models (Schema)
│   ├── admin_model.py
│   ├── attendance_model.py
│   ├── face_model.py
│   ├── student_model.py
│   └── __init__.py
├── controllers/               # Business logic
│   ├── admin_controller.py
│   ├── attendance_controller.py
│   ├── auth_controller.py
│   ├── face_controller.py
│   └── student_controller.py
├── routes/                    # API Endpoints (Blueprints)
│   ├── attendance_routes.py
│   ├── auth_routes.py
│   ├── face_routes.py
│   └── student_routes.py
├── utils/                     # Helper functions
│   ├── auth.py                # JWT wrappers
│   ├── response_handler.py    # JSON formatters
│   └── validators.py          # Data validation
└── uploads/                   # Folder for storing face dataset images
```

## Setup Instructions

1. **Virtual Environment**:
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

2. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Environment Configuration**:
   ```bash
   cp .env.example .env
   ```
   - Open `.env` and update the values:
     - Set your own `SECRET_KEY` and `JWT_SECRET_KEY`.
     - Set `SQLALCHEMY_DATABASE_URI` to your MySQL connection string (or keep SQLite for quick local testing).
   - If using MySQL, create the database first:
     ```sql
     CREATE DATABASE attendance_db;
     ```

4. **Initialize Database**:
   ```bash
   flask db init
   flask db migrate -m "Initial migration."
   flask db upgrade
   ```

5. **Create First Admin (Optional)**:
   You can send a POST request to `/api/auth/setup-admin` or use the Flask CLI to insert the first admin.

6. **Run the Application**:
   ```bash
   python app.py
   ```
   The server will run on `http://localhost:5001`.

7. **API Documentation (Swagger)**:
   You can view and interact with the API documentation using Swagger UI at:
   `http://localhost:5001/apidocs`

## API Documentation (Postman Guide)

### 1. Student Registration
- **Method**: `POST`
- **URL**: `http://localhost:5001/api/students/register`
- **Body** (JSON):
  ```json
  {
    "student_id": "CSE001",
    "full_name": "John Doe",
    "email": "john@example.com",
    "department": "CSE",
    "year": "3",
    "section": "A"
  }
  ```

### 2. Face Dataset Upload
- **Method**: `POST`
- **URL**: `http://localhost:5001/api/faces/upload`
- **Body** (form-data):
  - `student_id`: `CSE001` (Text)
  - `image`: [Select File] (File)

### 3. Mark Attendance
- **Method**: `POST`
- **URL**: `http://localhost:5001/api/attendance/mark`
- **Body** (JSON):
  ```json
  {
    "student_id": "CSE001"
  }
  ```

### 4. Admin Login (Get JWT Token)
- **Method**: `POST`
- **URL**: `http://localhost:5001/api/auth/login`
- **Body** (JSON):
  ```json
  {
    "username": "admin",
    "password": "admin123"
  }
  ```

### 5. Get Analytics (Protected Route)
- **Method**: `GET`
- **URL**: `http://localhost:5001/api/attendance/analytics`
- **Headers**:
  - `Authorization`: `Bearer <your_jwt_token>`
