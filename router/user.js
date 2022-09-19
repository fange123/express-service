const express = require("express");
const Result = require("../models/result");

const router = express.Router();

//* 创建登录路由
router.post('/login', function(req, res){
  const {username,password} = req.body
  if(username === 'admin' && password === '123456'){
    new Result('登录成功').success(res)
  }else{
  new Result('登录失败').fail(res)
  }

})

router.get("/info", (req, res) => {
  res.send("info...");
});

module.exports = router;
