// routes.js

const express = require('express');
const router = express.Router();
const { handleContactUs } = require('../controllers/contactUsController');

router.post('/contactus', handleContactUs);
module.exports = router;

