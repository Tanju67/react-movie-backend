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
  const total = await ReviewModel.find().populate("createdBy", "name");
  let reviews = ReviewModel.find()
    .populate("createdBy", "name")
    .sort("-createdAt");

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  reviews = reviews.skip(skip).limit(limit);
  const result = await reviews;

  res.status(StatusCodes.OK).json({ result, total: total.length });
};

const getFilmReviews = async (req, res) => {
  const imdbId = req.params.id;

  const total = await ReviewModel.find({ imdbID: imdbId });
  let reviews = ReviewModel.find({ imdbID: imdbId })
    .populate("createdBy", "name")
    .sort("-createdAt");

  const page = Number(req.query.page);
  const limit = Number(req.query.limit) * page;

  reviews = reviews.limit(limit);
  const result = await reviews;
  console.log("hi");
  res.status(StatusCodes.OK).json({ result, total: total.length });
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

module.exports = { createReview, getAllReviews, deleteReview, getFilmReviews };
