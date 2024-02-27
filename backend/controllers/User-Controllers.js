const { validationResult } = require('express-validator')
const bcryprt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
  let hashPassword
  try {
    hashPassword = await bcryprt.hash(password, 12)
  } catch (error) {
    const err = new HttpError("Couldn't hash password. Please try again", 500)
    return next(err)
  }

  let user = new User({
    name,
    email,
    password: hashPassword,
    image: req.file.destination + '/' + req.file.filename,
    places: [],
  })
  try {
    user.save()
  } catch (error) {
    return next(new HttpError('Sign up failed. Please try again letter', 500))
  }
  let token
  try {
    token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: process.env.TOKEN_EXPIRATION_TIME }
    )
  } catch (error) {
    return next(new HttpError('Sign up failed. Please try again letter', 500))
  }

  res.status(201).json({
    message: 'User Registered Successfully',
    userId: user.id,
    email: user.email,
    token: token,
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
    identifiedUser = await User.findOne({ email: email })
  } catch (error) {
    return next(
      new HttpError('User is not registered. Plaese registered first.', 404)
    )
  }

  if (!identifiedUser) {
    return next(
      new HttpError(
        'Invalid Crendentials. Please provide a valid crendentials',
        404
      )
    )
  }
  let isValidPassword
  try {
    isValidPassword = await bcryprt.compare(password, identifiedUser.password)
  } catch (error) {
    return next(new HttpError('Faild to compare password', 500))
  }

  if (!isValidPassword) {
    return next(
      new HttpError(
        'Invalid Crendentials. Please provide a valid crendentials',
        404
      )
    )
  }
  let token
  try {
    token = jwt.sign(
      { userId: identifiedUser.id, email: identifiedUser.email },
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: process.env.TOKEN_EXPIRATION_TIME }
    )
  } catch (error) {
    return next(
      new HttpError('Logging in failed. Please try again letter', 500)
    )
  }
  res.status(201).json({
    message: 'User Login Successfully',
    userId: identifiedUser.id,
    email: identifiedUser.email,
    token: token,
  })
}

module.exports = { getUsers, signup, login }
