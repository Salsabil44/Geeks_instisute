from database.index import db
from models.your_model import Student, Teacher, Course, Grade, Enrollment
from datetime import datetime, date

def seed_database():
    """Seed the database with initial data if tables are empty"""
    
    # Check if data already exists
    if Student.query.first() is not None:
        print("Database already seeded, skipping...")
        return
    
    print("Seeding database with initial data...")
    
    try:
        # Create teachers
        teachers = [
            Teacher(
                teacher_id='T001',
                first_name='Dr. Robert',
                last_name='Wilson',
                email='robert.wilson@school.com',
                subject_specialty='Mathematics'
            ),
            Teacher(
                teacher_id='T002',
                first_name='Prof. Sarah',
                last_name='Johnson',
                email='sarah.johnson@school.com',
                subject_specialty='English Literature'
            ),
            Teacher(
                teacher_id='T003',
                first_name='Dr. Michael',
                last_name='Chen',
                email='michael.chen@school.com',
                subject_specialty='Physics'
            ),
            Teacher(
                teacher_id='T004',
                first_name='Prof. Emily',
                last_name='Davis',
                email='emily.davis@school.com',
                subject_specialty='History'
            ),
            Teacher(
                teacher_id='T005',
                first_name='Dr. James',
                last_name='Brown',
                email='james.brown@school.com',
                subject_specialty='Chemistry'
            )
        ]
        
        for teacher in teachers:
            db.session.add(teacher)
        
        db.session.commit()
        print("Teachers created successfully")
        
        # Create students
        students = [
            Student(
                student_id='S001',
                first_name='John',
                last_name='Doe',
                email='john.doe@school.com',
                date_of_birth=date(2005, 3, 15),
                grade_level=10
            ),
            Student(
                student_id='S002',
                first_name='Jane',
                last_name='Smith',
                email='jane.smith@school.com',
                date_of_birth=date(2005, 7, 22),
                grade_level=10
            ),
            Student(
                student_id='S003',
                first_name='Mike',
                last_name='Johnson',
                email='mike.johnson@school.com',
                date_of_birth=date(2004, 11, 8),
                grade_level=11
            ),
            Student(
                student_id='S004',
                first_name='Sarah',
                last_name='Williams',
                email='sarah.williams@school.com',
                date_of_birth=date(2004, 5, 30),
                grade_level=11
            ),
            Student(
                student_id='S005',
                first_name='David',
                last_name='Brown',
                email='david.brown@school.com',
                date_of_birth=date(2003, 9, 12),
                grade_level=12
            )
        ]
        
        for student in students:
            db.session.add(student)
        
        db.session.commit()
        print("Students created successfully")
        
        # Create courses
        courses = [
            Course(
                course_code='MATH101',
                course_name='Algebra I',
                description='Introduction to algebraic concepts and problem solving',
                credits=3,
                max_students=25,
                teacher_id=1
            ),
            Course(
                course_code='ENG101',
                course_name='English Literature',
                description='Study of classic and contemporary literature',
                credits=3,
                max_students=30,
                teacher_id=2
            ),
            Course(
                course_code='PHY101',
                course_name='Physics Fundamentals',
                description='Basic principles of physics and mechanics',
                credits=4,
                max_students=20,
                teacher_id=3
            ),
            Course(
                course_code='HIST101',
                course_name='World History',
                description='Overview of major historical events and civilizations',
                credits=3,
                max_students=25,
                teacher_id=4
            ),
            Course(
                course_code='CHEM101',
                course_name='Chemistry Basics',
                description='Introduction to chemical principles and laboratory safety',
                credits=4,
                max_students=22,
                teacher_id=5
            )
        ]
        
        for course in courses:
            db.session.add(course)
        
        db.session.commit()
        print("Courses created successfully")
        
        # Create enrollments
        enrollments = [
            Enrollment(student_id=1, course_id=1, enrollment_date=date(2024, 8, 15)),
            Enrollment(student_id=1, course_id=2, enrollment_date=date(2024, 8, 15)),
            Enrollment(student_id=2, course_id=1, enrollment_date=date(2024, 8, 16)),
            Enrollment(student_id=2, course_id=3, enrollment_date=date(2024, 8, 16)),
            Enrollment(student_id=3, course_id=2, enrollment_date=date(2024, 8, 17)),
            Enrollment(student_id=3, course_id=4, enrollment_date=date(2024, 8, 17)),
            Enrollment(student_id=4, course_id=1, enrollment_date=date(2024, 8, 18)),
            Enrollment(student_id=4, course_id=5, enrollment_date=date(2024, 8, 18)),
            Enrollment(student_id=5, course_id=3, enrollment_date=date(2024, 8, 19)),
            Enrollment(student_id=5, course_id=4, enrollment_date=date(2024, 8, 19))
        ]
        
        for enrollment in enrollments:
            db.session.add(enrollment)
        
        db.session.commit()
        print("Enrollments created successfully")
        
        # Create grades
        grades = [
            Grade(student_id=1, course_id=1, grade_value=92.5, grade_letter='A-', semester='Fall', academic_year=2024),
            Grade(student_id=1, course_id=2, grade_value=88.0, grade_letter='B+', semester='Fall', academic_year=2024),
            Grade(student_id=2, course_id=1, grade_value=95.0, grade_letter='A', semester='Fall', academic_year=2024),
            Grade(student_id=2, course_id=3, grade_value=87.5, grade_letter='B+', semester='Fall', academic_year=2024),
            Grade(student_id=3, course_id=2, grade_value=91.0, grade_letter='A-', semester='Fall', academic_year=2024),
            Grade(student_id=3, course_id=4, grade_value=84.0, grade_letter='B', semester='Fall', academic_year=2024),
            Grade(student_id=4, course_id=1, grade_value=89.0, grade_letter='B+', semester='Fall', academic_year=2024),
            Grade(student_id=4, course_id=5, grade_value=82.5, grade_letter='B-', semester='Fall', academic_year=2024),
            Grade(student_id=5, course_id=3, grade_value=93.5, grade_letter='A', semester='Fall', academic_year=2024),
            Grade(student_id=5, course_id=4, grade_value=86.0, grade_letter='B', semester='Fall', academic_year=2024)
        ]
        
        for grade in grades:
            db.session.add(grade)
        
        db.session.commit()
        print("Grades created successfully")
        print("Database seeding completed!")
        
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.session.rollback()
        raise
