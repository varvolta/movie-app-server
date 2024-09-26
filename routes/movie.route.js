const MoveController = require('../controllers/movie.controller.js')
const upload = require('../storage.js')
const express = require('express')

const movieRouter = express.Router()

movieRouter.get('/', MoveController.getAll)
movieRouter.post('/', upload.single('poster'), MoveController.add)
movieRouter.get('/:id', MoveController.getById)
movieRouter.patch('/:id', upload.single('poster'), MoveController.update)

module.exports = movieRouter
