// https://github.com/expressjs/express
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(80, () => {
  console.log("服务起来了，在http://localhost");
});
