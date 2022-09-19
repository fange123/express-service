const express = require("express");
const Result = require("../models/result");
const { login } = require("../services/user");
const { md5 }  = require("../utils");
const PWD_SALE  = require("../utils/constant")

const router = express.Router();

//* 创建登录路由
router.post('/login', function(req, result){
  const {username,password} = req.body
  const md5Password = md5(`${password}${PWD_SALE}`)
  login(username,md5Password).then(res=> {
     if(!res || res.length === 0){
      new Result('登录失败').fail(result)
  }else{
    new Result('登录成功').success(result)

  }
  })



})

router.get("/info", (req, res) => {
  res.send("info...");
});

module.exports = router;
