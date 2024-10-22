const express = require('express');
const router = express.Router();


const { OrderAddController } = require('../controllers/OrderAddController');


router.post('/', OrderAddController);

module.exports = router;
