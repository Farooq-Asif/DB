// routes.js

const express = require('express');
const router = express.Router();
const { handleSignUpSubmission } = require('../controllers/signupController');
const { verifyOTP } = require('../controllers/verifyOtpController');
const { handleLoginSubmission } = require('../controllers/LoginController');

router.post('/signup', handleSignUpSubmission);
router.post('/otpverify', verifyOTP);
router.post("/login", handleLoginSubmission);
module.exports = router;

