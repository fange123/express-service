const express = require("express");
//* boom是用来处理异常错误的
const boom = require("boom");
const userRouter = require("./user");
const jwtAuth = require("./jwt")
const Result = require("../models/result")

//* 注册路由
const router = express.Router();

//* 引入jwt认证
router.use(jwtAuth)

router.get("/", (req, res) => {
  res.send("成功");
});

// 通过 userRouter 来处理 /user 路由
router.use("/user", userRouter);

/**
 * 集中处理404请求的中间件
 * 注意：该中间件必须放在正常处理流程之后
 * 否则，会拦截正常请求
 */
router.use((req, res, next) => {
  next(boom.notFound("接口不存在"));
});

/**
 * 自定义路由异常处理中间件
 * 注意两点：
 * 第一，方法的参数不能减少
 * 第二，方法的必须放在路由最后
 */
router.use((err, req, res, next) => {
  //* 如果token失效
  if(err.code && err.code === 'credentials_required'){
    const { status = 401 ,inner: { message }} = err
    new Result(null,'Token失效',{
      error: status,
      errMsg:message
    }).jwtError(res.status(status))//res.status()设置http状态吗

  }else {
    const msg = (err && err.message) || "系统错误";
  const statusCode = (err.output && err.output.statusCode) || 500;
  const errorMsg =
    (err.output && err.output.payload && err.output.payload.error) ||
    err.message;
    new Result(null,msg,{
      error:statusCode,
      errorMsg
    }).fail(res.status(statusCode))

  }

});

module.exports = router;
