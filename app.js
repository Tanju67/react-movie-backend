require("dotenv").config();
require("express-async-errors");

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const connectDB = require("./db/connect");

// const userRoutes = require("./routes/userRoutes");

const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// app.use("/api/v1/user", userRoutes);
app.get("/", (req, res, next) => {
  console.log("hey");
  res.send("hey");
});

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
