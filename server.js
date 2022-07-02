const express = require("express");
require("dotenv").config();
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

/**
 * DB URI
 */

const dbURI = `mongodb://localhost:27017/ninja-blog`;

/**
 * Database connection
 */
mongoose
  .connect(dbURI)
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

/**
 * Home page route
 */
app.get("/", (req, res, next) => {
  const blogs = [
    {
      title: "Yoshi Finds eggs",
      body: "lorem ipusm dolor re loras consectecor site",
    },
    {
      title: "Yoshi Finds stars",
      body: "lorem ipusm dolor re loras consectecor site",
    },
    {
      title: "Yoshi Finds bowser",
      body: "lorem ipusm dolor re loras consectecor site",
    },
  ];

  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res, next) => {
  res.render("about", { title: "About" });
});
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create New Blog" });
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
