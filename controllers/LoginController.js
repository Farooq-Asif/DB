const SignupData = require('../models/signupSchema');
const LoginData = require('../models/formDataSchema');
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt');

const handleLoginSubmission = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await SignupData.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
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

        const newUser = new LoginData({
            email,
            password,  
        });
        await newUser.save();

        res.status(200).json({
            message: 'Login successful',
            data: { name: existingUser.name, email: existingUser.email, date: newUser.date,  Token:Token  },
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
