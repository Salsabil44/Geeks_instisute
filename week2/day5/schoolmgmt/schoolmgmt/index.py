from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from database.index import init_db, db
from models.your_model import Student, Teacher, Course, Grade, Enrollment
from sqlalchemy.orm import joinedload
from datetime import datetime
import os

app = Flask(__name__)

# Initialize database
init_db(app)

@app.route('/')
def index():
    """Main dashboard page"""
    stats = {
        'total_students': Student.query.count(),
        'total_teachers': Teacher.query.count(),
        'total_courses': Course.query.count(),
        'total_grades': Grade.query.count()
    }
    
    recent_students = Student.query.order_by(Student.id.desc()).limit(5).all()
    recent_courses = Course.query.order_by(Course.id.desc()).limit(5).all()
    
    return render_template('index.html', stats=stats, 
                         recent_students=recent_students, 
                         recent_courses=recent_courses)

# Student routes
@app.route('/students')
def students_list():
    """List all students"""
    students = Student.query.all()
    return render_template('students/index.html', students=students)

@app.route('/students/create', methods=['GET', 'POST'])
def student_create():
    """Create a new student"""
    if request.method == 'POST':
        try:
            student = Student(
                student_id=request.form['student_id'],
                first_name=request.form['first_name'],
                last_name=request.form['last_name'],
                email=request.form['email'],
                grade_level=int(request.form['grade_level']) if request.form['grade_level'] else None
            )
            db.session.add(student)
            db.session.commit()
            flash('Student created successfully!', 'success')
            return redirect(url_for('students_list'))
        except Exception as e:
            flash(f'Error creating student: {str(e)}', 'error')
    
    return render_template('students/create.html')

@app.route('/students/<int:id>/edit', methods=['GET', 'POST'])
def student_edit(id):
    """Edit a student"""
    student = Student.query.get_or_404(id)
    
    if request.method == 'POST':
        try:
            student.student_id = request.form['student_id']
            student.first_name = request.form['first_name']
            student.last_name = request.form['last_name']
            student.email = request.form['email']
            student.grade_level = int(request.form['grade_level']) if request.form['grade_level'] else None
            db.session.commit()
            flash('Student updated successfully!', 'success')
            return redirect(url_for('students_list'))
        except Exception as e:
            flash(f'Error updating student: {str(e)}', 'error')
    
    return render_template('students/edit.html', student=student)

@app.route('/students/<int:id>')
def student_details(id):
    """Show student details"""
    student = Student.query.get_or_404(id)
    enrollments = Enrollment.query.filter_by(student_id=id).all()
    grades = Grade.query.filter_by(student_id=id).all()
    return render_template('students/details.html', student=student, 
                         enrollments=enrollments, grades=grades)

@app.route('/students/<int:id>/delete', methods=['POST'])
def student_delete(id):
    """Delete a student"""
    student = Student.query.get_or_404(id)
    try:
        db.session.delete(student)
        db.session.commit()
        flash('Student deleted successfully!', 'success')
    except Exception as e:
        flash(f'Error deleting student: {str(e)}', 'error')
    
    return redirect(url_for('students_list'))

# Teacher routes
@app.route('/teachers')
def teachers_list():
    """List all teachers"""
    teachers = Teacher.query.all()
    return render_template('teachers/index.html', teachers=teachers)

@app.route('/teachers/create', methods=['GET', 'POST'])
def teacher_create():
    """Create a new teacher"""
    if request.method == 'POST':
        try:
            teacher = Teacher(
                teacher_id=request.form['teacher_id'],
                first_name=request.form['first_name'],
                last_name=request.form['last_name'],
                email=request.form['email'],
                subject_specialty=request.form['subject_specialty']
            )
            db.session.add(teacher)
            db.session.commit()
            flash('Teacher created successfully!', 'success')
            return redirect(url_for('teachers_list'))
        except Exception as e:
            flash(f'Error creating teacher: {str(e)}', 'error')
    
    return render_template('teachers/create.html')

