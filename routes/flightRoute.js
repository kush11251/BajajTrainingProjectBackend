const express = require("express");
const {addFlight, deleteFlight, getFlightById, getFlight, updateFlight, fliterFlight} = require("../controllers/flightController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.put('/addFlight', authMiddleware, adminMiddleware, addFlight);
router.delete('/deleteFlight/:id', authMiddleware, adminMiddleware, deleteFlight);
// router.get('/getFlight/:id', authMiddleware, getFlightById);
// router.get('/getFlights', authMiddleware, getFlight);
router.get('/getFlight/:id', getFlightById);
router.get('/getFlights', getFlight);
router.post('/fliterFlight', fliterFlight);

router.post('/updateFlight/:id', authMiddleware, adminMiddleware, updateFlight);

module.exports = router;