const express = require('express');
const router = express.Router();

const fetchData = require('../controllers/fetchData.controller.ts');

router.post('/fetch', fetchData);

module.exports = router;