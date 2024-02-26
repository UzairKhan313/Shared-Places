const express = require('express')
const { check } = require('express-validator')

const HttpError = require('../Model/http-error')
const FileUpload = require('../middleware/File-upload')
const {
  getPlaceById,
  getPlacesByUserId,
  createNewPlace,
  updatePlaceById,
  deletePlace,
} = require('../controllers/Places-Controllers')

const router = express.Router()

router.get('/:pid', getPlaceById)

router.get('/user/:uid', getPlacesByUserId)

router.post(
  '/new',
  FileUpload.single('image'),
  [
    check('title').not().isEmpty().withMessage('Title must not be empty'),
    check('description')
      .isLength({ min: 5 })
      .withMessage('Description must be atleast 5 character long'),
    check('address').not().isEmpty().withMessage('address most not be empty.'),
  ],
  createNewPlace
)

router.patch(
  '/:pid',
  [
    check('title').not().isEmpty().withMessage('Title must not be empty'),
    check('description')
      .isLength({ min: 5 })
      .withMessage('Description must be atleast 5 character long'),
  ],
  updatePlaceById
)

router.delete('/:pid', deletePlace)

module.exports = router
