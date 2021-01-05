const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the Location Tracker API");
});

app.listen(5000);
