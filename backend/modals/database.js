const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create or connect to the database
const db = new sqlite3.Database(path.resolve(__dirname, 'database.sqlite'), (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Export the database instance
module.exports = db;
