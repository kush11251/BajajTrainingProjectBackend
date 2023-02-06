const Booking = require("../schema/booking");

const addBooking = async (req, res) => {
  const { flight } = req.body;
  const booking = new Booking({
    flight,
    user: req.user.sub,
  });
  const savedBooking = await (await booking.save()).populate("flight");
  res.json(savedBooking);
};

const deleteBooking = async (req, res) => {
    const { id } = req.params;
    const deletedBooking = await Booking.findByIdAndDelete(id).populate("flight");
    res.json(deletedBooking);
};

const getBookingById = async (req, res) => {
    const booking = await Booking.findById(req.params.id).populate("flight");
    res.json(booking);
}

const getAllBooking = async (req, res) => {
    const bookings = await Booking.find().populate("flight");
    res.json(bookings);
}

const getBookingByUser = async (req, res) => {
    const bookings = await Booking.find({user: req.user.sub}).populate("flight");
    res.json(bookings);
}

module.exports = { addBooking, deleteBooking, getBookingById, getAllBooking, getBookingByUser};