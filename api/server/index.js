const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Movies = require('./services/movies');
const Genres = require('./services/genres');
const routes = require('./routes');
const app = express();

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

module.exports = (config) => {
    const movies = new Movies(config);
    const genres = new Genres(config);

    app.use('/test', (req, res, next) => {
        return res.status(200).json({ message: 'test' });
    });

    app.use(
        '/',
        routes({
            movies,
            genres,
        })
    );

    app.use((req, res, next) => {
        return res.status(404).json({ message: 'Not Found' });
    });

    app.use((error, req, res, next) => {
        res.status(error.status || 500);
        return res.json({
            message: error.message,
        });
    });

    return app;
};
