require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();


app.use(express.json());

//connect to the database
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

// const db = async () => {
//    await mongoose.connect(process.env.DATABASE_URL)
//     .then(() => console.log('Connected to MongoDB...'))
//     .catch(err => console.error('Could not connect to MongoDB...'));
// } 
// db();

// import movie routes
const movieRoutes = require('./routes/movie');
// import user routes
const userRoutes = require('./routes/user');

// home route
app.get("/", (req, res) => {
    res.send("Hello World");
});

// use movie routes
app.use('/api/movies', movieRoutes);

// use user routes
app.use('/api/users', userRoutes);


// start the server
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});