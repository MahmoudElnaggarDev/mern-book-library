const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBook,
  createBook,
  deleteBook,
  updateBook,
} = require("../controllers/bookController");
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

router.get("/", getBooks);

router.get("/:id", getBook);

router.post("/", createBook);

router.delete("/:id", deleteBook);

router.patch("/:id", updateBook);

module.exports = router;
