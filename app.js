require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
// require('mongoose').Promise = Promise;

const app = express();

app.use(express.json());

//connect to the database
const db = async () => {
   await mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));
} 
db();
const Movie = require('./models/movie');


app.get('/api/movies', async (req, res) => {
    await Movie.find()
        .then(movies => res.send(movies))
        .catch(err => console.error(err.message));
    // res.send(movies);
});

app.get('/api/movies/:id', async (req, res) => {
    await Movie.findById(req.params.id)
            .then(movie => res.send(movie))
            .catch(err => res.status(404).send(err.message));
    // const movie = movies.find(m => m.id === parseInt(req.params.id));
    // if (!movie) res.status(404).send('The movie with the given ID was not found.');
    // res.send(movie);
});

app.post('/api/movies', async (req, res) => {
    await Movie.create(req.body)
            .then(movie => res.send(movie))
            .catch(err => console.error(err.message));

    // const movie = {
    //     id: movies.length + 1,
    //     name: req.body.name,
    //     year: req.body.year,
    //     director: req.body.director,
    //     actors: req.body.actors,
    //     budget: req.body.budget,
    //     rating: req.body.rating
    // };
    // movies.push(movie);
    // res.send(movie);
});

app.put('/api/movies/:id', async (req, res) => {
    await Movie.findByIdAndUpdate(req.params.id, req.body)
          .then(movie => res.send(movie))
          .catch(err => console.error(err.message));
    // const movie = movies.find(m => m.id === parseInt(req.params.id));
    // if (!movie) res.status(404).send('The movie with the given ID was not found.');

    // movie.name = req.body.name;
    // movie.year = req.body.year;
    // movie.director = req.body.director;
    // movie.actors = req.body.actors;
    // movie.budget = req.body.budget;
    // movie.rating = req.body.rating;

    // res.send(movie);
});

app.delete('/api/movies/:id', async (req, res) => {
    console.log(req.params.id);
    await Movie.findOneAndDelete(req.params.id)
          .then(movie => res.send(movie))
          .catch(err => console.error(err.message));
    // const movie = movies.find(m => m.id === parseInt(req.params.id));
    // if (!movie) res.status(404).send('The movie with the given ID was not found.');

    // const index = movies.indexOf(movie);
    // movies.splice(index, 1);

    // res.send(movie);
});



app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});