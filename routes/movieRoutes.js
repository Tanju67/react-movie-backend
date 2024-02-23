const express = require("express");
const router = express.Router();
const {
  createMovie,
  getUserMovies,
  deleteMovie,
} = require("../controllers/movie-controllers");

router.post("/", createMovie);

router.get("/", getUserMovies);

router.delete("/:id", deleteMovie);

module.exports = router;
