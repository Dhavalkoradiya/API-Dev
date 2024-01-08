const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const auth = require('../middleware/auth');

router.use(auth);

// get all movies
router.get('/', async (req, res) => {
    await Movie.find()
        .then(movies => res.send(movies))
        .catch(err => console.error(err.message));
    // res.send(movies);
});

// get a single movie
router.get('/:id', async (req, res) => {
    await Movie.findById(req.params.id)
            .then(movie => res.send(movie))
            .catch(err => res.status(404).send(err.message));
    // const movie = movies.find(m => m.id === parseInt(req.params.id));
    // if (!movie) res.status(404).send('The movie with the given ID was not found.');
    // res.send(movie);
});

// create a new movie
router.post('/', async (req, res) => {
    if(req.user.role !== 'admin') return res.status(403).send({ message: 'Access denied' });
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

// update a movie
router.put('/:id', async (req, res) => {
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

// delete a movie
router.delete('/:id', async (req, res) => {
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



// Middleware function to get a single movie by ID
// async function getMovie(req, res, next) {
//     let movie;
//     try {
//         movie = await Movie.findById(req.params.id);
//         if (movie == null) {
//             return res.status(404).json({ message: 'Movie not found' });
//         }
//     } catch (err) {
//         return res.status(500).json({ message: err.message });
//     }

//     res.movie = movie;
//     next();
// }

module.exports = router;