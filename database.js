const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./nani.db", (err) => {
  if (err) console.error("DB Error:", err.message);
  else console.log("Connected to SQLite database.");
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS remedies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      ingredients TEXT,
      category TEXT DEFAULT 'General',
      likes INTEGER DEFAULT 0,
      userEmail TEXT NOT NULL,
      userName TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS likes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      remedyId INTEGER NOT NULL,
      userEmail TEXT NOT NULL,
      UNIQUE(remedyId, userEmail)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      remedyId INTEGER NOT NULL,
      userEmail TEXT NOT NULL,
      userName TEXT NOT NULL,
      comment TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
