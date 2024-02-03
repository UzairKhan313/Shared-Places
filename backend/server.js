const app = require('./app')

const dotenv = require('dotenv')

// config for Environment Variable.
dotenv.config({ path: 'backend/config/config.env' })

app.listen(process.env.PORT, () => {
  console.log(`Server is Running on http://localhost:${process.env.PORT}`)
})
