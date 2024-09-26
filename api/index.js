import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import movieRoutes from './routes/movie.route.js'
import userRoutes from './routes/user.route.js'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/uploads', express.static('uploads'))
app.use('/api/movies', movieRoutes)
app.use('/api/user', userRoutes)

mongoose
    .connect(process.env.MONGO_URI)
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

export default app