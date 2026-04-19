# Quran Web Application

A Quran web application built using Next.js, Node.js, and Tailwind CSS.

## Live Demo
https://al-quran-n8xy.vercel.app/

## Features

- Surah List Page (114 Surahs with Arabic, English, and Bangla names)
- Ayat Page with Arabic text and translation
- Search functionality (search by translation text)
- Settings panel:
  - Arabic font selection
  - Arabic font size control
  - Translation font size control
- Settings are persisted using localStorage
- Fully responsive design

## Project Structure

This project contains both frontend and backend in the same repository:

```
Al-Quran/
├── client/    # Next.js frontend
├── backend/   # Node.js backend
```

## Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/alamin00006/Al-Quran
cd Al-Quran
```

### 2. Install dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd ../backend
npm install
```

### 3. Run the project

#### Start backend

```bash
cd backend
npm run dev
```

#### Start frontend

```bash
cd ../client
npm run dev
```

## Backend

The application uses a Node.js backend.

Due to free deployment limitations, database connections may sometimes be unavailable.  
In such cases, the application automatically falls back to local JSON data to ensure uninterrupted functionality.

## Tech Stack

- Next.js (SSG)
- Node.js
- Tailwind CSS
- JSON data

---

## Candidate Questionnaire

**Are you currently engaged in any job or academic studies?**  
I am currently engaged in academic studies.

**If Study: What is your field of study? Can you commit to a 6-days [Sat-Thu] office schedule?**  
My field of study is Computer Science and Engineering (CSE).  
However, I can fully commit to a 6-days office schedule without any conflict.

**If Job: Where are you currently employed? What is your position? What are your responsibilities there?**  
I am currently working part-time as a Software Developer.  
My responsibilities include building web applications, developing APIs, and implementing user interfaces.

**Which area of Dhaka do you currently reside in?**  
Hazaribag, Dhaka.

**Will commuting to our office (8 AM–5 PM) be manageable for you?**  
Yes, it will be manageable.

**When can you join if selected?**  
I can join immediately.

**Are you a practicing Muslim? Do you offer the five Salah (prayers) regularly?**  
Yes.

**Mention some of your favorite Islamic scholars**  
Shaikh Ahmadullah, Allama Mamunul Haque, and Mufti Abdul Malek

**What do you do in your leisure time?**  
I spend time learning new technologies, building side projects, and improving my development skills.
