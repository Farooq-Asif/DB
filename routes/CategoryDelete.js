const express = require('express');
const router = express.Router();


const { CategoryDataDeleteController } = require('../controllers/CategoryDataDeleteController');


router.delete('/', CategoryDataDeleteController);

module.exports = router;
