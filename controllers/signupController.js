// controllers/signupController.js
const SignupData = require('../models/signupSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const handleSignUpSubmission = async (req, res) => {
   
    const { name, email, password } = req.body;

    try {
        const existingUser = await SignupData.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }
      
        const hashedPassword = await bcrypt.hash(password, 10);
   

        const Token = jwt.sign(
            { email: email },
            'your-secret-key',
            { expiresIn: '1h' }
        );

        const SignUpAt = new Date();
        const newUser = new SignupData({
            name,
            email,
            password: hashedPassword,
            Token,
            SignUpAt,
        });

        await newUser.save();

        res.status(201).json({
            message: 'User created successfully',
            data: { name, email, Token },
        });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Failed to save user', error: error.message });
    }
};

module.exports = {
    handleSignUpSubmission,
};
