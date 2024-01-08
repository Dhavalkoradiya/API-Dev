const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// User Register Route
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the username already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name: req.body.name,
            email,
            password: hashedPassword,
            role: req.body.role,
            createdAt: new Date()
        });

        // Save the user to the database
        await newUser.save();

        // res.status(201).json({ message: 'User registered successfully' });
        res.send(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// User Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the username exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Generate a token
        const token = jwt.sign({ email, role: user.role }, process.env.JWT_SECRET);

        // send token
        res.send({ token: token });
        // res.status(200).json({ message: 'User logged in successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;