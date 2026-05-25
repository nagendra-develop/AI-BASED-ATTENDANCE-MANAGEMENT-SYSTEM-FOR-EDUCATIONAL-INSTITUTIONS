# 3_realtime_recognition.py
import face_recognition
import cv2
import numpy as np
import pickle
import time
from api_integration import send_attendance

def draw_fancy_box(img, x, y, w, h, color=(0, 255, 0), thickness=2, corner_len=15):
    cv2.rectangle(img, (x, y), (x + w, y + h), color, 1)
    cv2.line(img, (x, y), (x + corner_len, y), color, thickness + 1)
    cv2.line(img, (x, y), (x, y + corner_len), color, thickness + 1)
    cv2.line(img, (x + w, y), (x + w - corner_len, y), color, thickness + 1)
    cv2.line(img, (x + w, y), (x + w, y + corner_len), color, thickness + 1)
    cv2.line(img, (x, y + h), (x + corner_len, y + h), color, thickness + 1)
    cv2.line(img, (x, y + h), (x, y + h - corner_len), color, thickness + 1)
    cv2.line(img, (x + w, y + h), (x + w - corner_len, y + h), color, thickness + 1)
    cv2.line(img, (x + w, y + h), (x + w, y + h - corner_len), color, thickness + 1)

def start_recognition():
    try:
        with open("models/encodings.pkl", "rb") as f:
            data = pickle.load(f)
    except FileNotFoundError:
        print("[CRITICAL] Run script 2 first to generate encodings.pkl.")
        return

    video_capture = cv2.VideoCapture(0)
    logged_students = {}
    API_COOLDOWN_LIMIT = 60

    print("[SYSTEM READY] Scanning stream window...")

    while True:
        ret, frame = video_capture.read()
        if not ret:
            break

        small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
        rgb_small_frame = cv2.cvtColor(small_frame, cv2.COLOR_BGR2RGB)

        face_locations = face_recognition.face_locations(rgb_small_frame, model="hog")
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

        for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
            matches = face_recognition.compare_faces(data["encodings"], face_encoding, tolerance=0.5)
            folder_identifier = "Unknown"

            face_distances = face_recognition.face_distance(data["encodings"], face_encoding)
            if len(face_distances) > 0:
                best_match_index = np.argmin(face_distances)
                if matches[best_match_index]:
                    folder_identifier = data["names"][best_match_index]

            # Separate Name and ID for the UI / API split
            display_name = "Unknown"
            api_student_id = None

            if folder_identifier != "Unknown":
                if "_" in folder_identifier:
                    display_name, api_student_id = folder_identifier.split("_", 1)
                else:
                    display_name = folder_identifier
                    api_student_id = folder_identifier

                # Trigger API Call with Cooldown using the isolated ID
                current_time = time.time()
                if (current_time - logged_students.get(api_student_id, 0)) > API_COOLDOWN_LIMIT:
                    send_attendance(api_student_id)
                    logged_students[api_student_id] = current_time
            else:
                print("[SECURITY LOG] Unrecognized individual detected.")

            # Scale back up coordinates
            top *= 4; right *= 4; bottom *= 4; left *= 4
            x, y, w, h = left, top, right - left, bottom - top

            # UI Rendering
            box_color = (0, 255, 0) if folder_identifier != "Unknown" else (0, 0, 255)
            draw_fancy_box(frame, x, y, w, h, color=box_color, thickness=2)

            # Solid label banner above the box
            cv2.rectangle(frame, (x, y - 25), (x + w, y), box_color, cv2.FILLED)
            
            # UPDATED: Changed font color parameter to (0, 0, 0) for solid black text
            cv2.putText(frame, display_name, (x + 6, y - 7), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1, cv2.LINE_AA)

        cv2.imshow('Capstone System - Face Recognition Module', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    video_capture.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    start_recognition()