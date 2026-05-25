# 2_encode_faces.py
import face_recognition
import cv2
import os
import pickle

def encode_known_faces():
    dataset_dir = "datasets"
    encodings_path = os.path.join("models", "encodings.pkl")
    
    known_encodings = []
    known_names = []

    if not os.path.exists(dataset_dir) or not os.listdir(dataset_dir):
        print("[ERROR] Datasets directory is empty. Run script 1 first.")
        return

    for student_id in os.listdir(dataset_dir):
        student_folder = os.path.join(dataset_dir, student_id)
        if not os.path.isdir(student_folder):
            continue

        print(f"[PROCESSING] Generating math signatures for ID: {student_id}")
        for image_name in os.listdir(student_folder):
            image_path = os.path.join(student_folder, image_name)
            image = cv2.imread(image_path)
            if image is None:
                continue
            
            # Convert BGR (OpenCV standard) to RGB (Face_recognition standard)
            rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            boxes = face_recognition.face_locations(rgb_image, model='hog')
            encodings = face_recognition.face_encodings(rgb_image, boxes)

            if encodings:
                known_encodings.append(encodings[0])
                known_names.append(student_id)

    print("[SERIALIZATION] Saving face metrics matrix to models/encodings.pkl...")
    with open(encodings_path, "wb") as f:
        pickle.dump({"encodings": known_encodings, "names": known_names}, f)
    print("[SUCCESS] Feature maps successfully built.")

if __name__ == "__main__":
    encode_known_faces()