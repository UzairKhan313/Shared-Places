const { validationResult } = require('express-validator')

const HttpError = require('../Model/http-error')
// const getCoordinatesForAddress = require('../utils/Locations')

const getPlaceById = async (req, res, next) => {
  // Getting a Place id is from url
  const placeId = req.params.pid
  // This Place will be fetch from data base.
  const place = null
  if (!place) {
    return next(
      new HttpError("Couldn't found the place for provided place Id", 404)
    )
  }
  console.log('Places Routes')
  res.json({ message: 'Respond Send' })
}

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid
  const places = null
  if (!places || places.length === 0) {
    return next(new HttpError("Couldn't found the Place for this user.", 404))
  }
}

const createNewPlace = async (req, res, next) => {
  //looking for error in the request in the data fields/
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorMessage = errors.errors[0].msg
    return next(new HttpError(errorMessage, 422))
  }

  // ... will extract some data from the request body and create place.
  const { title, description, addresss, creator } = req.body

  let coordinates
  // call this function to get actual coordintates for the speciffied address.
  // try {
  //     coordinates = getCoordinatesForAddress(addresss)
  // } catch (error) {
  //   return next(error)
  // }

  // This is dummy coordinates.
  coordinates = {
    lat: 40.7884474,
    lng: -73.9871516,
  }

  res.status(201).json({ message: 'Places Created Successfully' })
}

const updatePlaceById = (req, res, next) => {
  // Getting a Place id is from url
  const placeId = req.params.pid

  //looking for error in the request in the data fields/
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorMessage = errors.errors[0].msg
    return next(new HttpError(errorMessage, 422))
  }

  const { title, description } = req.body
  res.status(201).json({ message: 'Update Place Successfully' })
}
const deletePlace = (req, res, next) => {
  // Getting a Place id is from url
  const placeId = req.params.pid
  res.status(201).json({ message: 'Places Deleted Successfully' })
}

module.exports = {
  getPlaceById,
  getPlacesByUserId,
  createNewPlace,
  updatePlaceById,
  deletePlace,
}
