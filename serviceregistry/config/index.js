const pjs = require('../package.json');

const { name, version } = pjs;

// Configuration options for different environments
module.exports = {
    development: {
        name,
        version,
        serviceTimeout: 30,
    },
    production: {
        name,
        version,
        serviceTimeout: 30,
    },
    test: {
        name,
        version,
        serviceTimeout: 30,
    },
};
