# 🚀 ProjectHub - Mini SaaS Dashboard

A responsive full-stack project management dashboard built with Next.js, TypeScript, Prisma, SQLite, and Tailwind CSS.

---

## 📖 Overview

ProjectHub is a simple SaaS-style dashboard that allows users to manage projects by creating, updating, deleting, searching, filtering, and sorting project information.

This project was built as part of a Full-Stack Developer technical assessment.

---

## ✨ Features

- Dashboard overview cards
- Create new projects
- Edit existing projects
- Delete projects
- Search projects by name
- Filter projects by status
- Sort projects
  - Newest
  - Project Name
  - Deadline
  - Budget (High → Low)
  - Budget (Low → High)
- Responsive design
- Custom confirmation modal
- Success notifications
- Project progress bars
- Status badges
- SQLite database using Prisma ORM
- REST API

---

## 🛠 Tech Stack

### Frontend

- Next.js 15 / App Router
- React
- TypeScript
- Tailwind CSS

### Backend

- Next.js API Routes
- Prisma ORM
- SQLite Database

---

## 📂 Folder Structure

```text
app/
 ├── api/
 │    └── projects/
 ├── page.tsx
 └── layout.tsx

components/
 ├── Header.tsx
 ├── DashboardCards.tsx
 └── ProjectTable.tsx

lib/
 └── prisma.ts

prisma/
 ├── schema.prisma
 ├── migrations/
 └── seed.ts

types/
 └── project.ts
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/projecthub.git
```

Install dependencies

```bash
npm install
```

Run database migration

```bash
npm run db:migrate
```

Seed the database

```bash
npm run db:seed
```

Start the development server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

## 📡 API Endpoints

### Get all projects

```
GET /api/projects
```

### Create project

```
POST /api/projects
```

### Update project

```
PUT /api/projects/:id
```

### Delete project

```
DELETE /api/projects/:id
```

---

## 🎯 Main Features

- Responsive Dashboard
- Project Statistics
- Search Projects
- Filter by Status
- Sort Projects
- Create Project
- Edit Project
- Delete Project
- Progress Indicators
- Status Badges
- Toast Notifications

---

## 📸 Screenshots

After deployment, add screenshots here.

Example:

- Dashboard
- Add Project Modal
- Delete Confirmation
- Search & Filter

---

## 🚀 Future Improvements

- Authentication
- PostgreSQL deployment
- Team management
- Project attachments
- Charts and analytics
- Activity logs

---

## 👨‍💻 Author

**Gabriel Oyibo**

Built with Next.js, Prisma, TypeScript and Tailwind CSS.
