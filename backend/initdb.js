const db = require('./modals/database');


db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    address TEXT,
    role TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS ratings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    store_id INTEGER,
    rating INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(store_id) REFERENCES users(id)
  )`);
});

console.log('Tables initialized.');
