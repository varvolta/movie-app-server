import Movie from '../models/movie.model.js'
import jwt from 'jsonwebtoken'

class MoveController {
    static async add(req, res) {
        try {
            const { title, year } = req.body
            const poster = req.file?.path
            console.log(poster)
            if (!poster) {
                return res.status(400).json({ message: 'Poster is required' })
            }
            const newMovie = new Movie({
                title,
                year,
                poster,
            })

            await newMovie.save()

            res.status(201).json({
                message: 'Movie created successfully',
                movie: newMovie,
            })
        } catch (e) {
            if (e.message.includes('required')) {
                res.status(400).json({
                    message: 'Bad Request',
                    error: e.message,
                })
            } else {
                res.status(500).json({
                    message: 'Server error',
                    error: e.message,
                })
            }
        }
    }

    static async getAll(req, res) {
        try {
            const { offset = 1, limit = 10 } = req.query
            const movies = await Movie.find()
                .skip(offset - 1)
                .limit(limit)

            res.status(200).json({
                message: 'Movies retrieved successfully',
                data: movies,
                total: await Movie.countDocuments({}),
            })
        } catch (e) {
            res.status(500).json({
                message: 'Server error',
                error: e.message,
            })
        }
    }

    static async getById(req, res) {
        try {
            const movie = await Movie.findById(req.params.id)

            if (!movie) {
                return res.status(404).json({ message: 'Movie not found' })
            }
            res.status(200).json(movie)
        } catch (err) {
            res.status(500).json({
                message: 'Server error',
                error: err.message,
            })
        }
    }

    static async update(req, res) {
        try {
            const movie = await Movie.findById(req.params.id)

            if (!movie) {
                return res.status(404).json({ message: 'Movie not found' })
            }

            const newData = {
                poster: req.file?.path || movie.poster,
                ...req.body,
            }
            const edited = await Movie.findOneAndUpdate(
                { _id: req.params.id },
                newData
            )

            edited.save()
            res.status(204).json(movie)
        } catch (err) {
            res.status(500).json({
                message: 'Server error',
                error: err.message,
            })
        }
    }
}

export default MoveController
