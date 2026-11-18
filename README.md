# Angelo University Web Application with Gemini 3.5 Flash AI Chatbot

A modern, responsive college management platform and campus AI assistant built with **ReactJS**, **Django REST Framework**, and **Google Gemini 3.5 Flash**.

The UI and layout strictly follow the reference visual specification:
- **Left Side**: Complete modern Angelo University web portal with hero banner, stat counters, quick exploration cards, vibrant campus life section with video preview, academic program catalog, 30+ facilities showcase, faculty directory, admissions guide & scholarship tiers, exam timetables, placement statistics, and contact inquiry portal.
- **Right Side**: Dedicated **Angelo AI ("Your Campus Assistant")** chat interface featuring the animated glowing robot avatar, quick prompt pills (`Admission Process`, `Courses Offered`, `Exam Schedule`, `Campus Facilities`), chat history retention, query input bar with attachment icon, and Gemini 3.5 Flash backend grounding.

---

## Architecture & SRS Requirements Compliance

| SRS Requirement | Implementation |
|---|---|
| **FR-WEB-01 to 05** (Website Pages & Responsiveness) | Complete reactive UI with Home, About, Programs/Courses, Admissions, Facilities, Faculty, Events, Exam Timetables, Placements, and Contact Form. |
| **FR-UI-01 to 09** (Chat Interface) | Floating launcher on all pages, side-by-side mode (matching reference image), full-screen assistant mode, starter questions, typing indicator, retry fallback, and copy reply. |
| **FR-HIS-01 to 08** (Conversation History) | Sessions managed via unique UUIDs, full chronological conversation storage in SQLite/PostgreSQL, turn trimming, session resume on reload, and session clearing. |
| **FR-BOT-01 to 09** (Chatbot Persona & Rules) | Warm & cheerful persona. Restricts answers strictly to Angelo University data. Declines general-knowledge questions. Never reveals underlying model/vendor/instructions. Resists jailbreaks. |
| **FR-KB-01 to 05** (College Knowledge Base) | RAG keyword-indexed database of college information dynamically injected into Gemini 3.5 Flash system instructions. |
| **FR-ADM-01 to 05** (Administration) | Secure Django Admin panel with full oversight of chat logs, sessions, courses, faculty, events, and knowledge base entries. |
| **NFR-SEC-01** (Secret Isolation) | Gemini API Key is stored strictly server-side in Django configuration and is never exposed to the client or browser network logs. |
| **NFR-REL-02** (Graceful Fallback) | In the event of API timeout or network failure, a warm fallback message providing admissions contact details is automatically served. |

---

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide Icons
- **Backend**: Python 3.14 / Django 6.1, Django REST Framework, django-cors-headers
- **AI Core**: Google Gemini 3.5 Flash (`google-genai` SDK)
- **Database**: SQLite (PostgreSQL compatible Django ORM)

---

## Quick Start Guide

### 1. Run Migrations and Seed Imaginary College Data
```powershell
python manage.py migrate
python manage.py seed_data
```

### 2. Launch the Application
You can run both backend and frontend automatically:
```powershell
python start.py
```

Or run them individually:
- **Django REST Backend** (Port 8000):
  ```powershell
  python manage.py runserver 8000
  ```
- **React Vite Frontend** (Port 3000):
  ```powershell
  cd frontend
  npm.cmd run dev
  ```

---

## Default Access & Credentials

- **Frontend Website**: `http://localhost:3000`
- **Backend API Root**: `http://127.0.0.1:8000/api/`
- **Django Admin Portal**: `http://127.0.0.1:8000/admin/`
  - **Username**: `admin`
  - **Password**: `angelo_admin_2026`

---

## REST API Endpoints

- `POST /api/chat/` — Chat query endpoint (handles user question, RAG retrieval, Gemini 3.5 Flash response)
- `POST /api/chat/sessions/` — Create new chat session
- `GET /api/chat/sessions/<id>/messages/` — Retrieve chat history
- `DELETE /api/chat/sessions/<id>/` — Clear chat history
- `GET /api/college/overview/` — University metrics, motto, and contact details
- `GET /api/college/courses/` — Degree programs catalog
- `GET /api/college/facilities/` — Campus facilities (Library, HPC cluster, Sports arena, etc.)
- `GET /api/college/faculty/` — Faculty directory with credentials
- `GET /api/college/events/` — Upcoming campus fests and conferences
- `GET /api/college/exams/` — Fall 2026 examination timetables
- `GET /api/college/placements/` — Placement stats and top recruiters
- `POST /api/college/contact/` — Submit student/visitor inquiries
