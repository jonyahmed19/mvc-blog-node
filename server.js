const express = require("express");
const app = express();
app.set("view engine", "ejs");

// app.use(logger);

// function logger(req, res, next) {
//   console.log(req.originalUrl);
//   next();
// }
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

app.listen(4000, () => {
  console.log("App is running");
});
