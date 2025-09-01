from database.index import db
from datetime import datetime

class Student(db.Model):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.String(10), unique=True, nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    date_of_birth = db.Column(db.Date)
    grade_level = db.Column(db.Integer)
    enrollment_date = db.Column(db.Date, default=datetime.utcnow().date)
    status = db.Column(db.String(20), default='active')

    # Relationships with cascade delete
    enrollments = db.relationship('Enrollment', backref='student', lazy=True, cascade='all, delete-orphan')
    grades = db.relationship('Grade', backref='student', lazy=True, cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Student {self.first_name} {self.last_name}>'

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

class Teacher(db.Model):
    __tablename__ = 'teachers'

    id = db.Column(db.Integer, primary_key=True)
    teacher_id = db.Column(db.String(10), unique=True, nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    subject_specialty = db.Column(db.String(100))
    hire_date = db.Column(db.Date, default=datetime.utcnow().date)
    status = db.Column(db.String(20), default='active')

    # Relationships with cascade delete
    courses = db.relationship('Course', backref='teacher', lazy=True, cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Teacher {self.first_name} {self.last_name}>'

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

class Course(db.Model):
    __tablename__ = 'courses'

    id = db.Column(db.Integer, primary_key=True)
    course_code = db.Column(db.String(20), unique=True, nullable=False)
    course_name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    credits = db.Column(db.Integer, default=1)
    max_students = db.Column(db.Integer, default=30)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.id', ondelete='SET NULL'), nullable=True)

    # Relationships with cascade delete
    enrollments = db.relationship('Enrollment', backref='course', lazy=True, cascade='all, delete-orphan')
    grades = db.relationship('Grade', backref='course', lazy=True, cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Course {self.course_name}>'

    @property
    def current_enrollment(self):
        return len(self.enrollments)

    @property
    def available_spots(self):
        return max(0, self.max_students - self.current_enrollment)

class Enrollment(db.Model):
    __tablename__ = 'enrollments'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id', ondelete='CASCADE'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id', ondelete='CASCADE'), nullable=False)
    enrollment_date = db.Column(db.Date, default=datetime.utcnow().date)
    status = db.Column(db.String(20), default='enrolled')

    def __repr__(self):
        return f'<Enrollment Student {self.student_id} in Course {self.course_id}>'

class Grade(db.Model):
    __tablename__ = 'grades'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id', ondelete='CASCADE'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id', ondelete='CASCADE'), nullable=False)
    grade_value = db.Column(db.Float)
    grade_letter = db.Column(db.String(3))
    semester = db.Column(db.String(20))
    academic_year = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Grade {self.grade_value} for Student {self.student_id} in Course {self.course_id}>'
