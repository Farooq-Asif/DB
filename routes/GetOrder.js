const express = require('express');
const router = express.Router();


const { OrderGetController } = require('../controllers/OrderGetController');


router.get('/', OrderGetController);

module.exports = router;
