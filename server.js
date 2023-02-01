http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoute = require("./routes/authRoute");
const flightRoute = require("./routes/flightRoute");
const bookingRoute = require("./routes/bookingRoute");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(
    cors({
      origin: "*",
    })
  );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = process.env.ATLAS_URI;

mongoose.set('strictQuery', true);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/auth", authRoute);
app.use("/flight", flightRoute);
app.use("/booking", bookingRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});