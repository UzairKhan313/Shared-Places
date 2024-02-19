const { validationResult } = require('express-validator')

const HttpError = require('../Model/http-error')

const getUsers = (req, res, next) => {
  res.status(200).json({ message: 'All user Fetch Successfully' })
}

const signup = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorMessage = errors.errors[0].msg
    return next(new HttpError(errorMessage, 422))
  }
  const { name, email, password } = req.body
  res.status(201).json({ message: 'User Registered Successfully' })
}

const login = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorMessage = errors.errors[0].msg
    return next(new HttpError(errorMessage, 422))
  }
  const { email, password } = req.body
  const identifiedUser = null
  if (!identifiedUser || identifiedUser.password !== password) {
    return next(
      new HttpError('Could not found user. Please Check your credentials', 404)
    )
  }
  res.status(201).json({ message: 'User Login Successfully' })
}

module.exports = { getUsers, signup, login }
