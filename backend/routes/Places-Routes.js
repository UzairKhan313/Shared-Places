const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
  console.log('Places Routes')
  res.json({ message: 'Respond Send' })
})

module.exports = router
