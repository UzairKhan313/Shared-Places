const express = require('express')
const bodyParser = require('body-parser')

const placeRoutes = require('./routes/Places-Routes')

const app = express()

app.use(placeRoutes)

module.exports = app
