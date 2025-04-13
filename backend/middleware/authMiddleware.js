const jwt = require('jsonwebtoken');
const SECRET_KEY = 'SRI_123'; // same as in controller

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: 'Authorization header missing' });

  const token = authHeader.split(' ')[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.user = decoded; // { id, role }
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin')
    return res.status(403).json({ message: 'Admin access only' });
  next();
};

const isStoreOwner = (req, res, next) => {
  if (req.user.role !== 'store')
    return res.status(403).json({ message: 'Store owner access only' });
  next();
};

module.exports = { verifyToken, isAdmin, isStoreOwner };
