const express = require('express');
const router = express.Router();


const { CategoryDataController } = require('../controllers/CategoryDataController');


router.get('/', CategoryDataController);

module.exports = router;
