CREATE DATABASE attendance_project;
USE attendance_project;
CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name VARCHAR(50),
    class_id INT,
    section VARCHAR(5)
);
CREATE TABLE classes (
      class_id INT PRIMARY KEY,
      class_name VARCHAR(20)
); 
USE attendance_project;
CREATE TABLE attendance (
    attendance_id INT PRIMARY KEY,
    student_id INT,
    date DATE,
    status VARCHAR(10),
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);
INSERT INTO classes VALUES (101, 'BCA');

INSERT INTO students VALUES 
(1, 'Harshita', 101, 'A'),
(2, 'Riya', 101, 'A');

INSERT INTO attendance VALUES
(1, 1, '2026-04-01', 'Present'),
(2, 1, '2026-04-02', 'Absent'),
(3, 2, '2026-04-01', 'Present');
show tables
SELECT 
    student_id,
    COUNT(CASE WHEN status='Present' THEN 1 END)*100.0/COUNT(*) AS attendance_percentage
FROM attendance
GROUP BY student_id;
SELECT *
FROM (
    SELECT 
        student_id,
        COUNT(CASE WHEN status='Present' THEN 1 END)*100.0/COUNT(*) AS percentage
    FROM attendance
    GROUP BY student_id
) t
WHERE percentage < 75;
SELECT 
    s.class_id,
    COUNT(CASE WHEN a.status='Present' THEN 1 END)*100.0/COUNT(*) AS class_attendance
FROM attendance a
JOIN students s ON a.student_id = s.student_id
GROUP BY s.class_id;
SELECT 
    MONTH(date) AS month,
    COUNT(CASE WHEN status='Present' THEN 1 END)*100.0/COUNT(*) AS attendance_rate
FROM attendance
GROUP BY MONTH(date);
INSERT INTO attendance VALUES
(4, 1, '2026-05-01', 'Present'),
(5, 1, '2026-05-02', 'Present'),
(6, 2, '2026-05-01', 'Absent'); 