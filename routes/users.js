const express = require('express')
const router = express.Router()
const User = require('../models/users')
const jwt = require('jsonwebtoken');
const secret = '27120610';

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (err) {
        res.send('Error' + err)
    }
})

router.post('/register', async (req, res) => {
    const {name, email, password, user_type } = req.body;
    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already registered' });
        }

        // Create a new user
        user = new User({ name, email, password, user_type });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).send('Server error');
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check password
        const isMatch = user.password === password;
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        //check usertype
        const isUser = user.user_type === user_type;
        if (!isUser) {
            return res.status(400).json({ message: 'Invalid userType' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        res.status(500).send('Server error');
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(user)
    } catch (err) {
        res.send('Error' + err)
    }
})

module.exports = router