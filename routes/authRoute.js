const express = require("express");
const { signup, login, getMe, update, getAll, deleteOne} = require("../controllers/authController");
const adminMiddleware = require("../middleware/adminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', authMiddleware, getMe);
router.post('/update', authMiddleware, update);
router.get('/all', authMiddleware, adminMiddleware, getAll);
router.delete('/delete/:id', authMiddleware, adminMiddleware, deleteOne);

module.exports = router;