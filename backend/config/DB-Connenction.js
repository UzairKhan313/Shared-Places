const mongoose = require('mongoose')

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('Connected Database Successfully')
  } catch (error) {
    console.log('Faild to Connect with data base : ', error)
  }
}

module.exports = connectToDatabase
