const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    deleteUser,
    getMyProfile,
    updateProfile,
    changePassword,
    adminCreateUser
} = require('../controllers/userController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// Admin-only routes
router.get('/all-users', verifyToken, isAdmin, getAllUsers);
router.delete('/delete/:id', verifyToken, isAdmin, deleteUser);
router.post('/create', verifyToken, isAdmin, adminCreateUser);

// Normal user routes
router.get('/me', verifyToken, getMyProfile);
router.put('/update-profile', verifyToken, updateProfile);
router.put('/change-password', verifyToken, changePassword);

module.exports = router;
