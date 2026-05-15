const express = require('express');
const router = express.Router();

const bookIssue = require('../controllers/bookIssue.controller');
const isAuthenticated = require('../middleware/isAuthenticated');

router.post('/book/issue', isAuthenticated, bookIssue);

module.exports = router;