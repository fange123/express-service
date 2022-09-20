const express = require("express");
const Result = require("../models/result");
const { login,findUser } = require("../services/user");
const { md5,decoded }  = require("../utils");
const { PWD_SALE ,PRIVATE_KEY,JWT_EXPIRED}  = require("../utils/constant")
const boom = require("boom")
const { body,validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")

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
    // 生成token
    const token = jwt.sign({username},PRIVATE_KEY,{expiresIn:JWT_EXPIRED})
    new Result({token},'登录成功').success(result)

  }
  })
  }




})

router.get("/info", (req, res) => {
  // * 需要动态的从token中获取用户名
  // * jwt的解析---jsonwebtoken的方法verify
  const decode = decoded(req)
  if(decode && decode.username){
    findUser(decode.username).then(user=> {
    if(user){
      //处理一下role的返回格式
      user.roles = [user.role]
      new Result(user,'用户信息查询成功').success(res)
    }else{
      new Result('用户信息查询失败').fail(res)
    }
  })
  }else{
    new Result('用户信息查询失败').fail(res)
  }


});

module.exports = router;
