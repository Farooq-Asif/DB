
const express = require('express');
const router = express.Router();


const { CategoryUpdateController } = require('../controllers/CategoryUpdateController');


router.patch('/', CategoryUpdateController);
module.exports = router;
