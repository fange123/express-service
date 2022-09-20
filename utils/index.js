const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../utils/constant')

function md5(str) {
  //* 参数必须为string 类型
  return crypto.createHash('md5').update(String(str)).digest('hex');
}

//解析token
function decoded(req){
  let token = req.get('Authorization')
  if(token.includes('Bearer')){
    // !:这块要注意Bearer后的空格
    token = token.replace('Bearer ','')
  }
  return jsonwebtoken.verify(token,PRIVATE_KEY)
}
module.exports = {
  md5,
  decoded
}
