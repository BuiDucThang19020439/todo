const express = require('express');
const router = express.Router();
const { login, logout, register, getUserList } = require('../controllers/user.controller');
const { authenticateToken } = require('../middlewares/verifyToken');



router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.get('/getUserList', authenticateToken, getUserList);

module.exports = router;