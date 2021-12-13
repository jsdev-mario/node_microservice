const express = require('express');
const router = express.Router();

module.exports = (param) => {
    const { genres } = param;

    router.get('/:id', async (req, res, next) => {
        try {
            const { data } = await genres.getGenre(req.params.id);
            return res.status(200).json(data);
        } catch (error) {
            return next(error.response?.data || error);
        }
    });

    router.get('/', async (req, res, next) => {
        try {
            const { data } = await genres.retrieveGenres(req.query);
            return res.status(200).json(data);
        } catch (error) {
            return next(error.response?.data || error);
        }
    });

    router.post('/', async (req, res, next) => {
        try {
            const { data } = await genres.createGenre(req.body);
            return res.status(200).json(data);
        } catch (error) {
            return next(error.response?.data || error);
        }
    });

    router.put('/', async (req, res, next) => {
        try {
            const { data } = await genres.updateGenre(req.body);
            return res.status(200).json(data);
        } catch (error) {
            return next(error.response?.data || error);
        }
    });

    router.delete('/', async (req, res, next) => {
        try {
            const { data } = await genres.deleteGenre(req.query.id);
            return res.status(200).json(data);
        } catch (error) {
            return next(error.response?.data || error);
        }
    });

    return router;
};
