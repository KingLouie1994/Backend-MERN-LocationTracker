const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places-routes");

const app = express();

app.use("/api/places", placesRoutes);

app.get("/", (req, res, next) => {
  res.send("<h1>Welcome to the Location Tracker API</>");
});

app.listen(5000);
