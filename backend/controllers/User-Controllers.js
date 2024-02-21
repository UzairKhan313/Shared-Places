const { validationResult } = require('express-validator')

const HttpError = require('../Model/http-error')
const User = require('../Model/User')

const getUsers = async (req, res, next) => {
  let users

  try {
    // Just return the user object and remove the password field.
    users = await User.find({}, '-password')
  } catch (error) {
    return next(
      new HttpError(
        'Something went wrong with fetching all user. Please try again letter.',
        500
      )
    )
  }
  res.status(200).json({
    message: 'All user Fetch Successfully',
    users: users.map((user) => user.toObject({ getters: true })),
  })
}

const signup = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorMessage = errors.errors[0].msg
    return next(new HttpError(errorMessage, 422))
  }
  const { name, email, password } = req.body
  let existingUser
  try {
    existingUser = await User.findOne({ email })
  } catch (error) {
    return next(new HttpError('Sign up failed. Please try again letter', 500))
  }

  if (existingUser) {
    return next(
      new HttpError('Email Already Registerd. Please pick another one', 422)
    )
  }
  let user = new User({
    name,
    email,
    password,
    image: 'www.image.com',
    places: [],
  })
  try {
    user.save()
  } catch (error) {
    return next(new HttpError('Sign up failed. Please try again letter', 500))
  }
  res.status(201).json({
    message: 'User Registered Successfully',
    user: user.toObject({ getters: true }),
  })
}

const login = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorMessage = errors.errors[0].msg
    return next(new HttpError(errorMessage, 422))
  }
  const { email, password } = req.body

  let identifiedUser
  try {
    identifiedUser = await User.findOne({ email })
  } catch (error) {
    return next(
      new HttpError('User is not registered. Plaese registered first.', 404)
    )
  }

  if (!identifiedUser || identifiedUser.password !== password) {
    return next(
      new HttpError('User is not registered. Plaese registered first.', 404)
    )
  }
  res.status(201).json({
    message: 'User Login Successfully',
    user: identifiedUser.toObject({ getters: true }),
  })
}

module.exports = { getUsers, signup, login }
