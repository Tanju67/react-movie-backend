const mongoose = require("mongoose");
const MovieSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Year: {
    type: String,
    required: true,
  },
  imdbID: {
    type: String,
    required: true,
  },
  Poster: {
    type: String,
    required: true,
  },
  UserRating: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = mongoose.model("Movie", MovieSchema);
