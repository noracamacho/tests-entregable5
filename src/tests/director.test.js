const request = require('supertest');
const app = require('../app');

let directorId;

// POST Test
test('POST /directors', async () => {
    const director = {
        firstName: "Guillermo",
        lastName: "Del Toro", 
        nationality: "American",
        image: "http://image.jpg",
        birthday: "1946-03-15"
    }
    const res = await request(app).post('/directors').send(director);
    directorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

// GET Test
test('GET /directors', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

//  PUT test
test('PUT /directors/:id', async () => {
    const directorUpdated = {
        firstName: "Guillermo Updated"
    }
    const res = await request(app)
        .put(`/directors/${directorId}`)
        .send(directorUpdated);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(directorUpdated.firstName);
});

// DELETE Test
test('DELETE /directors/:id', async () => {
    const res = await request(app).delete(`/directors/${directorId}`);
    expect(res.status).toBe(204);
});