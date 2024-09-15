const express = require('express');
const router = express.Router();
const allOfficesController = require('../controllers/allOfficesController');

router.get('/', allOfficesController.getAllOffices);

module.exports = router;