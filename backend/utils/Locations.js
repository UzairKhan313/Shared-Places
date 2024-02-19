const axios = require('axios')
const HttpError = require('../Model/http-error')

const getCoordinatesForAddress = async (address) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${process.env.GOOGLE - COORDINATES - API - KEY}`
  )

  const data = response.data
  if (!data || data.status === 'ZERO_RESULTS') {
    const error = new HttpError(
      'Could not found the coordinates for specified address',
      404
    )

    throw error
  }
  const coordinates = data.results[0].geometry.location
  return coordinates
  // return {
  //   lat: 40.7884474,
  //   lng: -73.9871516,
  // }
}

module.exports = getCoordinatesForAddress
