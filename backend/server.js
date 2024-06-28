const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bookRouter = require("./routes/bookRouter");
const userRouter = require("./routes/userRouter");

require("dotenv").config();
const port = process.env.PORT;
const mongo_uri = process.env.MONGO_URI;

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
