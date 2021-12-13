const supertest = require('supertest');
const mongoose = require('mongoose');
require('dotenv').config();
const config = require('../config')['test'];
const service = require('../server')(config);

let movieID;
beforeAll((done) => {
    mongoose
        .connect(config.dbSetting.url, config.dbSetting.options)
        .then(() => done())
        .catch((error) => console.error(`Test DB connection error: ${error.toString()}`));
});

afterAll((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done());
    });
});

test('POST /', async () => {
    const data = {
        id: '61b714baca3406778145bee5',
        name: 'movie name',
        description: 'movie description',
        genre: '61b70a1f6cb67e6a0f48cefd',
        duration: 120,
        rating: 5,
    };
    await supertest(service)
        .post('/')
        .send(data)
        .expect(200)
        .then((response) => {
            expect(response.body).toBeDefined();
            expect(response.body._id).toBeDefined();
            expect(response.body.name).toBe(data.name);
            expect(response.body.description).toBe(data.description);
            movieID = response.body._id;
        });
});

test('GET /:id', async () => {
    await supertest(service)
        .get(`/${movieID}`)
        .expect(200)
        .then((response) => {
            expect(response.body).toBeDefined();
            expect(response.body._id).toBe(movieID);
        });
});
