// routes.js

const express = require('express');
const router = express.Router();
const { handleContactForm } = require('../controllers/ContactData');

router.post('/contactDataSubmit', handleContactForm);
module.exports = router;

