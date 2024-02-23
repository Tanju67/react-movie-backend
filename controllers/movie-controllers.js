const createMovie = async (req, res) => {
  res.send("createMovie");
};

const getUserMovies = async (req, res) => {
  res.send("getUserMovies");
};

const deleteMovie = async (req, res) => {
  res.send("deleteMovie");
};

module.exports = { createMovie, getUserMovies, deleteMovie };
