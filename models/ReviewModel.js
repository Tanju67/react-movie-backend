const mongoose = require("mongoose");
const ReviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    imdbID: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    userRating: {
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
