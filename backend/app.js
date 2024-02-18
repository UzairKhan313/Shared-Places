const express = require('express')
const bodyParser = require('body-parser')

const placeRoutes = require('./routes/Places-Routes')

const app = express()

app.use('/api/v1/places', placeRoutes)

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
