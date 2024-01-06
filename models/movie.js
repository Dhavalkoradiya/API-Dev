const mongoose = require('mongoose');

//define the schema
const movieSchema = new mongoose.Schema({
    name: String,
    year: Number,
    director: String,
    actors: [String],
    budget: Number,
    rating: Number
});
//create the model
const Movie = mongoose.model('Movie', movieSchema);

//connect to the database
mongoose.connect('mongodb://localhost/movies')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));


module.exports = Movie;