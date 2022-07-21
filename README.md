# express-service
## 在一个空文件夹初始化一下：npm init / yarn init -y
## 安装express npm express / yarn add express 
## 根目录下新建app.js
`
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(80, () => {
  console.log("服务起来了，在http://localhost");
});
`
