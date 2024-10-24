// // controllers/verifyOtpController.js

// const SignupData = require('../models/signupSchema');

// // OTP verification controller
// const verifyOTP = async (req, res) => {
//     const { userId, otp } = req.body;

//     try {
//         // Fetch the user from the database
//         const user = await SignupData.findById(userId);

//         // Check if the user exists
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Check if OTP exists
//         if (!user.OTP) {
//             return res.status(400).json({ message: 'OTP not found' });
//         }

//         // Check if the OTP matches
//         const isOtpValid = user.OTP === otp;

//         if (!isOtpValid) {
//             return res.status(400).json({ message: 'Invalid OTP' });
//         }

//         // If OTP is valid, mark the user as verified
//         user.isVerified = true;
//         user.OTP = null; // Clear OTP after verification
//         user.OTPExpiry = null; // Optional: Keep this line if you want to reset expiry, otherwise you can remove it

//         // Save the updated user record
//         await user.save();

//         // Send a success response
//         res.status(200).json({ message: 'User verified successfully' });
//     } catch (error) {
//         // Log the error for debugging purposes
//         console.error('Error verifying OTP:', error);
//         // Return a generic error message to the client
//         res.status(500).json({ message: 'Error verifying OTP', error: error.message });
//     }
// };

// module.exports = { verifyOTP };


const SignupData = require('../models/signupSchema');

// OTP verification controller
const verifyOTP = async (req, res) => {
    const { userId, otp } = req.body;

    try {
        // Fetch the user from the database
        const user = await SignupData.findById(userId);

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if OTP exists and is not expired
        if (!user.OTP || !user.OTPExpiry) {
            return res.status(400).json({ message: 'OTP not found or expired' });
        }

        // Check if the OTP matches and is still valid
        const isOtpValid = user.OTP === otp;
        const isOtpExpired = user.OTPExpiry < Date.now();

        if (!isOtpValid || isOtpExpired) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // If OTP is valid, mark the user as verified
        user.isVerified = true;
        user.OTP = null; // Clear OTP after verification
        user.OTPExpiry = null; // Clear expiry

        // Save the updated user record
        await user.save();

        // Send a success response
        res.status(200).json({ message: 'User verified successfully' });
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error verifying OTP:', error);
        // Return a generic error message to the client
        res.status(500).json({ message: 'Error verifying OTP', error: error.message });
    }
};

module.exports = { verifyOTP };
