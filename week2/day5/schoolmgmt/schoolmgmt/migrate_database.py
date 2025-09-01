#!/usr/bin/env python3
"""
Database Migration Script for School Management System
This script migrates the existing database to the new schema with proper foreign key constraints.
"""

import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import os
from dotenv import load_dotenv

def migrate_database():
    """Migrate the existing database to the new schema"""
    load_dotenv()
    
    # Get database connection details
    db_host = os.getenv('DB_HOST', 'localhost')
    db_port = os.getenv('DB_PORT', '5432')
    db_user = os.getenv('DB_USER', 'postgres')
    db_password = os.getenv('DB_PASSWORD', '')
    db_name = os.getenv('DB_NAME', 'school_db')
    
    try:
        # Connect to the database
        conn = psycopg2.connect(
            host=db_host,
            port=db_port,
            user=db_user,
            password=db_password,
            database=db_name
        )
        conn.autocommit = True
        cursor = conn.cursor()
        
        print("Starting database migration...")
        
        # Check if tables exist and get their structure
        cursor.execute("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name IN ('students', 'teachers', 'courses', 'enrollments', 'grades')
        """)
        existing_tables = [row[0] for row in cursor.fetchall()]
        
        if not existing_tables:
            print("No existing tables found. Please run the application first to create the initial schema.")
            return
        
        print(f"Found existing tables: {', '.join(existing_tables)}")
        
        # Drop existing foreign key constraints if they exist
        print("Removing existing foreign key constraints...")
        
        # Get existing foreign key constraints
        cursor.execute("""
            SELECT 
                tc.table_name, 
                kcu.column_name, 
                ccu.table_name AS foreign_table_name,
                ccu.column_name AS foreign_column_name 
            FROM 
                information_schema.table_constraints AS tc 
                JOIN information_schema.key_column_usage AS kcu
                  ON tc.constraint_name = kcu.constraint_name
                  AND tc.table_schema = kcu.table_schema
                JOIN information_schema.constraint_column_usage AS ccu
                  ON ccu.constraint_name = tc.constraint_name
                  AND ccu.table_schema = tc.table_schema
            WHERE tc.constraint_type = 'FOREIGN KEY' 
            AND tc.table_schema = 'public'
        """)
        
        foreign_keys = cursor.fetchall()
        
        for fk in foreign_keys:
            table_name, column_name, foreign_table, foreign_column = fk
            constraint_name = f"fk_{table_name}_{column_name}"
            try:
                cursor.execute(f"ALTER TABLE {table_name} DROP CONSTRAINT IF EXISTS {constraint_name}")
                print(f"Dropped constraint: {constraint_name}")
            except Exception as e:
                print(f"Could not drop constraint {constraint_name}: {e}")
        
        # Drop and recreate tables with proper structure
        print("Recreating tables with proper structure...")
        
        # Drop existing tables in reverse dependency order
        cursor.execute("DROP TABLE IF EXISTS grades CASCADE")
        cursor.execute("DROP TABLE IF EXISTS enrollments CASCADE")
        cursor.execute("DROP TABLE IF EXISTS courses CASCADE")
        cursor.execute("DROP TABLE IF EXISTS students CASCADE")
        cursor.execute("DROP TABLE IF EXISTS teachers CASCADE")
        
        # Create tables with proper structure
        print("Creating new table structure...")
        
        # Teachers table
        cursor.execute("""
            CREATE TABLE teachers (
                id SERIAL PRIMARY KEY,
                teacher_id VARCHAR(10) UNIQUE NOT NULL,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                subject_specialty VARCHAR(100),
                hire_date DATE DEFAULT CURRENT_DATE,
                status VARCHAR(20) DEFAULT 'active'
            )
        """)
        
        # Students table
        cursor.execute("""
            CREATE TABLE students (
                id SERIAL PRIMARY KEY,
                student_id VARCHAR(10) UNIQUE NOT NULL,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                date_of_birth DATE,
                grade_level INTEGER,
                enrollment_date DATE DEFAULT CURRENT_DATE,
                status VARCHAR(20) DEFAULT 'active'
            )
        """)
        
        # Courses table
        cursor.execute("""
            CREATE TABLE courses (
                id SERIAL PRIMARY KEY,
                course_code VARCHAR(20) UNIQUE NOT NULL,
                course_name VARCHAR(100) NOT NULL,
                description TEXT,
                credits INTEGER DEFAULT 1,
                max_students INTEGER DEFAULT 30,
                teacher_id INTEGER REFERENCES teachers(id) ON DELETE SET NULL
            )
        """)
        
        # Enrollments table
        cursor.execute("""
            CREATE TABLE enrollments (
                id SERIAL PRIMARY KEY,
                student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
                course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
                enrollment_date DATE DEFAULT CURRENT_DATE,
                status VARCHAR(20) DEFAULT 'enrolled'
            )
        """)
        
        # Grades table
        cursor.execute("""
            CREATE TABLE grades (
                id SERIAL PRIMARY KEY,
                student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
                course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
                grade_value FLOAT,
                grade_letter VARCHAR(3),
                semester VARCHAR(20),
                academic_year INTEGER,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Create indexes
        print("Creating indexes...")
        cursor.execute("CREATE INDEX idx_students_email ON students(email)")
        cursor.execute("CREATE INDEX idx_students_student_id ON students(student_id)")
        cursor.execute("CREATE INDEX idx_teachers_email ON teachers(email)")
        cursor.execute("CREATE INDEX idx_teachers_teacher_id ON teachers(teacher_id)")
        cursor.execute("CREATE INDEX idx_courses_course_code ON courses(course_code)")
        cursor.execute("CREATE INDEX idx_enrollments_student_id ON enrollments(student_id)")
        cursor.execute("CREATE INDEX idx_enrollments_course_id ON enrollments(course_id)")
        cursor.execute("CREATE INDEX idx_grades_student_id ON grades(student_id)")
        cursor.execute("CREATE INDEX idx_grades_course_id ON grades(course_id)")
        
        print("Database migration completed successfully!")
        print("You can now run the application to seed the database with sample data.")
        
        cursor.close()
        conn.close()
        
    except Exception as e:
        print(f"Error during migration: {e}")
        print("\nTroubleshooting tips:")
        print("1. Make sure PostgreSQL is running")
        print("2. Check your database credentials in .env file")
        print("3. Ensure the user has permission to modify the database")
        print("4. Backup your data before running migration if needed")

if __name__ == "__main__":
    print("Database Migration for School Management System")
    print("=" * 50)
    print("WARNING: This will drop and recreate all tables!")
    print("Make sure you have backed up any important data.")
    print()
    
    response = input("Do you want to continue with the migration? (yes/no): ")
    if response.lower() in ['yes', 'y']:
        migrate_database()
    else:
        print("Migration cancelled.")

