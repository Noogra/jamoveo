const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//  register user
router.post('/register', async (req, res) => {
    try {
        // get user data from request
        const { username, password, instrument, role } = req.body;
        
        // check if username already signed
        const isRegistered = await User.findOne({ username });
        if(isRegistered) {
            return res.status(400).json({ message: 'Username already exist' });
        }

        // encrypted hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // create new user with encrypted password
        const newUser = new User({
            username,
            password: hashedPassword,
            instrument,
            role: role || 'user'
        });
        
        // save user
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router