const SignupData = require('../models/signupSchema');
const LoginData = require('../models/formDataSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const handleLoginSubmission = async (req, res) => {
    const { email, password } = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Please enter a valid email address' });
    }
    try {
        const existingUser = await SignupData.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const Token = jwt.sign(
            { id: existingUser._id, email: existingUser.email },
            'your-secret-key',
            { expiresIn: '1h' }
        );

        const loginData = await LoginData.findOneAndUpdate(
            { email },

            {
                password,
                Token: Token,
                isLoggedIn: true

            },
            { new: true, upsert: true }
        );
        await loginData.save();

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