@app.route('/teachers/<int:id>/edit', methods=['GET', 'POST'])
def teacher_edit(id):
    """Edit a teacher"""
    teacher = Teacher.query.get_or_404(id)
    
    if request.method == 'POST':
        try:
            teacher.teacher_id = request.form['teacher_id']
            teacher.first_name = request.form['first_name']
            teacher.last_name = request.form['last_name']
            teacher.email = request.form['email']
            teacher.subject_specialty = request.form['subject_specialty']
            db.session.commit()
            flash('Teacher updated successfully!', 'success')
            return redirect(url_for('teachers_list'))
        except Exception as e:
            flash(f'Error updating teacher: {str(e)}', 'error')
    
    return render_template('teachers/edit.html', teacher=teacher)

@app.route('/teachers/<int:id>')
def teacher_details(id):
    """Show teacher details"""
    teacher = Teacher.query.get_or_404(id)
    courses = Course.query.filter_by(teacher_id=id).all()
    return render_template('teachers/details.html', teacher=teacher, courses=courses)

@app.route('/teachers/<int:id>/delete', methods=['POST'])
def teacher_delete(id):
    """Delete a teacher"""
    teacher = Teacher.query.get_or_404(id)
    try:
        db.session.delete(teacher)
        db.session.commit()
        flash('Teacher deleted successfully!', 'success')
    except Exception as e:
        flash(f'Error deleting teacher: {str(e)}', 'error')
    
    return redirect(url_for('teachers_list'))

# Course routes
@app.route('/courses')
def courses_list():
    """List all courses with search and filtering"""
    # Get search parameters
    search_query = request.args.get('search', '')
    teacher_filter = request.args.get('teacher_filter', '')
    status_filter = request.args.get('status_filter', '')
    
    # Start with base query
    query = Course.query.options(joinedload(Course.teacher), joinedload(Course.enrollments))
    
    # Apply search filter
    if search_query:
        search_term = f'%{search_query}%'
        query = query.filter(
            db.or_(
                Course.course_name.ilike(search_term),
                Course.course_code.ilike(search_term),
                Course.description.ilike(search_term)
            )
        )
    
    # Apply teacher filter
    if teacher_filter:
        query = query.filter(Course.teacher_id == int(teacher_filter))
    
    # Apply status filter - we'll filter after getting the results
    # since we need to calculate enrollment counts
    
    # Get all courses for filtering
    courses = query.all()
    
    # Apply status filter after getting courses
    if status_filter:
        filtered_courses = []
        for course in courses:
            current_enrollment = len(course.enrollments)
            max_students = course.max_students if course.max_students else 30
            
            if status_filter == 'open' and current_enrollment < max_students:
                filtered_courses.append(course)
            elif status_filter == 'full' and current_enrollment == max_students:
                filtered_courses.append(course)
            elif status_filter == 'overflow' and current_enrollment > max_students:
                filtered_courses.append(course)
        
        courses = filtered_courses
    
    # Get all teachers for the filter dropdown
    teachers = Teacher.query.all()
    
    return render_template('courses/index.html', courses=courses, teachers=teachers)

@app.route('/courses/create', methods=['GET', 'POST'])
def course_create():
    """Create a new course"""
    teachers = Teacher.query.all()
    
    if request.method == 'POST':
        try:
            course = Course(
                course_code=request.form['course_code'],
                course_name=request.form['course_name'],
                description=request.form['description'],
                credits=int(request.form['credits']) if request.form['credits'] else 1,
                teacher_id=int(request.form['teacher_id']) if request.form['teacher_id'] else None,
                max_students=int(request.form['max_students']) if request.form['max_students'] else 30
            )
            db.session.add(course)
            db.session.commit()
            flash('Course created successfully!', 'success')
            return redirect(url_for('courses_list'))
        except Exception as e:
            flash(f'Error creating course: {str(e)}', 'error')
    
    return render_template('courses/create.html', teachers=teachers)

@app.route('/courses/<int:id>/edit', methods=['GET', 'POST'])
def course_edit(id):
    """Edit a course"""
    course = Course.query.get_or_404(id)
    teachers = Teacher.query.all()
    
    if request.method == 'POST':
        try:
            course.course_code = request.form['course_code']
            course.course_name = request.form['course_name']
            course.description = request.form['description']
            course.credits = int(request.form['credits']) if request.form['credits'] else 1
            course.teacher_id = int(request.form['teacher_id']) if request.form['teacher_id'] else None
            course.max_students = int(request.form['max_students']) if request.form['max_students'] else 30
            db.session.commit()
            flash('Course updated successfully!', 'success')
            return redirect(url_for('courses_list'))
        except Exception as e:
            flash(f'Error updating course: {str(e)}', 'error')
    
    return render_template('courses/edit.html', course=course, teachers=teachers)

