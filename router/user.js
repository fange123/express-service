const express = require("express");
const Result = require("../models/result");
const { login } = require("../services/user");
const { md5 }  = require("../utils");
const PWD_SALE  = require("../utils/constant")
const boom = require("boom")
const { body,validationResult } = require("express-validator")

const router = express.Router();

//* 创建登录路由
router.post('/login',[
  body('username').isString().withMessage('用户名类型不正确'),
  body('password').isString().withMessage('密码类型不正确'),
], function(req, result,next){
  const err = validationResult(req)
  if(! err.isEmpty()){
    //* 拿到错误的msg
    const [{msg}] = err.errors
    //* 通过next传递给下一个中间件boom让它去处理
      next(boom.badRequest(msg))
  }else{

    const {username,password} = req.body
  const md5Password = md5(`${password}${PWD_SALE}`)
  login(username,md5Password).then(res=> {
     if(!res || res.length === 0){
      new Result('登录失败').fail(result)
  }else{
    new Result('登录成功').success(result)

  }
  })
  }




})

router.get("/info", (req, res) => {
  res.send("info...");
});

module.exports = router;
