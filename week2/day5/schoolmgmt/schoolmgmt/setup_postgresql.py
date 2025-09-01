#!/usr/bin/env python3
"""
PostgreSQL Setup Script for School Management System
This script helps you set up the PostgreSQL database for the School Management System.
"""

import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import os
from dotenv import load_dotenv

def create_database():
    """Create the PostgreSQL database if it doesn't exist"""
    load_dotenv()
    
    # Get database connection details from environment variables
    db_host = os.getenv('DB_HOST', 'localhost')
    db_port = os.getenv('DB_PORT', '5432')
    db_user = os.getenv('DB_USER', 'postgres')
    db_password = os.getenv('DB_PASSWORD', '')
    db_name = os.getenv('DB_NAME', 'school_db')
    
    try:
        # Connect to PostgreSQL server (not to a specific database)
        conn = psycopg2.connect(
            host=db_host,
            port=db_port,
            user=db_user,
            password=db_password
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cursor = conn.cursor()
        
        # Check if database exists
        cursor.execute("SELECT 1 FROM pg_catalog.pg_database WHERE datname = %s", (db_name,))
        exists = cursor.fetchone()
        
        if not exists:
            print(f"Creating database '{db_name}'...")
            cursor.execute(f'CREATE DATABASE "{db_name}"')
            print(f"Database '{db_name}' created successfully!")
        else:
            print(f"Database '{db_name}' already exists.")
        
        cursor.close()
        conn.close()
        
        # Test connection to the new database
        test_conn = psycopg2.connect(
            host=db_host,
            port=db_port,
            user=db_user,
            password=db_password,
            database=db_name
        )
        test_conn.close()
        print(f"Successfully connected to database '{db_name}'!")
        
    except psycopg2.Error as e:
        print(f"Error: {e}")
        print("\nTroubleshooting tips:")
        print("1. Make sure PostgreSQL is running")
        print("2. Check your database credentials in .env file")
        print("3. Ensure the user has permission to create databases")
        print("4. Try connecting with psql command line tool first")

def create_env_file():
    """Create a .env file with database configuration"""
    env_content = """# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/school_db

# Flask Configuration
SECRET_KEY=your-super-secret-key-change-this-in-production

# PostgreSQL Connection Details
DB_HOST=localhost
DB_PORT=5432
DB_NAME=school_db
DB_USER=username
DB_PASSWORD=password
"""
    
    if not os.path.exists('.env'):
        with open('.env', 'w') as f:
            f.write(env_content)
        print(".env file created! Please update it with your actual database credentials.")
    else:
        print(".env file already exists.")

def main():
    """Main function"""
    print("PostgreSQL Setup for School Management System")
    print("=" * 50)
    
    # Create .env file
    create_env_file()
    print()
    
    # Create database
    create_database()
    print()
    
    print("Setup complete! Next steps:")
    print("1. Update the .env file with your actual database credentials")
    print("2. Install dependencies: pip install -r requirements.txt")
    print("3. Run the application: python index.py")

if __name__ == "__main__":
    main()

