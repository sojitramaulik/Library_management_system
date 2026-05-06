const express = require('express');
const router = express.Router();

const student = require('../controllers/student.controller.ts');
const { login, logout } = require('../controllers/login.controller.ts');
const isAuthenticated = require('../middleware/isAuthenticated.ts');

router.post('/register', student);
router.post('/login', login);
router.post('/logout', isAuthenticated, logout);


module.exports = router;