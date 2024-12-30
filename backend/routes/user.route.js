const express = require('express');
const router = express.Router();
const { login, logout, register, getUserList } = require('../controllers/user.controller');


router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.get('/getUserList', getUserList);

module.exports = router;