@app.route('/courses/<int:id>')
def course_details(id):
    """Show course details"""
    course = Course.query.get_or_404(id)
    enrollments = Enrollment.query.filter_by(course_id=id).all()
    grades = Grade.query.filter_by(course_id=id).all()
    return render_template('courses/details.html', course=course, 
                         enrollments=enrollments, grades=grades)

@app.route('/courses/<int:id>/delete', methods=['POST'])
def course_delete(id):
    """Delete a course"""
    course = Course.query.get_or_404(id)
    try:
        db.session.delete(course)
        db.session.commit()
        flash('Course deleted successfully!', 'success')
    except Exception as e:
        flash(f'Error deleting course: {str(e)}', 'error')
    
    return redirect(url_for('courses_list'))

# Grade routes
@app.route('/grades')
def grades_list():
    """List all grades"""
    grades = Grade.query.all()
    return render_template('grades/index.html', grades=grades)

@app.route('/grades/create', methods=['GET', 'POST'])
def grade_create():
    """Create a new grade"""
    students = Student.query.all()
    courses = Course.query.all()
    
    if request.method == 'POST':
        try:
            grade = Grade(
                student_id=int(request.form['student_id']),
                course_id=int(request.form['course_id']),
                grade_value=float(request.form['grade_value']) if request.form['grade_value'] else None,
                grade_letter=request.form['grade_letter'],
                semester=request.form['semester'],
                academic_year=int(request.form['academic_year']) if request.form['academic_year'] else None
            )
            db.session.add(grade)
            db.session.commit()
            flash('Grade created successfully!', 'success')
            return redirect(url_for('grades_list'))
        except Exception as e:
            flash(f'Error creating grade: {str(e)}', 'error')
    
    return render_template('grades/create.html', students=students, courses=courses)

@app.route('/grades/<int:id>/edit', methods=['GET', 'POST'])
def grade_edit(id):
    """Edit a grade"""
    grade = Grade.query.get_or_404(id)
    students = Student.query.all()
    courses = Course.query.all()
    
    if request.method == 'POST':
        try:
            grade.student_id = int(request.form['student_id'])
            grade.course_id = int(request.form['course_id'])
            grade.grade_value = float(request.form['grade_value']) if request.form['grade_value'] else None
            grade.grade_letter = request.form['grade_letter']
            grade.semester = request.form['semester']
            grade.academic_year = int(request.form['academic_year']) if request.form['academic_year'] else None
            db.session.commit()
            flash('Grade updated successfully!', 'success')
            return redirect(url_for('grades_list'))
        except Exception as e:
            flash(f'Error updating grade: {str(e)}', 'error')
    
    return render_template('grades/edit.html', grade=grade, students=students, courses=courses)

@app.route('/grades/<int:id>/delete', methods=['POST'])
def grade_delete(id):
    """Delete a grade"""
    grade = Grade.query.get_or_404(id)
    try:
        db.session.delete(grade)
        db.session.commit()
        flash('Grade deleted successfully!', 'success')
    except Exception as e:
        flash(f'Error deleting grade: {str(e)}', 'error')
    
    return redirect(url_for('grades_list'))

# Statistics route
@app.route('/stats')
def stats():
    """Show statistics page"""
    stats = {
        'total_students': Student.query.count(),
        'total_teachers': Teacher.query.count(),
        'total_courses': Course.query.count(),
        'total_grades': Grade.query.count(),
        'total_enrollments': Enrollment.query.count()
    }
    
    # Grade distribution
    grade_counts = db.session.query(Grade.grade_letter, db.func.count(Grade.id)).group_by(Grade.grade_letter).all()
    
    # Students by grade level
    grade_level_counts = db.session.query(Student.grade_level, db.func.count(Student.id)).group_by(Student.grade_level).all()
    
    # Course enrollment counts
    course_enrollment_counts = db.session.query(Course.course_name, db.func.count(Enrollment.id)).join(Enrollment).group_by(Course.id).all()
    
    return render_template('stats.html', stats=stats, 
                         grade_counts=grade_counts,
                         grade_level_counts=grade_level_counts,
                         course_enrollment_counts=course_enrollment_counts)

if __name__ == '__main__':
    app.run(debug=True)
