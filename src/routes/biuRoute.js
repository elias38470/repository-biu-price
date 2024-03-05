// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const biuController = require('../controllers/biuController');

router.get('/', biuController.home); 


module.exports = router;