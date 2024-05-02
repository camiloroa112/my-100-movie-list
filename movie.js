const express = require("express");
const Movie = require("./movieModel"); // Import the Movie model

const movieRouter = express.Router();

movieRouter.post("/add", (req, res) => {
    // Your movie registration route code...

    // Save the movie using the Movie model
    const movieData = {
        name: req.body.name,
        date: req.body.date,
        user: req.body.user,
        rating: req.body.rating,
        image: req.body.image
    };

    Movie.create(movieData, (err, movie) => {
        if (err) {
            console.error("Error inserting movie:", err);
            return res.status(500).send("Error inserting movie.");
        }
        console.log("Movie inserted successfully!");
        return res.redirect("movie_input.html");
    });
});

module.exports = movieRouter;