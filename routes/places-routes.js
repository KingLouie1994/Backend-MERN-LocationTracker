const express = require("express");

const placesControllers = require("../controllers/places-controller");

const router = express.Router();

router.get("/:pid", placesControllers.getPlaceByID);

router.get("/user/:uid", placesControllers.getPlaceByUserId);

module.exports = router;
