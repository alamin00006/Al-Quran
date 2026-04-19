# Quran Web Application

A Quran web application built using Next.js, Node.js, and Tailwind CSS.

## Live Demo

https://al-quran-n8xy.vercel.app/

## Features

- Surah List Page (114 Surahs with Arabic, English, and Bangla names)
- Ayat Page with Arabic text and translation
- Search functionality (search by translation text)
- Settings panel:
  - Arabic font selection (minimum 2 fonts)
  - Arabic font size control
  - Translation font size control
- Settings are persisted using localStorage
- Fully responsive design

## Project Structure

This project contains both frontend and backend in the same repository:

```
Al-Quran/
├── client/   # Next.js frontend
├── server/   # Node.js backend
```

## Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/alamin00006/Al-Quran
cd Al-Quran
```

### 2. Install dependencies

#### Frontend (Next.js)

```bash
cd client
npm install
```

#### Backend (Node.js)

```bash
cd ../server
npm install
```

### 3. Run the project

#### Start backend

```bash
cd server
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
