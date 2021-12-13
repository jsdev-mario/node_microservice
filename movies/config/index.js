const pjs = require('../package.json');
const { name, version } = pjs;

// Configuration options for different environments
module.exports = {
    development: {
        name,
        version,
        serviceTimeout: 30,
        serviceRegistryUrl: process.env.SERVICEREG_URL,
        dbSetting: {
            url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
            options: {
                authSource: 'admin',
                user: process.env.DB_USER,
                pass: process.env.DB_PASS,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        },
    },
    production: {
        name,
        version,
        serviceTimeout: 30,
        serviceRegistryUrl: process.env.SERVICEREG_URL,
        dbSetting: {
            url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
            options: {
                authSource: 'admin',
                user: process.env.DB_USER,
                pass: process.env.DB_PASS,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        },
    },
    test: {
        name,
        version,
        serviceTimeout: 30,
        serviceRegistryUrl: process.env.SERVICEREG_URL,
        dbSetting: {
            url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/test?retryWrites=true&w=majority`,
            options: {
                authSource: 'admin',
                user: process.env.DB_USER,
                pass: process.env.DB_PASS,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        },
    },
};
