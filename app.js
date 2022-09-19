// https://github.com/expressjs/express
const express = require("express");
// * body-parser 解析body的中间价
const bodyParser = require("body-parser");
const router = require("./router");
const app = express();
const cors = require("cors");


app.use(cors());

app.use(bodyParser.json());//解析body
app.use(bodyParser.urlencoded({ extended: true }));//解析参数

app.use("/api", router);

app.listen(8089, () => {

  console.log("服务起来了，在http://localhost:8089");
});
