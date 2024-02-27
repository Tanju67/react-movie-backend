const express = require("express");
const router = express.Router();
const {
  createReview,
  getAllReviews,
  deleteReview,
  getFilmReviews,
} = require("../controllers/review-controllers");

const checkAuth = require("../middleware/auth");

router.get("/", getAllReviews);

router.get("/film/:id", getFilmReviews);

router.use(checkAuth);

router.post("/", createReview);

router.delete("/:id", deleteReview);

module.exports = router;
