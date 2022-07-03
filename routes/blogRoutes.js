const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");

/**
 * Blogs route
 */
router.get("/blogs", (req, res) => {
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

router.post("/blogs", (req, res) => {
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
router.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create New Blog" });
});

/**
 * Single post page
 */

router.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((e) => {
      console.log(e);
    });
});
router.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = router;
