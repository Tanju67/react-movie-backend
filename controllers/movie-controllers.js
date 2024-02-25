const MovieModel = require("../models/MovieModel");
const { StatusCodes } = require("http-status-codes");

const createMovie = async (req, res) => {
  const userId = req.userData.userId;
  console.log(req.body);
  const movie = await MovieModel.create({ ...req.body, createdBy: userId });
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Movie is successfully added to Watchlist" });
};

const getUserMovies = async (req, res) => {
  const userId = req.userData.userId;
  const total = await MovieModel.find({ createdBy: userId });
  let movies = MovieModel.find({ createdBy: userId });

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  movies = movies.skip(skip).limit(limit);
  const result = await movies;
  res.status(StatusCodes.OK).json({ result, total: total.length });
};

const deleteMovie = async (req, res) => {
  const movieId = req.params.id;
  const movie = await MovieModel.findOne({ imdbID: movieId });
  await movie.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Movie deleted" });
};

module.exports = { createMovie, getUserMovies, deleteMovie };
