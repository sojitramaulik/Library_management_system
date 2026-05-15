const express = require('express');
const router = express.Router();

const book = require('../controllers/book.controller');
const isAuthenticated = require('../middleware/isAuthenticated');

router.post('/book', isAuthenticated, book);

module.exports = router;