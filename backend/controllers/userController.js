const bcrypt = require('bcryptjs');
const db = require('../modals/database');

// ✅ 1. Get All Users (Admin only)
const getAllUsers = (req, res) => {
    db.all('SELECT id, name, email, address, role FROM users', [], (err, rows) => {
        if (err) return res.status(500).json({ message: 'Error fetching users' });
        res.status(200).json(rows);
    });
};

// ✅ 2. Delete User (Admin only)
const deleteUser = (req, res) => {
    const userId = req.params.id;
    db.run('DELETE FROM users WHERE id = ?', [userId], function(err) {
        if (err) return res.status(500).json({ message: 'Error deleting user' });
        if (this.changes === 0) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    });
};

// ✅ 3. View My Profile
const getMyProfile = (req, res) => {
    const userId = req.user.id;
    db.get('SELECT id, name, email, address, role FROM users WHERE id = ?', [userId], (err, row) => {
        if (err) return res.status(500).json({ message: 'Error fetching profile' });
        res.status(200).json(row);
    });
};

// ✅ 4. Update Profile (Name and Address)
const updateProfile = (req, res) => {
    const { name, address } = req.body;
    const userId = req.user.id;

    if (!name || !address) {
        return res.status(400).json({ message: 'Name and Address are required' });
    }

    db.run('UPDATE users SET name = ?, address = ? WHERE id = ?', [name, address, userId], function (err) {
        if (err) return res.status(500).json({ message: 'Failed to update profile' });
        res.status(200).json({ message: 'Profile updated successfully' });
    });
};

// ✅ 5. Change Password
const changePassword = (req, res) => {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    db.get('SELECT password FROM users WHERE id = ?', [userId], (err, row) => {
        if (err || !row) return res.status(404).json({ message: 'User not found' });

        const isMatch = bcrypt.compareSync(currentPassword, row.password);
        if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });

        const hashed = bcrypt.hashSync(newPassword, 10);
        db.run('UPDATE users SET password = ? WHERE id = ?', [hashed, userId], function (err) {
            if (err) return res.status(500).json({ message: 'Password update failed' });
            res.status(200).json({ message: 'Password updated successfully' });
        });
    });
};

// ✅ 6. Admin Creates User (Normal or Admin)
const adminCreateUser = (req, res) => {
    const { name, email, password, address, role } = req.body;

    if (!name || !email || !password || !address || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    db.run(
        `INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)`,
        [name, email, hashedPassword, address, role],
        function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ message: 'Error creating user' });
            }
            res.status(201).json({ message: 'User created', user_id: this.lastID });
        }
    );
};

module.exports = {
    getAllUsers,
    deleteUser,
    getMyProfile,
    updateProfile,
    changePassword,
    adminCreateUser
};
