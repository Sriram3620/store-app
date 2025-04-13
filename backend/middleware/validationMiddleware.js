// backend/middleware/validationMiddleware.js

const {
    validateName,
    validateAddress,
    validatePassword,
    validateEmail,
  } = require('../utills/validators');
  
  function validateUser(req, res, next) {
    const { name, address, password, email, role } = req.body;
  
    if (!validateName(name)) {
      return res.status(400).json({ message: 'Invalid name' });
    }
  
    if (!validateAddress(address)) {
      return res.status(400).json({ message: 'Invalid address' });
    }
  
    if (!validatePassword(password)) {
      return res.status(400).json({ message: 'Invalid password' });
    }
  
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email' });
    }
  
    if (!['normal', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
  
    next();
  }
  
  module.exports = validateUser;
  