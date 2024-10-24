const SignupData = require('../models/signupSchema');
const LoginData = require('../models/formDataSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const handleLoginSubmission = async (req, res) => {
    const { email, password } = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validate email format
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    try {
        // Fetch user from the database
        const existingUser = await SignupData.findOne({ email });
        
        // Check if user exists
        if (!existingUser) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if the user is verified
        if (!existingUser.isVerified) {
            return res.status(403).json({ message: 'Email not verified. Please verify your email before logging in.' });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: existingUser._id, email: existingUser.email },
            'your-secret-key',
            { expiresIn: '1h' }
        );

        // Update or create login record
        const loginData = await LoginData.findOneAndUpdate(
            { email },
            {
                password,
                Token: token,
                isLoggedIn: true
            },
            { new: true, upsert: true }
        );

        // Save login data
        await loginData.save();

        // Send successful response
        res.status(200).json({
            message: 'Login successful',
            data: {
                email: loginData.email,
                Token: loginData.Token,
                isLoggedIn: loginData.isLoggedIn,
            },
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

module.exports = {
    handleLoginSubmission,
};
