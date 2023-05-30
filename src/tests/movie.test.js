// Profesor, del enterable solo subimos el archivo de node a Github y ya?
const request = require('supertest');
const app = require('../app');
const Genre = require('../models/Genre');
const Director = require('../models/Director');
const Actor = require('../models/Actor');
require('../models');

let movieId;

// POST Test
test("POST /movies", async () => {
    const movie = {
        name: "The Godfather Part II",
        image: "https://image.tmdb.org/t/p/original//hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg",
        synopsis: "In the continuing saga of the Corleone crime family.",
        releaseYear: 1974
    }
    const res = await request(app).post('/movies').send(movie);
    movieId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

// GET Test
test("GET / movies", async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].genres).toBeDefined();
})

// PUT Test
test("PUT /movies/:id", async () => {
    const movieUpdated = {
        name: "Anabel II",
    }
    const res = await request(app)
        .put(`/movies/${movieId}`)
        .send(movieUpdated);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movieUpdated.name);
});

// POST Movie Genre
test("POST /movies/:id/genres should set movie's genres", async () => {
    const genre = await Genre.create({ name: "Horror"})
    const res = await request(app)
        .post(`/movies/${movieId}/genres`)
        .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

// POST Movie's director
test("POST /movies/:id/directors should set movie's director", async () => {
    const director = await Director.create({
        firstName: "Nora",
        lastName: "Del Toro", 
        nationality: "American",
        image: "http://image.jpg",
        birthday: "1946-03-15"
    })
    const res = await request(app)
        .post(`/movies/${movieId}/directors`)
        .send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

// POST Movie's actor
test("POST /movies/:id/actors should set movies actor's", async () => {
    const actor = await Actor.create({
        firstName: "Zorion",
        lastName: "Eguileor",
        nationality: "Spanish",
        image: "https://www.themoviedb.org/t/p/original/nN75avFiNDJGyKWFLnuk1aJDVph.jpg",
        birthday: "1946-03-15"
    })
    const res = await request(app)
        .post(`/movies/${movieId}/actors`)
        .send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

// DELETE Test
test("DELETE /movies/:id", async () => {
    const res = await request(app).delete(`/movies/${movieId}`);
    expect(res.status).toBe(204);
});
