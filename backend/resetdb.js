const db = require('./modals/database');

db.serialize(() => {
  db.run('DELETE FROM users');
  db.run('DELETE FROM ratings');
  db.run('DELETE FROM sqlite_sequence WHERE name="users"');    // Reset auto-increment ID
  db.run('DELETE FROM sqlite_sequence WHERE name="ratings"');  // Reset auto-increment ID
});

console.log('Database reset ✅');