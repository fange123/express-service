const express = require("express");
const router = express.Router();
const multer = require("multer");//todo:multer处理文件上传
const {UPLOAD_PATH} = require("../utils/constant")
const Result = require("../models/result")

router.post('/upload',
  multer({dest:`${UPLOAD_PATH}/book`}).single('file'),//* 处理电子书上传后保存的位置,拿到的单个文件放到req  的file中
(req, res, next)=> {
  if(!req.file && !req.file.length){
    new Result('上传电子书失败').fail(res)

  }else{
  new Result('上传电子书成功').success(res)
  }

})

module.exports = router
