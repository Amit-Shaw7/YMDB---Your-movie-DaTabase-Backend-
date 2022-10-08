import mongoose from 'mongoose';

const MovieSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    overview: {
        type: String,
        required: true,
    },
    movieId: {
        type: String,
        required: true,
    },
    imgSm: {
        type: String,
        required: true,
    },
    imgMd: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    popularity: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    }

}, { timestamps: true });

export const MovieModel = mongoose.model("Movie", MovieSchema);