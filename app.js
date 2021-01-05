const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places-routes");

const app = express();

app.use("/api/places", placesRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({
    message: error.message || "Something went wrong! Try again later.",
  });
});

app.get("/", (req, res, next) => {
  res.send("<h1>Welcome to the Location Tracker API</>");
});

app.listen(5000);