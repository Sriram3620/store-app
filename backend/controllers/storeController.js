const bcrypt = require('bcryptjs');
const db = require('../modals/database');

// Controller to handle adding a store owner
const addStoreController = (req, res) => {
  const { name, email, address, password } = req.body;

  if (!name || !email || !address || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = `
    INSERT INTO users (name, email, password, address, role)
    VALUES (?, ?, ?, ?, 'store')
  `;

  const values = [name, email, hashedPassword, address];

  db.run(query, values, function (err) {
    if (err) {
      console.error('Error adding store owner:', err.message);
      return res.status(500).json({ message: 'Error adding store owner' });
    }

    res.status(201).json({ store_id: this.lastID });
  });
};

module.exports = { addStoreController };
