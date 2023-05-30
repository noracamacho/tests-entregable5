const request = require('supertest');
const app = require('../app');

let genreId;

// POST Test
test('POST /genres', async () => {
    const genre = {
        name: "Comedy"
    }
    const res = await request(app).post('/genres').send(genre);
    genreId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

// GET Test
test('GET /genres', async () => {
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

//  PUT test
test('PUT /genres/:id', async () => {
    const genreUpdated = {
        name: "Comedy Updated"
    }
    const res = await request(app)
        .put(`/genres/${genreId}`)
        .send(genreUpdated);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(genreUpdated.name);
});

// DELETE Test
test('DELETE /genres/:id', async () => {
    const res = await request(app).delete(`/genres/${genreId}`);
    expect(res.status).toBe(204);
});
