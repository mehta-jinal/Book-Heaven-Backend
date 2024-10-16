const express = require('express');
const router = express.Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || '27120610'; // Store the JWT secret securely in environment variables

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
});

// User registration without bcrypt
router.post('/register', async (req, res) => {
    const { name, email, password} = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already registered' });
        }

        // Create a new user with plain password (not secure, for demonstration)
        user = new User({ name, email, password});
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).send('Server error: ' + err);
    }
});

// User login without bcrypt
router.post('/login', async (req, res) => {
    const { email, password} = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare the plain text password
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if user type matches
        // if (user.user_type !== user_type) {
        //     return res.status(400).json({ message: 'Invalid user type' });
        // }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        res.status(500).send('Server error: ' + err);
    }
});

// Update user by ID
router.patch('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
});

module.exports = router;
