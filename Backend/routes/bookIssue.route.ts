const express = require('express');
const router = express.Router();

const bookIssue = require('../controllers/bookIssue.controller.ts');
const isAuthenticated = require('../middleware/isAuthenticated.ts');

router.post('/book/issue', isAuthenticated, bookIssue);

module.exports = router;