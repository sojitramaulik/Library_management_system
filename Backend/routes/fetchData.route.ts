const express = require('express');
const router = express.Router();

const fetchData = require('../controllers/fetchData.controller.ts');
const isAuthenticated = require('../middleware/isAuthenticated.ts');

router.post('/fetch', isAuthenticated, fetchData);

module.exports = router;