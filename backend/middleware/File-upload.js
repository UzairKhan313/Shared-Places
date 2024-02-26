const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const HttpError = require('../Model/http-error')

const MIMI_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
}
const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'backend/uploads/images')
    },
    filename: (req, file, cb) => {
      const ext = MIMI_TYPE_MAP[file.mimetype]
      cb(null, uuidv4() + '.' + ext)
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIMI_TYPE_MAP[file.mimetype] // converting null and undifine to false with 2 exclamaition.
    let error = isValid ? null : new HttpError('Invalid mime type', 422)
    cb(error, isValid)
  },
})

module.exports = fileUpload
