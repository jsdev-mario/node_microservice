const supertest = require('supertest');
const mongoose = require('mongoose');
require('dotenv').config();
const config = require('../config')['test'];
const service = require('../server')(config);

let genreID;
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
    const data = { name: 'action', description: 'action genre' };
    await supertest(service)
        .post('/')
        .send(data)
        .expect(200)
        .then((response) => {
            expect(response.body).toBeDefined();
            expect(response.body._id).toBeDefined();
            expect(response.body.name).toBe(data.name);
            expect(response.body.description).toBe(data.description);
            genreID = response.body._id;
        });
});

test('GET /:id', async () => {
    await supertest(service)
        .get(`/${genreID}`)
        .expect(200)
        .then((response) => {
            expect(response.body).toBeDefined();
            expect(response.body._id).toBe(genreID);
        });
});
