const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// flexible function for creating user with different roles.
async function registerUser(req, res, role = 'user') {
    try {
        // get user data from request
        const { username, password, instrument } = req.body;
        
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
            role
        });
        
        // save user
        await newUser.save();
        res.status(201).json({ message: `${role === 'admin' ? 'Admin' : 'User'} registered successfully` });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Server error creating a new user' });
    }
}

// register admin
router.post('/register-admin', async (req, res) => {
    registerUser(req, res, 'admin');
});

// register user
router.post('/register', async (req, res) => {
    registerUser(req, res, 'user');
});

// login user
router.post('/login', async (req, res) => {
    try {
        // get user login data 
        const { username, password } = req.body;

        // check if there is such username
        const user = await User.findOne({ username });
        if(!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        res.status(200).json({ message: 'User login successful',
            user: {
                id: user._id,
                username: user.username,
                instrument: user.instrument,
                role: user.role
              }
         });        
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while login to user' });
    }
});

// delete user
router.delete('/delete/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const deletedUser = await User.findOneAndDelete({ username });

        if(!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: `User '${username}' deleted` });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while deleting user' });
    }
});

// get all users
router.get('/all', async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.status(200).json(users);
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while fetching users' });
    }
})


module.exports = router;





//  register user
// router.post('/register', async (req, res) => {
//     try {
//         // get user data from request
//         const { username, password, instrument } = req.body;
        
//         // check if username already signed
//         const isRegistered = await User.findOne({ username });
//         if(isRegistered) {
//             return res.status(400).json({ message: 'Username already exist' });
//         }

//         // encrypted hash password
//         const hashedPassword = await bcrypt.hash(password, 10);
        
//         // create new user with encrypted password
//         const newUser = new User({
//             username,
//             password: hashedPassword,
//             instrument,
//             role: 'user'
//         });
        
//         // save user
//         await newUser.save();
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch(err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server error creating a new user' });
//     }
// });