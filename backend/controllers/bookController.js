const mongoose = require("mongoose");
const Book = require("../models/bookModel");

const getBooks = async (req, res) => {
  const user_id = req.user._id;
  const books = await Book.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(books);
};

const getBook = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Book not found!" });
  }
  const book = await Book.findById(id);
  if (!book) {
    return res.status(404).json({ error: "Book not found!" });
  }
  res.status(200).json(book);
};

const createBook = async (req, res) => {
  const { name, cover, author, read, done, pages, notes } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }

  if (!cover) {
    emptyFields.push("cover");
  }

  if (!author) {
    emptyFields.push("author");
  }

  if (!pages) {
    emptyFields.push("pages");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "من فضلك قم بملئ جميع الخانات", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const book = await Book.create({
      name,
      cover,
      author,
      read,
      done,
      pages,
      notes,
      user_id,
    });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Book not found!" });
  }
  const book = await Book.findOneAndDelete({ _id: id });
  if (!book) {
    return res.status(404).json({ error: "Book not found!" });
  }
  res.status(200).json(book);
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Book not found!" });
  }
  const book = await Book.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!book) {
    return res.status(404).json({ error: "Book not found!" });
  }
  res.status(200).json(book);
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  deleteBook,
  updateBook,
};
