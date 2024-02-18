const express = require('express')
const HttpError = require('../Model/http-error')

const router = express.Router()

router.get('/:pid', (req, res, next) => {
  // Getting a Place is from url
  const placeId = req.params.pid
  // This Place will be fetch from data base.
  const place = null
  if (!place) {
    throw new HttpError("Couldn't found the place for provided place Id", 404)
  }
  console.log('Places Routes')
  res.json({ message: 'Respond Send' })
})

router.get('/user/:uid', (req, res, next) => {
  const userId = req.params.uid
  const user = null
  if (!user) {
    return next(
      new HttpError("Couldn't found the User for provided user Id.", 404)
    )
  }
})

module.exports = router
