const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const movieRoutes = require('./routes/movie.route.js')
const userRoutes = require('./routes/user.route.js')
const dotenv = require('dotenv')
const https = require('https')
const fs = require('fs')
const path = require('path')
const cors = require('cors')

const privateKey = fs.readFileSync(path.join(__dirname, 'certs/privkey.pem'), 'utf8')
const certificate = fs.readFileSync(path.join(__dirname, 'certs/cert.pem'), 'utf8')
const ca = fs.readFileSync(path.join(__dirname, 'certs/chain.pem'), 'utf8')

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
}

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

        const httpsServer = https.createServer(credentials, app)
        const PORT = process.env.PORT || 3000
        httpsServer.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB:', err)
    })



module.exports = app