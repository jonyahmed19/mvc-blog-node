const express = require("express");
require("dotenv").config();
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/Blog");

/**
 * Database connection
 */
mongoose
  .connect(process.env.DBURI)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((e) => {
    console.log(e);
  });

app.set("view engine", "ejs");

/**
 * Using morgan
 */
app.use(morgan("dev"));
/**
 * Static files calling from public folder
 */
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

/**
 * Home page route
 */
app.get("/", (req, res, next) => {
  res.redirect("/blogs");
});

/**
 * Blogs route
 */
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((e) => {
      console.log(e);
    });
});

/**
 * Blogs route post request
 */

app.post("/blogs", (req, res) => {
  const { title, body, snippet } = req.body;
  const blog = new Blog({
    title,
    body,
    snippet,
  });
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((e) => {
      console.log(e);
    });
});

/**
 * Create blog post from this route
 */
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create New Blog" });
});

/**
 * Single post page
 */

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((e) => {
      console.log(e);
    });
});
app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((e) => {
      console.log(e);
    });
});

app.get("/about", (req, res, next) => {
  res.render("about", { title: "About" });
});

/**
 * 404 not found route
 */
app.use((req, res, next) => {
  res.status(404).render("404", { title: "Not Found" });
});
app.listen(4000, () => {
  console.log("App is running");
});
