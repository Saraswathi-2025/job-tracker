# Job Tracker React App

A simple job tracking web application built with *React + Vite* that fetches real remote jobs and allows users to save jobs locally.

🔗 Live Demo: https://saraswathi-2025.github.io/job-tracker/

---

## 🚀 Features

- Fetches real remote jobs from Remotive API
- Search jobs by title
- Filter jobs by job type and location
- Save jobs using browser localStorage
- Remove saved jobs
- Responsive layout
- Deployed on GitHub Pages

---

## 🛠️ Tech Stack

- React
- Vite
- JavaScript (ES6+)
- CSS
- Remotive Jobs API
- GitHub Pages

---

## 📁 Project Structure

job-tracker/ │
             ├── public/ 
             ├── src/
             │   ├── App.jsx
             │   ├── App.css
             │   ├── main.jsx
             │   └── index.css
             │ ├── index.html
             ├── vite.config.js
             ├── package.json
             └── README.md

---

⚙️ Setup & Run Locally

1. Clone the repository
git clone https://github.com/saraswathi-2025/job-tracker.git

2. Move into the project folder
cd job-tracker

3. Install dependencies
npm install

4. Start development server
npm run dev

Open in browser:
http://localhost:5173

---

##Build
npm run build
This creates an optimized production build.
The output files will be generated inside the dist/ folder.

##Deployment (GitHub Pages)
npm run deploy
This project is deployed using GitHub Pages.
Vite configuration uses:
base: "/job-tracker/"

##Notes
- Saved jobs are stored in browser localStorage
- No backend is used
- Frontend-only project
- UI improvements can be added later

Author
Saraswathi
Frontend Developer (Learning Phase)

License
This project is for learning and personal portfolio use.
