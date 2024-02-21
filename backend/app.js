const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const HttpError = require('./Model/http-error')
const placeRoutes = require('./routes/Places-Routes')
const userRoutes = require('./routes/Users-Routes')

const app = express()

// Extracting incoming request for json data and convert it into a regular javascript data structures.
app.use(bodyParser.json())

// To handle cors Error.
app.use(cors())

// forwording the incomming request which  start with url like "/api/v1/places/" to the places routes.
app.use('/api/v1/places', placeRoutes)

// forwording the incomming request which  start with url like "/api/v1/users/" to the user routes.
app.use('/api/v1/users', userRoutes)

// adding middleware to handle the routes not found
app.use((req, res, next) => {
  const error = new HttpError('Could not found this route', 404)
  throw error
})

// Middle ware for Error. This is excute only when the above middle ware yield to error.
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error)
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || 'Something went wrong.' })
})

module.exports = app
