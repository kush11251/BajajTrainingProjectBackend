const Flight = require("../schema/flight");

const addFlight = async (req, res) => {
  const { airline, flightNo, departsTime, departDate, arrivalTime, arrivalDate,fromAirport, toAirport, price } =
    req.body;
  const flight = new Flight({
    airline,
    flightNo,
    departsTime,
    departDate,
    arrivalTime,
    arrivalDate,
    fromAirport,
    toAirport,
    price,
  });
  const savedFlight = await flight.save();
  res.json(savedFlight);
};

const deleteFlight = async (req, res) => {
  const { id } = req.params;
  const deletedFlight = await Flight.findByIdAndDelete(id);
  res.json(deletedFlight);
};

const getFlightById = async (req, res) => {
    const flights = await Flight.findById(req.params.id);
    res.json(flights);
};

const getFlight = async (req, res) => {
    const flights = await Flight.find();
    res.json(flights);
};

const updateFlight = async (req, res) => {
    const { id } = req.params;
    
    const updatedFlight = await Flight.findByIdAndUpdate(id, req.body, {new: true});
    res.json(updatedFlight);
};

const fliterFlight = async (req, res) => {
    const flights = await Flight.find(req.body);
    res.json(flights);
};

module.exports = { addFlight , deleteFlight, getFlightById, getFlight, updateFlight, fliterFlight};
