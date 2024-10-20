// controllers/signupController.js
const SignupData = require('../models/signupSchema');
const bcrypt = require('bcrypt');

const handleSignUpSubmission = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await SignupData.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
  

        
        const newUser = new SignupData({
            name,
            email,
            password: hashedPassword, // Use the hashed password
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({
            message: 'User created successfully',
            data: { name, email },
        });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Failed to save user', error: error.message });
    }
};

module.exports = {
    handleSignUpSubmission,
};
