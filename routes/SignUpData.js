const express = require('express');
const app = express()
const router = express.Router();


const { handleSignUpSubmission } = require('../controllers/signupController');


router.post('/', handleSignUpSubmission);

module.exports = router;
