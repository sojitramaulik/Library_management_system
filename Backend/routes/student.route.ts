const express = require('express');
const router = express.Router();

const student = require('../controllers/student.controller.ts');

router.post('/student', student);

module.exports = router;