require("dotenv").config();
require("express-async-errors");

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const connectDB = require("./db/connect");

const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", movieRoutes);
app.use("/api/v1/review", reviewRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("connected db!");
    app.listen(port, () => {
      console.log(`app is listening on port:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
