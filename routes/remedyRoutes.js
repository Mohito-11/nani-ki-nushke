const express = require("express");
const db = require("../database");

const router = express.Router();

// CREATE REMEDY
router.post("/create", (req, res) => {
  const { title, description, ingredients, category, userEmail, userName } = req.body;

  if (!title || !description || !userEmail || !userName) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  db.run(
    `INSERT INTO remedies (title, description, ingredients, category, userEmail, userName)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [title, description, ingredients || "", category || "General", userEmail, userName],
    function (err) {
      if (err) return res.status(500).json({ message: "Failed to add remedy" });
      res.json({ message: "Remedy posted!", id: this.lastID });
    }
  );
});

// GET ALL REMEDIES (feed - most liked first)
router.get("/all", (req, res) => {
  db.all(
    `SELECT * FROM remedies ORDER BY likes DESC, createdAt DESC`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ message: "Failed to fetch" });
      res.json(rows);
    }
  );
});

// GET SINGLE REMEDY
router.get("/single/:id", (req, res) => {
  db.get(
    `SELECT * FROM remedies WHERE id = ?`,
    [req.params.id],
    (err, row) => {
      if (err) return res.status(500).json({ message: "Error" });
      if (!row) return res.status(404).json({ message: "Not found" });
      res.json(row);
    }
  );
});

// SEARCH REMEDIES (with suggestions)
router.get("/search", (req, res) => {
  const q = `%${req.query.q || ""}%`;
  db.all(
    `SELECT * FROM remedies
     WHERE title LIKE ? OR description LIKE ? OR category LIKE ? OR ingredients LIKE ?
     ORDER BY likes DESC
     LIMIT 20`,
    [q, q, q, q],
    (err, rows) => {
      if (err) return res.status(500).json({ message: "Search failed" });
      res.json(rows);
    }
  );
});

// SEARCH SUGGESTIONS (titles only)
router.get("/suggest", (req, res) => {
  const q = `%${req.query.q || ""}%`;
  db.all(
    `SELECT id, title, category FROM remedies
     WHERE title LIKE ? OR category LIKE ?
     LIMIT 6`,
    [q, q],
    (err, rows) => {
      if (err) return res.status(500).json([]);
      res.json(rows);
    }
  );
});

// LIKE / UNLIKE REMEDY (toggle)
router.put("/like/:id", (req, res) => {
  const id = req.params.id;
  const { userEmail } = req.body;

  if (!userEmail) return res.status(400).json({ message: "Login to like" });

  // Check if already liked
  db.get(
    `SELECT * FROM likes WHERE remedyId = ? AND userEmail = ?`,
    [id, userEmail],
    (err, existing) => {
      if (err) return res.status(500).json({ message: "Error" });

      if (existing) {
        // Unlike
        db.run(`DELETE FROM likes WHERE remedyId = ? AND userEmail = ?`, [id, userEmail], (err) => {
          if (err) return res.status(500).json({ message: "Error" });
          db.run(`UPDATE remedies SET likes = likes - 1 WHERE id = ? AND likes > 0`, [id], () => {
            res.json({ message: "Unliked", liked: false });
          });
        });
      } else {
        // Like
        db.run(`INSERT INTO likes (remedyId, userEmail) VALUES (?, ?)`, [id, userEmail], (err) => {
          if (err) return res.status(500).json({ message: "Error" });
          db.run(`UPDATE remedies SET likes = likes + 1 WHERE id = ?`, [id], () => {
            res.json({ message: "Liked", liked: true });
          });
        });
      }
    }
  );
});

// CHECK IF USER LIKED A REMEDY
router.get("/liked/:id", (req, res) => {
  const { email } = req.query;
  if (!email) return res.json({ liked: false });

  db.get(
    `SELECT * FROM likes WHERE remedyId = ? AND userEmail = ?`,
    [req.params.id, email],
    (err, row) => {
      res.json({ liked: !!row });
    }
  );
});

// GET MY POSTS
router.get("/my/:email", (req, res) => {
  db.all(
    `SELECT * FROM remedies WHERE userEmail = ? ORDER BY createdAt DESC`,
    [req.params.email],
    (err, rows) => {
      if (err) return res.status(500).json({ message: "Error" });
      res.json(rows);
    }
  );
});

// DELETE REMEDY (only owner)
router.delete("/delete/:id", (req, res) => {
  const { userEmail } = req.body;

  db.get(`SELECT * FROM remedies WHERE id = ?`, [req.params.id], (err, row) => {
    if (err || !row) return res.status(404).json({ message: "Not found" });
    if (row.userEmail !== userEmail) return res.status(403).json({ message: "Not authorized" });

    db.run(`DELETE FROM remedies WHERE id = ?`, [req.params.id], (err) => {
      if (err) return res.status(500).json({ message: "Error" });
      db.run(`DELETE FROM likes WHERE remedyId = ?`, [req.params.id]);
      db.run(`DELETE FROM comments WHERE remedyId = ?`, [req.params.id]);
      res.json({ message: "Deleted" });
    });
  });
});

// ADD COMMENT
router.post("/comment/:id", (req, res) => {
  const { userEmail, userName, comment } = req.body;
  if (!comment || !userEmail) return res.status(400).json({ message: "Missing fields" });

  db.run(
    `INSERT INTO comments (remedyId, userEmail, userName, comment) VALUES (?, ?, ?, ?)`,
    [req.params.id, userEmail, userName, comment],
    function (err) {
      if (err) return res.status(500).json({ message: "Error" });
      res.json({ message: "Comment added", id: this.lastID });
    }
  );
});

// GET COMMENTS
router.get("/comments/:id", (req, res) => {
  db.all(
    `SELECT * FROM comments WHERE remedyId = ? ORDER BY createdAt ASC`,
    [req.params.id],
    (err, rows) => {
      if (err) return res.status(500).json([]);
      res.json(rows);
    }
  );
});

// GET CATEGORIES
router.get("/categories", (req, res) => {
  db.all(
    `SELECT category, COUNT(*) as count FROM remedies GROUP BY category ORDER BY count DESC`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json([]);
      res.json(rows);
    }
  );
});

// TRENDING (top 6 most liked)
router.get("/trending", (req, res) => {
  db.all(
    `SELECT * FROM remedies ORDER BY likes DESC LIMIT 6`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json([]);
      res.json(rows);
    }
  );
});

module.exports = router;
