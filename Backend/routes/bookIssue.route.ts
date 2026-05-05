const express = require('express');
const router = express.Router();

const bookIssue = require('../controllers/bookIssue.controller.ts');

router.post('/book/issue', bookIssue);

module.exports = router;