const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3 },
  author: { type: String, required: true },
  category: { type: String, required: true },
  publishedYear: { type: Number, min: 1900 },
  availableCopies: { type: Number, min: 0 }
});

module.exports = mongoose.model("Book", bookSchema);
