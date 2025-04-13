const db = require('../modals/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validateName, validateEmail, validateAddress, validatePassword } = require('../utills/validators');

const SECRET_KEY = 'SRI_123'; // keep this safe and move to env file later

// REGISTER
const register = (req, res) => {
  const { name, email, address, password, role } = req.body;

  if (!validateName(name) || !validateEmail(email) || !validateAddress(address) || !validatePassword(password)) {
    return res.status(400).json({ message: 'Validation failed' });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (user) return res.status(409).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
      `INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)`,
      [name, email, hashedPassword, address, role || 'normal'],
      function (err) {
        if (err) return res.status(500).json({ message: 'Registration failed' });
        res.status(201).json({ id: this.lastID, email });
      }
    );
  });
};

// LOGIN
const login = (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (!user) return res.status(404).json({ message: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  });
};

module.exports = { register, login };
