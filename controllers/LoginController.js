// controllers/loginController.js
const SignupData = require('../models/signupSchema');
const LoginData = require('../models/formDataSchema')
const bcrypt = require('bcrypt');

const handleLoginSubmission = async (req, res) => {
    const { email, password } = req.body;


    try {
        // Check if the user exists
        const existingUser = await SignupData.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

     

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        const newUser = new LoginData({
            email,
            password: password,
         
        });
        await newUser.save();
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
       
        // Successful login
        res.status(200).json({
            message: 'Login successful',
            data: { name: existingUser.name, email: existingUser.email,date: newUser.date  },
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
