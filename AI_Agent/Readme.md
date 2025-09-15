# Candidate Management CLI Tool

This is a Python command-line interface (CLI) tool for managing candidates, shortlists, and sending interview emails. It allows recruiters to search, shortlist, view, and communicate with candidates efficiently.

## Features

* Search candidates by skills, location, and experience.
* Create and save shortlists.
* View a specific shortlist or all shortlists.
* Send personalized interview emails to candidates individually.
* View analytics (pipeline stages and top skills).

## Prerequisites

* Python 3.8 or higher
* Required Python modules: `json`, `re`, `datetime`, `pathlib`, `collections` (all are part of the standard library)

## Setup

1. Clone or download the repository.
2. Ensure the following files exist in the `data/` folder:

   * `candidates.json` → list of candidate profiles
   * `positions.json` → list of job positions
   * `shortlists.json` → (optional, will be created automatically)
3. Install Python (if not installed) and create a virtual environment (optional):

   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux / macOS
   venv\Scripts\activate     # Windows
   ```
4. Run the CLI:

   ```bash
   python hr_agent.py
   ```

## Commands

* **Help**

  ```text
  help
  ```

  Shows available commands.

* **Find candidates**

  ```text
  I want React developers in Casablanca
  ```

  Searches for candidates based on skills, location, and experience range.

* **Choose candidates for a shortlist**

  ```text
  choose 1 3 5 as FE-Intern-A
  ```

  Saves the selected candidates into a named shortlist.

* **Show a shortlist**

  ```text
  show FE-Intern-A
  ```

  Shows candidates in a specific shortlist.

* **Show all shortlists**

  ```text
  show all
  ```

  Shows all shortlists and their candidates.

* **Send emails to candidates**

  ```text
  send email using Frontend Intern from FE-Intern-A
  ```

  Sends personalized interview emails to each candidate in a shortlist.

* **View analytics**

  ```text
  analytics
  ```

  Shows pipeline stages and top skills across all candidates.

* **Exit**

  ```text
  exit
  ```

  Exits the application.

## Data Format

### candidates.json

```json
[
  {
    "firstName": "Amina",
    "lastName": "El Idrissi",
    "email": "amina@example.com",
    "location": "Casablanca",
    "experienceYears": 1,
    "skills": ["React", "JS"],
    "stage": "Applied"
  }
]
```

### positions.json

```json
[
  {
    "title": "Frontend Intern",
    "department": "Engineering"
  }
]
```

### shortlists.json

Automatically created when you save shortlists.

## Notes

* The CLI automatically creates `shortlists.json` if it does not exist.
* Emails are **drafted and displayed**, not sent. You can integrate with an SMTP server to actually send emails.
* Skill and location searches are case-insensitive.
