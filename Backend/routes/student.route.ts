import { upload } from "../config/multer";

const express = require('express');
const router = express.Router();

const student = require('../controllers/student.controller');
const { login, logout } = require('../controllers/login.controller');
const isAuthenticated = require('../middleware/isAuthenticated');
const {verifyOtp} = require('../controllers/login.controller');
const {me} = require('../controllers/login.controller')

router.post('/register', upload.single('image'), student);
router.post('/login', login);
router.post('/otp/verify', verifyOtp);
router.post('/logout', isAuthenticated, logout);
router.get('/me',isAuthenticated, me)


module.exports = router;