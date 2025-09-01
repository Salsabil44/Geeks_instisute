-- School Management System Database Schema
-- This file contains the SQL schema for creating all necessary tables

-- Students table
CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    student_id VARCHAR(10) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    date_of_birth DATE,
    grade_level INTEGER,
    enrollment_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(20) DEFAULT 'active'
);

-- Teachers table
CREATE TABLE IF NOT EXISTS teachers (
    id SERIAL PRIMARY KEY,
    teacher_id VARCHAR(10) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    subject_specialty VARCHAR(100),
    hire_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(20) DEFAULT 'active'
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    course_code VARCHAR(20) UNIQUE NOT NULL,
    course_name VARCHAR(100) NOT NULL,
    description TEXT,
    credits INTEGER DEFAULT 1,
    max_students INTEGER DEFAULT 30,
    teacher_id INTEGER REFERENCES teachers(id) ON DELETE SET NULL
);

-- Enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    enrollment_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(20) DEFAULT 'enrolled'
);

-- Grades table
CREATE TABLE IF NOT EXISTS grades (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    grade_value FLOAT,
    grade_letter VARCHAR(3),
    semester VARCHAR(20),
    academic_year INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);
CREATE INDEX IF NOT EXISTS idx_students_student_id ON students(student_id);
CREATE INDEX IF NOT EXISTS idx_teachers_email ON teachers(email);
CREATE INDEX IF NOT EXISTS idx_teachers_teacher_id ON teachers(teacher_id);
CREATE INDEX IF NOT EXISTS idx_courses_course_code ON courses(course_code);
CREATE INDEX IF NOT EXISTS idx_enrollments_student_id ON enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_grades_student_id ON grades(student_id);
CREATE INDEX IF NOT EXISTS idx_grades_course_id ON grades(course_id);

-- Sample data for teachers
INSERT OR IGNORE INTO teachers (teacher_id, first_name, last_name, email, subject_specialty) VALUES
('T001', 'Dr. Robert', 'Wilson', 'robert.wilson@school.com', 'Mathematics'),
('T002', 'Prof. Sarah', 'Johnson', 'sarah.johnson@school.com', 'English Literature'),
('T003', 'Dr. Michael', 'Chen', 'michael.chen@school.com', 'Physics'),
('T004', 'Prof. Emily', 'Davis', 'emily.davis@school.com', 'History'),
('T005', 'Dr. James', 'Brown', 'james.brown@school.com', 'Chemistry');

-- Sample data for students
INSERT OR IGNORE INTO students (student_id, first_name, last_name, email, date_of_birth, grade_level) VALUES
('S001', 'John', 'Doe', 'john.doe@school.com', '2005-03-15', 10),
('S002', 'Jane', 'Smith', 'jane.smith@school.com', '2005-07-22', 10),
('S003', 'Mike', 'Johnson', 'mike.johnson@school.com', '2004-11-08', 11),
('S004', 'Sarah', 'Williams', 'sarah.williams@school.com', '2004-05-30', 11),
('S005', 'David', 'Brown', 'david.brown@school.com', '2003-09-12', 12);

-- Sample data for courses
INSERT OR IGNORE INTO courses (course_code, course_name, description, credits, max_students, teacher_id) VALUES
('MATH101', 'Algebra I', 'Introduction to algebraic concepts and problem solving', 3, 25, 1),
('ENG101', 'English Literature', 'Study of classic and contemporary literature', 3, 30, 2),
('PHY101', 'Physics Fundamentals', 'Basic principles of physics and mechanics', 4, 20, 3),
('HIST101', 'World History', 'Overview of major historical events and civilizations', 3, 25, 4),
('CHEM101', 'Chemistry Basics', 'Introduction to chemical principles and laboratory safety', 4, 22, 5);

-- Sample data for enrollments
INSERT OR IGNORE INTO enrollments (student_id, course_id, enrollment_date, status) VALUES
(1, 1, '2024-08-15', 'enrolled'),
(1, 2, '2024-08-15', 'enrolled'),
(2, 1, '2024-08-16', 'enrolled'),
(2, 3, '2024-08-16', 'enrolled'),
(3, 2, '2024-08-17', 'enrolled'),
(3, 4, '2024-08-17', 'enrolled'),
(4, 1, '2024-08-18', 'enrolled'),
(4, 5, '2024-08-18', 'enrolled'),
(5, 3, '2024-08-19', 'enrolled'),
(5, 4, '2024-08-19', 'enrolled');

-- Sample data for grades
INSERT OR IGNORE INTO grades (student_id, course_id, grade_value, grade_letter, semester, academic_year) VALUES
(1, 1, 92.5, 'A-', 'Fall', 2024),
(1, 2, 88.0, 'B+', 'Fall', 2024),
(2, 1, 95.0, 'A', 'Fall', 2024),
(2, 3, 87.5, 'B+', 'Fall', 2024),
(3, 2, 91.0, 'A-', 'Fall', 2024),
(3, 4, 84.0, 'B', 'Fall', 2024),
(4, 1, 89.0, 'B+', 'Fall', 2024),
(4, 5, 82.5, 'B-', 'Fall', 2024),
(5, 3, 93.5, 'A', 'Fall', 2024),
(5, 4, 86.0, 'B', 'Fall', 2024);
