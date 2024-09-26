const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const movieRoutes = require('./routes/movie.route.js')
const userRoutes = require('./routes/user.route.js')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/uploads', express.static('uploads'))
app.use('/api/movies', movieRoutes)
app.use('/api/user', userRoutes)

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB')

    })
    .catch((err) => {
        console.log('Error connecting to MongoDB:', err)
    })


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

module.exports = app