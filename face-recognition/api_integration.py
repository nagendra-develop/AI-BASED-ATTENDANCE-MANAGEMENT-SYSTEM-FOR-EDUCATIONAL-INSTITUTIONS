# api_integration.py
import requests
import datetime

BACKEND_URL = "http://localhost:5001/api/attendance/mark"

def send_attendance(student_id: str):
    """
    Sends attendance data to the backend REST API payload structure.
    Catches exceptions to prevent backend downtime from crashing the OpenCV feed.
    """
    payload = {
        "student_id": student_id,
        "timestamp": datetime.datetime.now().isoformat()
    }
    headers = {"Content-Type": "application/json"}

    try:
        # 2-second timeout prevents the frame loop from locking if the server hangs
        response = requests.post(BACKEND_URL, json=payload, headers=headers, timeout=2)
        if response.status_code in [200, 201]:
            print(f"[API SUCCESS] Attendance successfully logged for: {student_id}")
        else:
            print(f"[API ERROR] Server replied with code {response.status_code}: {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"[NETWORK WARNING] Backend unreachable. Attendance cache skipped for {student_id}. Error: {e}")