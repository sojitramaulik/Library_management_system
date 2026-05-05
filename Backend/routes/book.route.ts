const express = require('express');
const router = express.Router();

const book = require('../controllers/book.controller.ts');

router.post('/book', book);

module.exports = router;