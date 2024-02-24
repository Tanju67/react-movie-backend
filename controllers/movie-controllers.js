const MovieModel = require("../models/MovieModel");
const { StatusCodes } = require("http-status-codes");

const createMovie = async (req, res) => {
  const userId = req.userData.userId;
  const movie = await MovieModel.create({ ...req.body, createdBy: userId });
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Movie is successfully added to Watchlist" });
};

const getUserMovies = async (req, res) => {
  const userId = req.userData.userId;
  const movies = await MovieModel.find({ createdBy: userId });
  res.status(StatusCodes.OK).json({ movies });
};

const deleteMovie = async (req, res) => {
  const movieId = req.params.id;
  const movie = await MovieModel.findByIdAndDelete(movieId);
  res.status(StatusCodes.OK).json({ msg: "Movie deleted" });
};

module.exports = { createMovie, getUserMovies, deleteMovie };
