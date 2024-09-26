import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    poster: {
        type: String,
        required: true,
    },
});

export default mongoose.model('Movie', movieSchema);
