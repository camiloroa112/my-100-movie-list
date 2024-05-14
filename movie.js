const mongoose = require("mongoose");

// Define the schema for the movie collection
const movieSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        date: { type: Date, required: true },
        user: { type: String, required: true },
        rating: { type: Number, required: true },
        image: { type: String } // Store URL or reference to the image
        // Add additional fields as needed
    });

// Create the Movie model
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;