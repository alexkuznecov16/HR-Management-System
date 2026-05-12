# Web-Based HR Accounting System

## Project Overview

This project is a web-based Human Resources (HR) accounting system designed to efficiently manage employee and department data.  
The system is built using Java Spring Boot for the backend and Next.js for the frontend.

Instead of a traditional database, the system uses In-Memory Storage, which simplifies development and testing.

---

## Technologies Used

Backend:
- Java
- Spring Boot
- REST API
- In-Memory Storage

Frontend:
- Next.js
- React

---

## Features

- Employee management (CRUD)
- Department management
- Employee assignment to departments
- REST API integration
- Web UI for interaction

---

## Architecture

Frontend (Next.js)
        ⇅ REST API
Backend (Spring Boot)
        ⇅
In-Memory Storage

---

## Running the Project

Backend:
./mvnw spring-boot:run

Frontend:
npm install
npm run dev

---

## API Endpoints

Employees:
GET /api/employees
POST /api/employees
PUT /api/employees/{id}
DELETE /api/employees/{id}

Departments:
GET /api/departments
POST /api/departments
PUT /api/departments/{id}
DELETE /api/departments/{id}

---

## Notes

- Data is stored in-memory and resets after restart.
- Project is for educational purposes.

---

Author: Aleksandrs Kuzņecovs
