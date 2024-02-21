const { validationResult } = require('express-validator')

const HttpError = require('../Model/http-error')
const Place = require('../Model/Place')
const User = require('../Model/User')

// const getCoordinatesForAddress = require('../utils/Locations')

const getPlaceById = async (req, res, next) => {
  // Getting a Place id is from url
  const placeId = req.params.pid
  // This Place will be fetch from data base.

  let place
  try {
    place = await Place.findById(placeId)
  } catch (error) {
    return next(
      new HttpError("Couldn't found the place for provided place Id", 404)
    )
  }
  if (!place) {
    return next(new HttpError("Something went couldn't found the place", 500))
  }

  res.status(200).json({
    message: 'Place Fetch successfully',
    place: place.toObject({ getters: true }),
  })
}

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid

  let places
  try {
    places = await Place.find({ creator: userId })
  } catch (error) {
    return next(
      new HttpError(
        "Something went wrong couldn't find the places this user.",
        500
      )
    )
  }
  if (!places) {
    return next(new HttpError("Couldn't found the Place for this user.", 404))
  }
  res.status(200).json({
    message: 'Place fetched for this user',
    places: places.map((place) => place.toObject({ getters: true })),
  })
}

const createNewPlace = async (req, res, next) => {
  //looking for error in the request in the data fields/
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorMessage = errors.errors[0].msg
    return next(new HttpError(errorMessage, 422))
  }

  // ... will extract some data from the request body and create place.
  const { title, description, address, creator } = req.body

  let coordinates
  // call this function to get actual coordintates for the speciffied address.
  // try {
  //     coordinates = getCoordinatesForAddress(address)
  // } catch (error) {
  //   return next(error)
  // }

  // This is dummy coordinates.
  coordinates = {
    lat: 40.7884474,
    lng: -73.9871516,
  }
  let user
  try {
    user = await User.findById(creator)
  } catch (error) {
    console.log(error)
    return next(
      new HttpError('Creating place faild. Please try again letter.', 500)
    )
  }
  if (!user) {
    return next(new HttpError("Couldn't find the user", 404))
  }
  const place = new Place({
    title,
    description,
    address,
    creator: user.id,
    location: coordinates,
    image:
      'https://www.app.com.pk/wp-content/uploads/2023/12/University-of-Peshawar.jpg',
  })

  try {
    // await place.save()
    user.places.push(place) // it just add the place id to the user places. push a special method of mongoose.
    await user.save()
    await place.save()
  } catch (error) {
    console.log(error)
    return next(
      new HttpError('Faild to create new place. Please try again', 500)
    )
  }
  res
    .status(201)
    .json({ message: 'Places Created Successfully', place: place.id })
}

const updatePlaceById = async (req, res, next) => {
  //looking for error in the request in the data fields/
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorMessage = errors.errors[0].msg
    return next(new HttpError(errorMessage, 422))
  }

  // Getting a Place id is from url
  const placeId = req.params.pid

  const { title, description } = req.body
  let updatedPlace
  try {
    updatedPlace = await Place.findById(placeId)
  } catch (error) {
    return next(
      new HttpError('Updating place faild. Please try again letter.', 500)
    )
  }

  updatedPlace.title = title
  updatedPlace.description = description

  try {
    await updatedPlace.save()
  } catch (error) {
    return next(
      new HttpError(
        'Faild to save updating place. Please try again letter.',
        500
      )
    )
  }
  res.status(201).json({
    message: 'Update Place Successfully',
    place: updatedPlace.toObject({ getters: true }),
  })
}
const deletePlace = async (req, res, next) => {
  // Getting a Place id is from url
  const placeId = req.params.pid
  let place
  try {
    place = await Place.findById(placeId).populate('creator')
  } catch (err) {
    const error = new HttpError(
      "Couldn't Find the place for provided id. Please try again letter.",
      500
    )
    return next(error)
  }

  if (!place) {
    const error = new HttpError(
      "Couldn't find the place for provided id. Please try again letter.",
      500
    )
    return next(error)
  }
  try {
    await Place.findByIdAndDelete(placeId)
    place.creator.places.pull(place)
    await place.creator.save()
  } catch (error) {
    const err = new HttpError(
      "Couldn't delete the place. Please try again letter.",
      500
    )
    return next(err)
  }

  res.status(201).json({
    message: 'Places Deleted Successfully',
    place: place.toObject({ getters: true }),
  })
}

module.exports = {
  getPlaceById,
  getPlacesByUserId,
  createNewPlace,
  updatePlaceById,
  deletePlace,
}
