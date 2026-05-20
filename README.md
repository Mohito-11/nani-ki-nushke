# 🌿 Nani Ki Nushke

> An Instagram-like social platform for home remedies

## Features
- 📱 Instagram-style public feed with remedy cards
- ❤️ Like / Unlike remedies (toggle, one like per user)
- 💬 Comments on every remedy
- 🔍 Search with live suggestions
- 🗂️ Category filter pills
- 👤 User profile with stats (posts, total likes)
- 🗑️ Delete your own posts
- 🔒 JWT-based auth (register / login)
- 🌐 Click any card to open full remedy detail modal
- 📦 SQLite database (zero setup)

## Tech Stack
- **Backend:** Node.js, Express, SQLite3, bcryptjs, jsonwebtoken
- **Frontend:** Vanilla JS, HTML, CSS (no frameworks)

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Start server
npm start
# OR for auto-reload during development:
npx nodemon server.js

# 3. Open browser
# http://localhost:5000
```

## Project Structure
```
nani-ki-nushke/
├── server.js              # Express entry point
├── database.js            # SQLite setup & tables
├── routes/
│   ├── authRoutes.js      # /api/auth/register, /api/auth/login
│   └── remedyRoutes.js    # /api/remedy/*
└── public/
    ├── index.html         # Feed (home page)
    ├── login.html
    ├── register.html
    ├── dashboard.html     # Add remedy
    ├── profile.html       # My posts + stats
    └── style.css
```

## API Endpoints
| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/remedy/all | Get all remedies (sorted by likes) |
| POST | /api/remedy/create | Add new remedy |
| GET | /api/remedy/single/:id | Get one remedy |
| GET | /api/remedy/search?q= | Search remedies |
| GET | /api/remedy/suggest?q= | Search suggestions |
| PUT | /api/remedy/like/:id | Toggle like |
| GET | /api/remedy/liked/:id?email= | Check if liked |
| GET | /api/remedy/my/:email | My posts |
| DELETE | /api/remedy/delete/:id | Delete remedy |
| POST | /api/remedy/comment/:id | Add comment |
| GET | /api/remedy/comments/:id | Get comments |
| GET | /api/remedy/trending | Top 6 most liked |
| GET | /api/remedy/categories | Category counts |

## Resume Points
- Built full-stack social platform for home remedies with Node.js/Express REST API and SQLite
- Implemented JWT authentication with bcrypt password hashing for secure user sessions
- Developed Instagram-like feed with toggle likes, comments, real-time search suggestions, and category filters
- Designed responsive UI with custom CSS — card-based feed, sticky header, animated modal, toast notifications
- Deployed on [Railway / Render / Vercel]
