const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Use the route /greet/{name} and I will greet you");
});

app.get("/greet/:name", function (req, res) {
  const name = req.params.name;
  res.send("Hello " + name);
});

app.listen(8000);
