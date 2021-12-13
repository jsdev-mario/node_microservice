const express = require('express');
const router = express.Router();

module.exports = (param) => {
    const { movies } = param;

    router.get('/:id', async (req, res, next) => {
        try {
            const { data } = await movies.getMovie(req.params.id);
            return res.status(200).json(data);
        } catch (error) {
            return next(error.response?.data || error);
        }
    });

    router.get('/', async (req, res, next) => {
        try {
            const { data } = await movies.retrieveMovies(req.query);
            return res.status(200).json(data);
        } catch (error) {
            return next(error.response?.data || error);
        }
    });

    router.post('/', async (req, res, next) => {
        try {
            const { data } = await movies.createMovie(req.body);
            return res.status(200).json(data);
        } catch (error) {
            return next(error.response?.data || error);
        }
    });

    router.put('/', async (req, res, next) => {
        try {
            const { data } = await movies.updateMovie(req.body);
            return res.status(200).json(data);
        } catch (error) {
            return next(error.response?.data || error);
        }
    });

    router.delete('/', async (req, res, next) => {
        try {
            const { data } = await movies.deleteMovie(req.query.id);
            return res.status(200).json(data);
        } catch (error) {
            return next(error.response?.data || error);
        }
    });

    return router;
};
