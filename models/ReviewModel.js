const mongoose = require("mongoose");
const ReviewSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Review: {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
