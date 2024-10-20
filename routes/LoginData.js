const express = require('express');
const router = express.Router();


const { handleLoginSubmission } = require('../controllers/LoginController');


router.post('/', handleLoginSubmission);

module.exports = router;
