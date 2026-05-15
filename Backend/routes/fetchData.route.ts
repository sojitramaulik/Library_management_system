const express = require('express');
const router = express.Router();

const fetchData = require('../controllers/fetchData.controller');
const isAuthenticated = require('../middleware/isAuthenticated');

router.post('/fetch', isAuthenticated, fetchData);

module.exports = router;