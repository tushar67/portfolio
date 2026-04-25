import Database from "better-sqlite3";

const db = new Database("blog.db");

// Create table if not exists
db.exec(`
CREATE TABLE IF NOT EXISTS blogs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  content TEXT,
  created_at TEXT
)
`);

export default db;