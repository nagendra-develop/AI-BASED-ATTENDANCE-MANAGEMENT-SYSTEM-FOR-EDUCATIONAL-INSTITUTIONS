# 🎓 AI-Based Attendance Management System  
## Module 2 — AI Face Recognition Engine

An advanced **AI-powered Face Recognition Attendance System** built using **Python**, **OpenCV**, and **Dlib-based Face Recognition** for automated attendance tracking in educational institutions.

This repository represents **Module 2 (AI Core)** of the larger group capstone project:

> **AI-Based Attendance Management System for Educational Institutions**

The module handles:

- Face dataset ingestion
- Deep-metric face encoding generation
- Real-time face recognition
- Attendance event delivery via REST API
- Optimized execution for live deployment

---

# 🚀 Features

## ✅ AI Face Recognition Pipeline
- Deep-learning powered facial recognition
- 128-D face embeddings using Dlib
- HOG-based face detection pipeline
- Real-time webcam recognition

## ✅ Dual Dataset Ingestion System
- Live webcam capture mode
- Batch folder image ingestion mode

## ✅ Optimized Real-Time Performance
- Frame downscaling for higher FPS
- Efficient recognition loop
- Reduced CPU overhead

## ✅ Modern UI Overlay
- Neon-style corner brackets
- Dynamic identity labels
- High-contrast recognition banners

## ✅ Backend API Integration
- RESTful attendance delivery
- Timeout protection
- Cooldown-based duplicate prevention

---

# 🧠 Technologies Used

| Technology | Purpose |
|---|---|
| Python 3.13.3 | Core Programming Language |
| OpenCV | Video Processing |
| face_recognition | Face Embedding Extraction |
| Dlib | Deep Metric Learning |
| NumPy | Numerical Operations |
| Pickle | Model Serialization |
| Requests | Backend API Communication |

---

# 📂 Project Structure

```text
C:\AI Module\
│
├── .gitignore
├── requirements.txt
├── README.md
├── api_integration.py
├── 1_capture_faces.py
├── 2_encode_faces.py
├── 3_realtime_recognition.py
│
├── Images for modelling\
├── Pending Pics\
├── datasets\
│
└── models\
    └── encodings.pkl
```

---

# ⚙️ System Requirements

## Operating System
- Windows 10 / 11 (64-bit)

## Python Version
- Python 3.13.3

## Hardware Recommendations
| Component | Recommended |
|---|---|
| RAM | 8 GB+ |
| CPU | Intel i5 / Ryzen 5 or higher |
| Camera | HD Webcam |
| Storage | SSD Preferred |

---

# 🛠️ Installation Guide

## Step 1 — Create Virtual Environment

Open PowerShell:

```powershell
cd "C:\AI Module"

python -m venv venv

Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned

.\venv\Scripts\Activate.ps1
```

---

## Step 2 — Install Precompiled Dlib Wheel

This avoids Microsoft Visual C++ compilation issues.

```powershell
pip install https://github.com/z-mahmud22/Dlib_Windows_Python3.x/raw/main/dlib-20.0.99-cp313-cp313-win_amd64.whl
```

---

## Step 3 — Install Dependencies

```powershell
pip install -r requirements.txt
```

---

# 📦 requirements.txt

```txt
opencv-python
face-recognition
numpy
requests
Pillow
setuptools<=80.0.0
```

---

# 🔄 Operational Workflow

---

# 1️⃣ Face Dataset Ingestion

Run:

```powershell
python 1_capture_faces.py
```

The script asks for:

- Student Name
- Student ID

Example:

```text
Name: Rahul
ID: IITP_001
```

Generated folder:

```text
datasets/Rahul_IITP_001/
```

---

## Capture Modes

### 🎥 Webcam Mode
- Captures live face images
- Automatically records 20 frames
- Encourages head movement for better training diversity

### 📁 Batch Folder Mode
- Imports images from:

```text
C:\AI Module\Pending Pics\
```

- Detects and crops faces automatically
- Stores processed faces into dataset folders

---

# 2️⃣ Generate Face Encodings

Run:

```powershell
python 2_encode_faces.py
```

This script:

- Reads all dataset images
- Detects faces using HOG
- Extracts 128-dimensional embeddings
- Saves trained encodings to:

```text
models/encodings.pkl
```

---

# 3️⃣ Real-Time Face Recognition

Run:

```powershell
python 3_realtime_recognition.py
```

---

## ⚡ Performance Optimizations

### Frame Downscaling
Frames are resized to:

```text
25% original resolution
```

Benefits:
- Faster recognition
- Smooth FPS
- Lower CPU usage

---

## 🎨 Enhanced UI Layer

The recognition engine includes:

- Neon corner brackets
- Dynamic identity rendering
- Clean attendance banners
- Better readability

---

## 🛑 Shutdown

Focus the camera window and press:

```text
q
```

to terminate safely.

---

# 📡 API Integration

All backend communication is isolated inside:

```text
api_integration.py
```

---

# 🔐 Network Safety Mechanisms

## ⏱️ 2-Second Timeout Guard

Prevents backend/network failures from freezing the webcam stream.

---

## 🔁 60-Second Cooldown

Once attendance is marked for a student:

- Duplicate API requests are blocked for 60 seconds
- Prevents backend flooding

---

# 🌐 REST API Contract

## Endpoint

```http
POST http://localhost:5000/api/attendance
```

---

## Headers

```http
Content-Type: application/json
```

---

## JSON Payload

```json
{
  "student_id": "IITP_001",
  "timestamp": "2026-05-25T23:40:12.894321"
}
```

---

# 🔧 Production Deployment

Update the backend URL inside:

```python
BACKEND_URL
```

in:

```text
api_integration.py
```

Example:

```python
BACKEND_URL = "https://your-production-server.com/api/attendance"
```

---

# 🧪 Future Improvements

- CNN-based face detection
- Anti-spoofing system
- Multi-camera support
- Cloud database integration
- Attendance analytics dashboard
- RFID + Face Hybrid Authentication
- Edge AI deployment using Jetson Nano

---

# 👨‍💻 Academic Research Scope

This project combines concepts from:

- Artificial Intelligence
- Computer Vision
- Deep Learning
- Edge Computing
- Human-Computer Interaction
- Embedded AI Systems

---

# 📚 Research Domains (EE + CSE Integration)

Potential IIT Bhubaneswar summer research directions:

| EE Domain | CSE Domain | Combined Research Topic |
|---|---|---|
| Embedded Systems | AI/ML | Edge AI Attendance System |
| Signal Processing | Computer Vision | Face Recognition Optimization |
| IoT Systems | Cloud Computing | Smart Classroom Monitoring |
| VLSI | Deep Learning Acceleration | FPGA-Based AI Inference |
| Wireless Communication | Distributed Systems | Real-Time Attendance Networks |
| Power Electronics | Edge Computing | Low-Power AI Devices |
| Sensors | AI Analytics | Smart Surveillance Systems |

---

# 🤝 Contributors

Group Capstone Project Team  
AI Core Module Developed Using:
- OpenCV
- Dlib
- Python

---

# 📄 License

This project is intended for:
- Academic Research
- Educational Purposes
- Internship Demonstrations
- Experimental Deployments

---

# ⭐ Acknowledgements

Special thanks to:
- OpenCV Community
- Dlib Developers
- face_recognition Library Contributors
- Python Open Source Ecosystem

---
