
# 🌿 Nani Ki Nushke
<p align="center">
  <img width="100%" alt="Nani Ki Nushke Banner" src="https://github.com/user-attachments/assets/b26f7fef-031b-4a77-8c59-fc0cf94f23ba" />
</p>

<h3 align="center">
Nature's Wisdom, One Remedy at a Time 🌸
</h3>

<p align="center">
An Instagram-inspired social platform for discovering and sharing trusted home remedies.
</p>

<p align="center">
  <a href="https://nani-ki-nushke.onrender.com/"><strong>🌐 Live Demo</strong></a>
</p>

---

## ✨ Features

- 📱 Instagram-style public remedy feed
- ❤️ Like / Unlike functionality (one like per user)
- 💬 Comment system for every remedy
- 🔍 Real-time search with live suggestions
- 🗂️ Category-based filtering
- 👤 User profile with post & like statistics
- 🗑️ Delete your own remedies
- 🔒 JWT Authentication (Register/Login)
- 🌐 Detailed remedy modal view
- 📦 Lightweight SQLite database

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript

### Backend
- Node.js
- Express.js

### Database
- SQLite3

### Authentication
- JWT (jsonwebtoken)
- bcryptjs

### Deployment
- Render

---

## 🚀 Live Website

👉 https://nani-ki-nushke.onrender.com/

---

## 📂 Project Structure

```bash
nani-ki-nushke/
│
├── server.js
├── database.js
│
├── routes/
│   ├── authRoutes.js
│   └── remedyRoutes.js
│
├── public/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── profile.html
│   └── style.css
│
└── package.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/nani-ki-nushke.git
cd nani-ki-nushke
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the Server

```bash
npm start
```

OR for development:

```bash
npx nodemon server.js
```

### 4️⃣ Open in Browser

```bash
http://localhost:5000
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/remedy/all` | Get all remedies |
| POST | `/api/remedy/create` | Create a remedy |
| GET | `/api/remedy/single/:id` | Get single remedy |
| GET | `/api/remedy/search?q=` | Search remedies |
| GET | `/api/remedy/suggest?q=` | Search suggestions |
| PUT | `/api/remedy/like/:id` | Toggle like |
| GET | `/api/remedy/liked/:id?email=` | Check liked status |
| GET | `/api/remedy/my/:email` | Get user remedies |
| DELETE | `/api/remedy/delete/:id` | Delete remedy |
| POST | `/api/remedy/comment/:id` | Add comment |
| GET | `/api/remedy/comments/:id` | Get comments |
| GET | `/api/remedy/trending` | Top liked remedies |
| GET | `/api/remedy/categories` | Category counts |

---

## 🎯 Key Highlights

- Built a complete full-stack social platform using Node.js and Express.js
- Implemented secure JWT-based authentication system
- Developed Instagram-inspired UI with interactive social features
- Added live search suggestions and category filtering
- Created RESTful APIs for authentication, posts, likes, comments, and search
- Designed fully responsive UI using pure HTML, CSS, and JavaScript
- Deployed the application publicly on Render

---

## 💼 Resume Worthy Points

- Developed a full-stack social media platform for home remedies using Node.js, Express.js, and SQLite
- Implemented JWT authentication and bcrypt password hashing for secure sessions
- Built interactive features including likes, comments, live search, and category filtering
- Designed responsive and modern UI with custom CSS animations and modal interactions
- Created scalable REST APIs with proper routing and database integration
- Successfully deployed production-ready application on Render

---

<p align="left">
  <a href="https://github.com/your-github-username">GitHub</a>
</p>

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.
````
