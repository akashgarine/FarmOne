const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


// Register a new user
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        // Check if email is admin email
        if (email === 'admin@gmail.com' && password === 'admin') {
            // Handle admin login
            if (user.role !== 'admin') {
                // Update user's role to admin if not already set
                user.role = 'admin';
                await user.save();
            }

            const token = jwt.sign({ userId: user._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({ token, message: 'Admin logged in' });
        }

        // Check if user exists
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // For non-admin login, validate the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate token for regular user
        const token = jwt.sign({ userId: user._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token,userId: user._id, message: 'User logged in' });

    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};