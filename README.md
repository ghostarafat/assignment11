eTuitionBd - Tuition Management System
Project Overview

eTuitionBd is a comprehensive Tuition Management System designed for students, tutors, and admins to manage tuition-related activities efficiently. This platform provides features for tuition posting, tutor applications, financial tracking, secure payments, and structured communication between students and tutors.

Purpose:

Solve the real problem of finding qualified tutors and verified tuition.

Reduce friction between students and tutors with automated workflows.

Enable digital class tracking, transparent payments, and organized communication.

Assist admins in monitoring and regulating all platform activities.

Features
Authentication

Register as Student or Tutor

Login via Email/Password or Google OAuth

JWT-based role verification for Students, Tutors, and Admins

Private routes with role-based redirection

Student Dashboard

My Tuitions: View approved tuition posts

Post New Tuition: Create new tuition requests

Applied Tutors: View tutor applications

Payments: Track tuition payments

Profile Settings: Update personal information

CRUD functionalities for tuition posts

Tutor Dashboard

My Applications: Track status of tuition applications

Ongoing Tuitions: View approved tuition posts

Revenue History: Track earnings from completed tuitions

Apply to tuitions with qualifications, experience, and expected salary

Admin Dashboard

User Management: Update/delete users, change roles

Tuition Management: Approve/reject tuition posts

Reports & Analytics: Total earnings, transaction history, platform insights

Home Page

Hero section with engaging visuals

Dynamic Latest Tuitions & Tutors section (auto-fetched from backend)

Platform Steps section (3-step visual grid)

Why Choose Us features section

Smooth animations using Framer Motion

Additional Functionalities

Stripe payment integration for approved tutors

Search, sort, pagination, and advanced filters on tuition listings

Mobile-responsive layouts for dashboards and public pages

Error page (404) and loading spinners

Clean UI with consistent heading styles, button styles, and image sizes

Optional Features

Tutor rating & review system

In-app messaging

Class calendar sync

Notifications system

Bookmarking tutors or tuition posts

Tech Stack

Frontend: React, DaisyUI, Framer Motion

Backend: Node.js, Express.js

Database: MongoDB

Authentication: Firebase Authentication

Payment: Stripe

Deployment: Vercel / Netlify (Frontend), Render / Heroku (Backend)

Environment Variables: Firebase keys & MongoDB credentials stored securely

Project Workflow

Students register and post tuition requirements (class, subject, budget, location, schedule).

Tutors browse tuition posts and apply to suitable tuitions.

Admins review applications, verify tutors, and approve/reject tuition posts.

Admins monitor platform activity, handle disputes, and generate reports.

Live Demo

Live Site Link: https://etutionbd11.netlify.app/

GitHub Repositories

Client:https://github.com/ghostarafat/assignment11

Server:https://github.com/ghostarafat/assignment11-server

Usage

Clone the repositories.

Install dependencies:

npm install

Set environment variables in .env:

MONGO_URI=<your_mongodb_uri>
FIREBASE_API_KEY=<your_firebase_api_key>
...

Start the server:

npm run dev

Start the frontend:

npm start

Commit Guidelines

Client: Minimum 20 meaningful commits

Server: Minimum 12 meaningful commits

UI & Layout

Responsive, full-width layout

Sticky navbar and polished footer

Consistent color theme and alignment

Dashboard charts & graphs for Admin

Challenges Implemented

Search & Sort functionality on tuition listings

Pagination on tuition listing page

JWT Token verification with roles & expiration

Advanced filters by class, subject, and location

Author

Arafat Hossain
