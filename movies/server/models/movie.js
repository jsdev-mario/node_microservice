const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        genre: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },

        releaseDate: {
            type: Date,
            required: true,
        },

        duration: {
            type: Number,
            required: true,
        },

        rating: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('movie', movieSchema);
