const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/libraryDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const bookRoutes = require("./routes/books");
app.use("/books", bookRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
