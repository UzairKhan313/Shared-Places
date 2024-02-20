const app = require('./app')

const dotenv = require('dotenv')
const connectToDatabase = require('./config/DB-Connenction')

// config for Environment Variable.
dotenv.config({ path: 'backend/config/config.env' })

// Establishing connection with database.
connectToDatabase()

app.listen(process.env.PORT, () => {
  console.log(`Server is Running on http://localhost:${process.env.PORT}`)
})
