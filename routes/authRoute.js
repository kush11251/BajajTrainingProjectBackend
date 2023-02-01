const express = require("express");
const { signup, login, getMe, update} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', authMiddleware, getMe);
router.post('/update', authMiddleware, update);

module.exports = router;