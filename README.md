# MERN Stack Intern Assignment

A mini-project to test Authentication, Role-based Access, and Dashboard CRUD using the MERN stack.

---

## Folder Structure

mern-intern-assignment_full/
│
├── backend/ # Node.js + Express backend
├── frontend/ # React frontend
└── README.md

yaml
Copy code

---

## Features

### Authentication
- Sign Up and Login using email & password
- JWT-based authentication
- Passwords hashed using bcrypt

### User Roles
- **Admin**
- **Student (normal user)**

### Dashboards
- **Admin Dashboard**
  - View all students
  - Add / Edit / Delete student records
- **Student Dashboard**
  - View only their own profile
  - Update profile (name, email, course)

### Student Entity
- Name
- Email
- Course (e.g., "MERN Bootcamp")
- Enrollment Date

---

## Default Users

| Role   | Email                 | Password     |
|--------|----------------------|-------------|
| Admin  | admin@example.com     | admin123    |
| Student| student@example.com   | student123  |

---

## Backend Setup

1. Navigate to backend folder:
   ```bash
   cd backend
Install dependencies:

bash
Copy code
npm install
Start server:

bash
Copy code
npm run dev
Server runs on http://localhost:5000

Frontend Setup
Navigate to frontend folder:

bash
Copy code
cd frontend
Install dependencies:

bash
Copy code
npm install
Start React app:

bash
Copy code
npm start
App runs on http://localhost:3000

API Base URL
Frontend Axios is configured to use:

bash
Copy code
http://localhost:5000/api
Usage
Open the app in browser: http://localhost:3000

Login with default credentials or create a new account

Access dashboards based on role

Admin can manage students, students can edit their profile

Notes
Ensure both frontend and backend servers are running

JWT token is stored in localStorage

Protected routes redirect based on user role
