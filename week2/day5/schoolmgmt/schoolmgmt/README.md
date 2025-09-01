# School Management System

A comprehensive Flask-based web application for managing students, teachers, courses, and grades in an educational institution.

## Features

- **Student Management**: Add, edit, delete, and view student records
- **Teacher Management**: Manage teacher profiles and assignments
- **Course Management**: Create and manage courses with enrollment tracking
- **Grade Management**: Record and track student academic performance
- **Dashboard**: Overview of system statistics and recent activities
- **Responsive Design**: Modern UI built with Tailwind CSS
- **PostgreSQL Database**: Robust, scalable database backend

## Project Structure

```
project/
├── index.py              # Main Flask application
├── config.py             # Configuration settings
├── models/
│   └── your_model.py     # Database models (Student, Teacher, Course, Grade, Enrollment)
├── database/
│   ├── index.py          # Database connection and initialization
│   └── seed/
│       ├── index.py      # Python seed data
│       └── index.sql     # SQL schema and seed data
├── templates/
│   ├── base.html         # Base template with navigation
│   ├── index.html        # Dashboard
│   ├── students/         # Student templates
│   │   ├── index.html    # Student list
│   │   ├── create.html   # Add student form
│   │   ├── edit.html     # Edit student form
│   │   └── details.html  # Student details view
│   ├── teachers/         # Teacher templates
│   │   ├── index.html    # Teacher list
│   │   ├── create.html   # Add teacher form
│   │   ├── edit.html     # Edit teacher form
│   │   └── details.html  # Teacher details view
│   ├── courses/          # Course templates
│   │   ├── index.html    # Course list
│   │   ├── create.html   # Add course form
│   │   ├── edit.html     # Edit course form
│   │   └── details.html  # Course details view
│   ├── grades/           # Grade templates
│   │   ├── index.html    # Grade list
│   │   ├── create.html   # Add grade form
│   │   └── edit.html     # Edit grade form
│   └── stats.html        # Statistics and analytics
├── setup_postgresql.py   # PostgreSQL database setup script
├── migrate_database.py   # Database migration script
├── requirements.txt      # Python dependencies
└── README.md            # This file
```

## Prerequisites

- Python 3.8 or higher
- PostgreSQL 12 or higher
- pip (Python package manager)

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd librarymgmt
```

### 2. Create a virtual environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Set up PostgreSQL Database

#### Option A: Automatic Setup (Recommended)
```bash
python setup_postgresql.py
```
This will create a `.env` file and attempt to create the database. You'll need to update the `.env` file with your actual database credentials.

#### Option B: Manual Setup
1. **Install PostgreSQL** (if not already installed)
   - **Ubuntu/Debian**: `sudo apt-get install postgresql postgresql-contrib`
   - **macOS**: `brew install postgresql`
   - **Windows**: Download from [postgresql.org](https://www.postgresql.org/download/windows/)

2. **Create database and user**
   ```sql
   CREATE DATABASE school_db;
   CREATE USER school_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE school_db TO school_user;
   ```

3. **Create `.env` file**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

#### Option C: Database Migration (If you have existing data)
If you already have a database with the old schema and are experiencing foreign key constraint errors, run the migration script:
```bash
python migrate_database.py
```
**⚠️ Warning**: This will drop and recreate all tables. Backup your data first if needed.

### 5. Configure Environment Variables
Create a `.env` file in the project root with your database credentials:
```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/school_db

# Flask Configuration
SECRET_KEY=your-super-secret-key-change-this-in-production

# PostgreSQL Connection Details
DB_HOST=localhost
DB_PORT=5432
DB_NAME=school_db
DB_USER=username
DB_PASSWORD=password
```

### 6. Run the application
```bash
python index.py
```

### 7. Access the application
Open your browser and navigate to `http://localhost:5000`

## Database

The system uses PostgreSQL as the database with the following entities:

- **Students**: Personal information, grade level, enrollment status
- **Teachers**: Personal information, subject specialty, hire date
- **Courses**: Course details, credits, teacher assignment, capacity
- **Grades**: Student performance records with numeric and letter grades
- **Enrollments**: Student-course relationships

## Usage

### Dashboard
- View system overview and statistics
- Quick access to recent students and courses
- Navigate to different sections

### Students
- View all students in a table format
- Add new students with required information
- Edit existing student records
- View detailed student information including enrollments and grades
- Delete students (with confirmation)

### Teachers
- Manage teacher profiles and assignments
- Track subject specialties and hire dates
- View courses assigned to each teacher
- Monitor teaching workload and performance

### Courses
- Create and manage course offerings
- Assign teachers to courses
- Track enrollment capacity and current enrollment
- View course details and student lists

### Grades
- Record student academic performance
- Support both numeric (0-100) and letter grades
- Organize grades by semester and academic year
- View grade distribution and analytics

### Statistics
- Comprehensive system analytics
- Grade distribution charts
- Course enrollment analysis
- Academic performance metrics
- System health indicators

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Built with Tailwind CSS for a clean, professional look
- **Data Validation**: Form validation and error handling
- **Flash Messages**: User feedback for successful operations and errors
- **Confirmation Dialogs**: Safe deletion with user confirmation
- **Breadcrumb Navigation**: Easy navigation between pages
- **PostgreSQL Backend**: Robust, scalable database with proper relationships
- **Dynamic Data**: All data is fetched from the database in real-time

## Security Features

- Simple authentication system (can be enhanced with JWT)
- Form validation and sanitization
- SQL injection prevention through SQLAlchemy ORM
- CSRF protection through Flask forms
- Environment variable configuration for sensitive data

## Customization

The system is designed to be easily customizable:

- **Database Models**: Modify `models/your_model.py` to add new fields
- **Templates**: Update HTML templates in the `templates/` directory
- **Routes**: Add new functionality in `index.py`
- **Styling**: Customize Tailwind CSS classes for different themes
- **Database**: Switch between different database backends

## Dependencies

- **Flask**: Web framework
- **Flask-SQLAlchemy**: Database ORM
- **Werkzeug**: WSGI utilities
- **psycopg2-binary**: PostgreSQL adapter
- **python-dotenv**: Environment variable management
- **Tailwind CSS**: CSS framework (loaded via CDN)

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure PostgreSQL is running
   - Check your database credentials in `.env`
   - Verify the database exists and is accessible

2. **Template Errors**
   - All Jinja2 template issues have been fixed
   - The system now uses proper string comparison methods

3. **Foreign Key Constraint Errors**
   - Run the migration script: `python migrate_database.py`
   - This will fix the cascade delete issues

4. **Import Errors**
   - Make sure all dependencies are installed
   - Check that you're in the correct virtual environment

### Getting Help

- Check the PostgreSQL logs: `sudo tail -f /var/log/postgresql/postgresql-*.log`
- Verify database connection: `psql -h localhost -U username -d school_db`
- Check Flask application logs for detailed error messages

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For questions or support, please open an issue in the repository.

## Future Enhancements

- User authentication and role-based access control
- Advanced reporting and analytics
- Email notifications
- File uploads for documents
- API endpoints for mobile applications
- Advanced search and filtering
- Data export functionality
- Backup and restore features
- Real-time notifications
- Multi-language support
