
const SignupData = require('../models/signupSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { generateOTP } = require('../utils/generateOTP');
const ejs = require('ejs');
const path = require('path');


const sendOTPEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD  
        },
        debug: true
    });

    const htmlContent = await ejs.renderFile(
        path.join(__dirname, '../views/otpSent.ejs'), 
        { otp }
    );

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        html: htmlContent
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP email sent to ${email}`);
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Failed to send OTP email');
    }
};

// Signup Controller with OTP generation
const handleSignUpSubmission = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await SignupData.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); 

        // Send OTP to user's email
        await sendOTPEmail(email, otp);  

        const Token = jwt.sign(
            { email: email },
            'your-secret-key',
            { expiresIn: '1h' }
        );

        // Save new user in the database
        const newUser = new SignupData({
            name,
            email,
            password: hashedPassword,
            OTP: otp,
            OTPExpiry: otpExpiry,
            Token: Token,
            isVerified: false
        });

        await newUser.save();

        // Send a response to the client
        res.status(201).json({
            message: 'User created successfully. 6 Digits OTP sent to Your email. Please verify your account.',
            data: { userId: newUser._id, email }
        });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Failed to save user', error: error.message });
    }
};

module.exports = {
    handleSignUpSubmission,
};
