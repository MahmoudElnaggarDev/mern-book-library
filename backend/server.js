const express = require("express");
const mongoose = require("mongoose");
const bookRouter = require("./routes/bookRouter");
const userRouter = require("./routes/userRouter");
const app = express();
const cors = require('cors');

require("dotenv").config();
const port = process.env.PORT;
const mongo_uri = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use("/api/books", bookRouter);
app.use("/api/user", userRouter);

mongoose
  .connect(mongo_uri)
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log(`Listening to port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
