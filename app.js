// https://github.com/expressjs/express
const express = require("express");
const router = require("./router");
const app = express();

app.use("/", router);

app.listen(80, () => {
  console.log("服务起来了，在http://localhost");
});
