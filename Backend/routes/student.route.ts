import { upload } from "../config/multer";

const express = require('express');
const router = express.Router();

const student = require('../controllers/student.controller.ts');
const { login, logout } = require('../controllers/login.controller.ts');
const isAuthenticated = require('../middleware/isAuthenticated.ts');

router.post('/register', upload.single('image'), student);
router.post('/login', login);
router.post('/logout', isAuthenticated, logout);


module.exports = router;