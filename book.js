const express = require("express");
const router = express.Router();
const Book = require("../models/Book");


router.post("/", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});


router.get("/category/:cat", async (req, res) => {
  const books = await Book.find({ category: req.params.cat });
  res.json(books);
});


router.get("/after/2015", async (req, res) => {
  const books = await Book.find({ publishedYear: { $gt: 2015 } });
  res.json(books);
});


router.patch("/:id/copies", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ message: "Book not found" });

    const newCopies = book.availableCopies + req.body.change;

    if (newCopies < 0)
      return res.status(400).json({ message: "Negative stock not allowed" });

    book.availableCopies = newCopies;
    await book.save();

    res.json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.patch("/:id/category", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { category: req.body.category },
      { new: true }
    );

    if (!book) return res.status(404).json({ message: "Book not found" });

    res.json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    if (book.availableCopies !== 0) {
      return res.status(400).json({
        message: "Delete allowed only when availableCopies = 0"
      });
    }

    await book.deleteOne();

    res.json({
      message: "Book deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

module.exports = router;
