const express = require('express');
const router = express.Router();

const book = require('../controllers/book.controller.ts');
const isAuthenticated = require('../middleware/isAuthenticated.ts');

router.post('/book', isAuthenticated, book);

module.exports = router;