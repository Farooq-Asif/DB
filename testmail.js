require('dotenv').config();
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Helper function to generate a random OTP
const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString(); // Generates a 6-digit OTP
};

const sendOTPEmail = async (email, otp) => {
    console.log("Sending OTP to:", email);

    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD  
        },
        debug: true // For debugging purposes
    });

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: 'saabfarooq549@gmail.com',
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It is valid for 10 minutes.`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP email sent to ${email}`);
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Failed to send OTP email');
    }
};

const testEmailSending = async () => {
    const testEmail = 'recipient-email@example.com'; // Replace with a valid email
    const otp = generateOTP(); // Generate a test OTP
    
    try {
        await sendOTPEmail(testEmail, otp);
        console.log('Test email sent successfully.');
    } catch (error) {
        console.error('Error sending test email:', error);
    }
};

// Call the test function
testEmailSending();
