const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const getCoordsForAdress = require("../util/location");

const Place = require("../models/place");

const getPlaceByID = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a place",
      500
    );
    return next(error);
  }
  if (!place) {
    const error = new HttpError(
      "Could not find a place for the provided id.",
      404
    );
    return next(error);
  } else {
    res.status(200).json({ place: place.toObject({ getters: true }) });
  }
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      "Fetching places failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!places || places.length === 0) {
    const error = new HttpError(
      "Could not find places for the provided user id.",
      404
    );
    return next(error);
  } else {
    res.status(200).json({
      places: places.map((place) => place.toObject({ getters: true })),
    });
  }
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid input passed, please check it", 422));
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAdress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image:
      "https://pbs.twimg.com/profile_images/1272532349151072262/kBEZiWIQ.jpg",
    creator,
  });

  try {
    await createdPlace
      .save()
      .then(() => {
        res.status(201).json({ place: createdPlace });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    const error = new HttpError(
      `Creating place failed, please try again.`,
      500
    );
    return next(error);
  }
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid input passed, please check it", 422));
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  let updatedPlace;
  try {
    updatedPlace = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      `Updating place failed, please try again.`,
      500
    );
    return next(error);
  }

  updatedPlace.title = title;
  updatedPlace.description = description;

  try {
    await updatedPlace.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wring, could not update place",
      500
    );
    return next(error);
  }

  res.status(200).json({ place: updatedPlace.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  let deletedPlace;
  try {
    deletedPlace = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete place.",
      500
    );
    return next(error);
  }

  try {
    await deletedPlace.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete place.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted place!" });
};

exports.getPlaceByID = getPlaceByID;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
