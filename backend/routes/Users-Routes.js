const express = require('express')
const { check } = require('express-validator')

const { getUsers, signup, login } = require('../controllers/User-Controllers')

const router = express.Router()

router.get('/', getUsers)

router.post(
  '/signup',
  [
    check('name').not().isEmpty().withMessage('Name must not be empty.'),
    check('email')
      .normalizeEmail()
      .isEmail()
      .withMessage('Incorrect Email. Please provide a valid Email addess.'),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Password must be atleast 6 character long.'),
  ],
  signup
)

router.post(
  '/login',
  [
    check('email')
      .normalizeEmail()
      .isEmail()
      .withMessage('Incorrect Email. Please provide a valid Email address.'),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Password must be atleast 6 character long.'),
  ],
  login
)

module.exports = router
