const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const genreModel = require('./models/genre');

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

    // Create a genre
    app.post('/', async (req, res, next) => {
        try {
            const genre = await genreModel.create(req.body);
            return res.status(200).json(genre);
        } catch (error) {
            return next(error);
        }
    });

    // Update a genre
    app.put('/', async (req, res, next) => {
        try {
            const { id, ...data } = req.body;
            const genre = await genreModel.findByIdAndUpdate(id, data, { new: true });
            return res.status(200).json(genre);
        } catch (error) {
            return next(error);
        }
    });

    // Read a genre
    app.get('/:id', async (req, res, next) => {
        try {
            const genre = await genreModel.findById(req.params.id);
            return res.status(200).json(genre);
        } catch (error) {
            return next(error);
        }
    });

    // Retrieve a genre
    app.get('/', async (req, res, next) => {
        try {
            const genre = await genreModel.find(req.query);
            return res.status(200).json(genre);
        } catch (error) {
            return next(error);
        }
    });

    // Delete a genre
    app.delete('/', async (req, res, next) => {
        try {
            await genreModel.findByIdAndRemove(req.query.id);
            return res.status(200).json({ message: 'Genre has been deleted.' });
        } catch (error) {
            return next(error);
        }
    });

    app.use((error, req, res, next) => {
        res.status(error.status || 500);
        console.error(error);
        return res.json({
            message: error.message,
        });
    });
    return app;
};
