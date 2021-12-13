const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const movieModel = require('./models/movie');

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = (config) => {
    // Connect DB
    if (app.get('env') !== 'test') {
        mongoose
            .connect(config.dbSetting.url, config.dbSetting.options)
            .then((data) => console.debug('DB connection success.'))
            .catch((error) => console.error(`DB connection error: ${error.toString()}`));
    }

    // Add a request logging middleware in development mode
    if (app.get('env') === 'development') {
        app.use((req, res, next) => {
            console.debug(`${req.method}: ${req.url}`);
            return next();
        });
    }

    // Create a movie
    app.post('/', async (req, res, next) => {
        try {
            const movie = await movieModel.create({ releaseDate: new Date(), ...req.body });
            return res.status(200).json(movie);
        } catch (error) {
            return next(error);
        }
    });

    // Update a movie
    app.put('/', async (req, res, next) => {
        try {
            const { id, ...data } = req.body;
            const movie = await movieModel.findByIdAndUpdate(id, data, { new: true });
            return res.status(200).json(movie);
        } catch (error) {
            return next(error);
        }
    });

    // Read a movie
    app.get('/:id', async (req, res, next) => {
        try {
            const movie = await movieModel.findById(req.params.id);
            return res.status(200).json(movie);
        } catch (error) {
            return next(error);
        }
    });

    // Retrieve a movie
    app.get('/', async (req, res, next) => {
        try {
            const movie = await movieModel.find(req.query);
            return res.status(200).json(movie);
        } catch (error) {
            return next(error);
        }
    });

    // Delete a movie
    app.delete('/', async (req, res, next) => {
        try {
            await movieModel.findByIdAndRemove(req.query.id);
            return res.status(200).json({ message: 'Movie has been deleted.' });
        } catch (error) {
            return next(error);
        }
    });

    app.use((error, req, res, next) => {
        res.status(error.status || 500);
        console.error(error.message);
        return res.json({
            message: error.message,
        });
    });

    return app;
};
