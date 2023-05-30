const request = require('supertest');
const app = require('../app');
require('../models');

let actorId;

// POST Test
test('POST /actors', async () => {
    const actor = {
        firstName: "Sandra",
        lastName: "Bullock",
        nationality: "American",
        image: "http://image.jpg",
        birthday: "1946-03-15"
    }
    const res = await request(app).post('/actors').send(actor);
    actorId= res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

// GET Test
test('GET /actors', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

// PUT Test
test('PUT /actors/:id', async () => {
    const actorUpdated = {
        firstName: "Sandra Updated"
    }
    const res = await request(app)
        .put(`/actors/${actorId}`)
        .send(actorUpdated);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(actorUpdated.firstName);
});

// DELETE Test
test('DELETE /actors/:id', async () => {
    const res = await request(app).delete(`/actors/${actorId}`);
    expect(res.status).toBe(204);
});
