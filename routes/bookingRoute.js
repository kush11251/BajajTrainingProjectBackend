const express = require("express");
const {addBooking, deleteBooking, getBookingById, getAllBooking, getBookingByUser} = require("../controllers/bookingController");
const adminMiddleware = require("../middleware/adminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post('/addBooking', authMiddleware, addBooking);
router.delete('/deleteBooking/:id', authMiddleware, deleteBooking);
router.get('/getBooking/:id', authMiddleware, getBookingById);
router.get('/getAllBookings', authMiddleware, adminMiddleware, getAllBooking);
router.get('/getBookingByUser', authMiddleware, getBookingByUser);

module.exports = router;