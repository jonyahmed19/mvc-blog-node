const Blog = require("../models/Blog");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blog/index", { title: "All Blogs", blogs: result });
    })
    .catch((e) => {
      console.log(e);
    });
};
const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("blog/details", { blog: result, title: "Blog Details" });
    })
    .catch((e) => {
      console.log(e);
    });
};

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((e) => {
      console.log(e);
    });
};
const create_blog = (req, res) => {
  res.render("blog/create", { title: "Create New Blog" });
};
const blog_insert = (req, res) => {
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
};

module.exports = {
  blog_index,
  blog_details,
  create_blog,
  blog_insert,
  blog_delete,
};
