// https://github.com/expressjs/express
const express = require("express");
const app = express();

//~ express的三大基础：中间价，路由，异常处理

//* 中间件必须写next,不然后面的不执行，必须写在路由前
//* 绝大部分中间件必须写在路由前，处理错误的中间件写在最后
const middleLogger = (req, res, next) => {
  console.log("中间件执行");
  next();
};

app.use(middleLogger); //* 使用中间件的方法和vue注册插件的方法类似

app.get("/", (req, res) => {
  // res.send("hello");
  throw new Error("发生失败");
});

const middleError = (err, req, res, next) => {
  console.log("错误");
  res.send({
    message: err.message,
  });
};

app.use(middleError);

app.listen(80, () => {
  console.log("服务起来了，在http://localhost");
});
