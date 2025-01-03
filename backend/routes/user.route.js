const express = require('express');
const router = express.Router();
const { login, logout, register, getUserList, getLoggedInUser } = require('../controllers/user.controller');
const { authenticateToken } = require('../middlewares/verifyToken');
const { protect } = require('../middlewares/authMiddleware');



router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.get('/getUserList', authenticateToken, getUserList);

// Add a protect as a second param
router.get("/me", protect, getLoggedInUser); 
module.exports = router;