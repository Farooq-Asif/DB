
const express = require('express');
const router = express.Router();


const { CategoryUpdateController } = require('../controllers/CategoryUpdateController');


router.put('/', CategoryUpdateController);

module.exports = router;
