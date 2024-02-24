const { StatusCodes } = require("http-status-codes");
const ReviewModel = require("../models/ReviewModel");
const { BadRequest } = require("../errors");

const createReview = async (req, res) => {
  const userId = req.userData.userId;
  const review = await ReviewModel.create({ ...req.body, createdBy: userId });
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Review is successfully created" });
};

const getAllReviews = async (req, res) => {
  const reviews = await ReviewModel.find().populate("createdBy", "name");
  res.status(StatusCodes.OK).json({ reviews });
};

const deleteReview = async (req, res) => {
  const reviewId = req.params.id;
  const userId = req.userData.userId;
  const review = await ReviewModel.findOne({
    _id: reviewId,
    createdBy: userId,
  });
  console.log(review);
  if (!review) {
    throw new BadRequest("No review found for this id");
  }
  await review.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Review deleted" });
};

module.exports = { createReview, getAllReviews, deleteReview };
