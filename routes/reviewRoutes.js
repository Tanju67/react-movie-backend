const express = require("express");
const router = express.Router();
const {
  createReview,
  getAllReviews,
  deleteReview,
} = require("../controllers/review-controllers");

const checkAuth = require("../middleware/auth");

router.get("/", getAllReviews);

router.use(checkAuth);

router.post("/", createReview);

router.delete("/:id", deleteReview);

module.exports = router;
