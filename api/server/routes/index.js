const express = require('express');
const router = express.Router();
const genresRoute = require('./genres');
const moviesRoute = require('./movies');

module.exports = (param) => {
    router.use('/genres', genresRoute(param));
    router.use('/movies', moviesRoute(param));

    return router;
};
