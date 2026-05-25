# 1_capture_faces.py
import cv2
import os

def draw_fancy_box(img, x, y, w, h, color=(255, 120, 0), thickness=2, corner_len=15):
    """Draws a sleek, high-tech corner-bracket bounding box."""
    cv2.rectangle(img, (x, y), (x + w, y + h), color, 1)
    # Top-Left
    cv2.line(img, (x, y), (x + corner_len, y), color, thickness + 1)
    cv2.line(img, (x, y), (x, y + corner_len), color, thickness + 1)
    # Top-Right
    cv2.line(img, (x + w, y), (x + w - corner_len, y), color, thickness + 1)
    cv2.line(img, (x + w, y), (x + w, y + corner_len), color, thickness + 1)
    # Bottom-Left
    cv2.line(img, (x, y + h), (x + corner_len, y + h), color, thickness + 1)
    cv2.line(img, (x, y + h), (x, y + h - corner_len), color, thickness + 1)
    # Bottom-Right
    cv2.line(img, (x + w, y + h), (x + w - corner_len, y + h), color, thickness + 1)
    cv2.line(img, (x + w, y + h), (x + w, y + h - corner_len), color, thickness + 1)

def get_target_directory(name: str, student_id: str):
    """Generates and returns the target dataset directory path."""
    folder_identifier = f"{name.replace(' ', '')}_{student_id}"
    base_dir = os.path.join("datasets", folder_identifier)
    os.makedirs(base_dir, exist_ok=True)
    return base_dir, folder_identifier

def capture_from_webcam(name: str, student_id: str, num_images: int):
    """MODE 1: Captures face variations automatically via live webcam."""
    base_dir, folder_identifier = get_target_directory(name, student_id)
    video_capture = cv2.VideoCapture(0)
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

    count = 0
    print(f"\n[INFO] Webcam active. Capturing {num_images} images for {name}. Look at the camera...")

    while count < num_images:
        ret, frame = video_capture.read()
        if not ret:
            continue

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)

        for (x, y, w, h) in faces:
            face_img = frame[y:y+h, x:x+w]
            img_path = os.path.join(base_dir, f"{folder_identifier}_{count}.jpg")
            cv2.imwrite(img_path, face_img)
            count += 1
            
            # High-tech UI overlay
            draw_fancy_box(frame, x, y, w, h, color=(255, 120, 0), thickness=2)
            cv2.rectangle(frame, (x, y - 25), (x + w, y), (255, 120, 0), cv2.FILLED)
            cv2.putText(frame, f"Capturing: {count}/{num_images}", (x + 5, y - 7), 
                        cv2.FONT_HERSHEY_SIMPLEX, 0.4, (255, 255, 255), 1, cv2.LINE_AA)
            cv2.waitKey(150)  # Tiny pause for natural movement

        cv2.imshow('Dataset Builder - Webcam Mode', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            print("[INFO] Capture aborted by user.")
            break

    video_capture.release()
    cv2.destroyAllWindows()
    print(f"[SUCCESS] Saved {count} processed images to {base_dir}")

def import_from_pending_pics(name: str, student_id: str, import_limit: str):
    """MODE 2: Imports a user-specified number of photos from the local 'Pending Pics' folder."""
    source_folder = "Pending Pics"
    
    # Automatically create the folder if it doesn't exist yet for user convenience
    if not os.path.exists(source_folder):
        os.makedirs(source_folder)
        print(f"[INITIALIZATION] Created empty '{source_folder}' folder. Drop images there and re-run.")
        return

    base_dir, folder_identifier = get_target_directory(name, student_id)
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    
    valid_extensions = ('.jpg', '.jpeg', '.png', '.bmp', '.webp')
    image_files = [f for f in os.listdir(source_folder) if f.lower().endswith(valid_extensions)]

    if not image_files:
        print(f"[WARNING] No valid images found in the '{source_folder}' folder!")
        return

    # Determine total files to process based on user input
    if import_limit.lower() == 'all':
        max_images = len(image_files)
    else:
        try:
            max_images = min(int(import_limit), len(image_files))
        except ValueError:
            print("[ERROR] Invalid image count entered. Defaulting to processing all available images.")
            max_images = len(image_files)

    print(f"\n[INFO] Staging {max_images} out of {len(image_files)} total images found for {name}...")
    count = 0

    for i in range(max_images):
        file_name = image_files[i]
        img_path = os.path.join(source_folder, file_name)
        frame = cv2.imread(img_path)
        if frame is None:
            continue

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)

        if len(faces) == 0:
            print(f"[SKIPPED] No face detected in file: {file_name}")
            continue

        for (x, y, w, h) in faces:
            # Crop the detected face tightly
            face_img = frame[y:y+h, x:x+w]
            target_path = os.path.join(base_dir, f"{folder_identifier}_imported_{count}.jpg")
            cv2.imwrite(target_path, face_img)
            count += 1

            # Animation Preview Window
            preview_frame = frame.copy()
            draw_fancy_box(preview_frame, x, y, w, h, color=(0, 165, 255), thickness=2)
            cv2.rectangle(preview_frame, (x, y - 25), (x + w, y), (0, 165, 255), cv2.FILLED)
            cv2.putText(preview_frame, f"Importing: {file_name} ({count}/{max_images})", (x + 5, y - 7), 
                        cv2.FONT_HERSHEY_SIMPLEX, 0.4, (255, 255, 255), 1, cv2.LINE_AA)
            
            cv2.imshow('Dataset Builder - Import Animation', preview_frame)
            cv2.waitKey(500)  # Show animation for half a second per picture

    cv2.destroyAllWindows()
    print(f"[SUCCESS] Batch import complete. Cropped and stored {count} faces into {base_dir}")

if __name__ == "__main__":
    print("=" * 50)
    print("       CAPSTONE DATASET BUILDER MANAGER")
    print("=" * 50)
    
    # 1. Initialize 'Pending Pics' folder structure automatically on runtime if missing
    if not os.path.exists("Pending Pics"):
        os.makedirs("Pending Pics")
        print("[SYSTEM INFO] Created 'Pending Pics' staging directory at C:\\AI Module\\Pending Pics")

    student_name = input("Enter Student Name (e.g., John Doe): ").strip()
    student_id = input("Enter Student ID (e.g., IITP_001): ").strip()
    
    if not student_name or not student_id:
        print("[ERROR] Student details cannot be left blank.")
        exit()

    print("\nChoose Dataset Collection Method:")
    print("1) Capture via Live Webcam Stream")
    print("2) Import Existing Photos From 'Pending Pics' Folder")
    choice = input("Select option (1 or 2): ").strip()

    if choice == "1":
        try:
            limit = int(input("How many photos do you want to capture? (Default 20): ") or 20)
        except ValueError:
            limit = 20
        capture_from_webcam(student_name, student_id, limit)
        
    elif choice == choice == "2":
        limit_input = input("How many images do you want to import? (Type a number or 'all'): ").strip()
        import_from_pending_pics(student_name, student_id, limit_input)
        
    else:
        print("[ERROR] Invalid selection. Exiting script.")