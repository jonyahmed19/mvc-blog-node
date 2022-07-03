const express = require("express");
require("dotenv").config();
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/Blog");
const blogRouter = require("./routes/blogRoutes");

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
 * Blog Routers
 */
app.use("/blogs", blogRouter);

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
