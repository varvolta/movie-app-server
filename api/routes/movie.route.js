import MoveController from '../controllers/movie.controller.js';
import upload from '../storage.js';
import express from 'express';

const movieRouter = express.Router();

movieRouter.get('/', MoveController.getAll);
movieRouter.post('/', upload.single('poster'), MoveController.add);
movieRouter.get('/:id', MoveController.getById);
movieRouter.patch('/:id', upload.single('poster'), MoveController.update);

export default movieRouter;
