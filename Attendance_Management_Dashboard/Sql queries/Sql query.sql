CREATE DATABASE attendance_kaggle;
USE attendance_kaggle;
CREATE TABLE students (
    student_id INT PRIMARY KEY,
    age INT,
    gender VARCHAR(10),
    course VARCHAR(50),
    year VARCHAR(20),
    parent_education VARCHAR(50),
    internet_access VARCHAR(10),
    hostel_resident VARCHAR(10)
);
CREATE TABLE attendance (
    attendance_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    date DATE,
    attendance INT,  -- 1 = Present, 0 = Absent
    study_hours FLOAT,
    sleep_hours FLOAT,
    travel_time_minutes INT,
    weather VARCHAR(20),
    absence_reason VARCHAR(50),
    class_type VARCHAR(10),
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);
SELECT * FROM students LIMIT 10;
CREATE TABLE students_clean AS
SELECT DISTINCT
    ROW_NUMBER() OVER () AS student_id,
    age,
    gender,
    course,
    year,
    parent_education,
    internet_access,
    hostel_resident
FROM students;
ALTER TABLE students_clean
MODIFY student_id INT;
CREATE TABLE attendance_clean (
    attendance_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    date DATE,
    status VARCHAR(10),
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);
ALTER TABLE students
ADD PRIMARY KEY (student_id);
INSERT INTO attendance_clean (student_id, date, status)
SELECT 
    s.student_id,
    DATE('2026-04-01') + INTERVAL d.day DAY,
    CASE 
        WHEN RAND() > 0.2 THEN 'Present'
        ELSE 'Absent'
    END
FROM students s
JOIN (
    SELECT 0 AS day UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4
    UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9
    UNION SELECT 10 UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14
    UNION SELECT 15 UNION SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19
    UNION SELECT 20 UNION SELECT 21 UNION SELECT 22 UNION SELECT 23 UNION SELECT 24
    UNION SELECT 25 UNION SELECT 26 UNION SELECT 27 UNION SELECT 28 UNION SELECT 29
) d;
SELECT COUNT(*) FROM attendance_clean;
SELECT 
    student_id,
    COUNT(CASE WHEN status='Present' THEN 1 END)*100.0/COUNT(*) AS attendance_percentage
FROM attendance_clean
GROUP BY student_id;
SELECT *
FROM (
    SELECT 
        student_id,
        COUNT(CASE WHEN status='Present' THEN 1 END)*100.0/COUNT(*) AS percentage
    FROM attendance_clean
    GROUP BY student_id
) t
WHERE percentage < 75;
SELECT 
    MONTH(date) AS month,
    COUNT(CASE WHEN status='Present' THEN 1 END)*100.0/COUNT(*) AS attendance_rate
FROM attendance_clean
GROUP BY MONTH(date);
use attendance_kaggle;
ALTER TABLE attendance_clean
ADD weather VARCHAR(20),
ADD study_hours FLOAT,
ADD travel_time_minutes INT,
ADD class_type VARCHAR(10),
ADD absence_reason VARCHAR(50);
SET SQL_SAFE_UPDATES = 0;
UPDATE attendance_clean
SET 
    weather = CASE 
        WHEN RAND() < 0.3 THEN 'sunny'
        WHEN RAND() < 0.6 THEN 'rainy'
        ELSE 'cloudy'
    END,
    
    study_hours = ROUND(1 + RAND()*5,2),
    
    travel_time_minutes = FLOOR(10 + RAND()*60),
    
    class_type = CASE 
        WHEN RAND() > 0.5 THEN 'online'
        ELSE 'offline'
    END,
    
    absence_reason = CASE 
        WHEN status = 'Absent' THEN 'personal'
        ELSE 'none'
    END;
    UPDATE attendance_clean
SET weather = 'sunny'
WHERE attendance_id <= 300;
UPDATE attendance_clean
SET weather = CASE 
    WHEN RAND() < 0.3 THEN 'sunny'
    WHEN RAND() < 0.6 THEN 'rainy'
    ELSE 'cloudy'
END
WHERE weather IS NULL;
SELECT COUNT(*) 
FROM attendance_clean
WHERE weather IS NULL;