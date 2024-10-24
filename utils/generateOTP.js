// utils/otpGenerator.js

const crypto = require('crypto');

// Helper function to generate a random OTP
const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString(); // Generates a 6-digit OTP
};

module.exports = {generateOTP};