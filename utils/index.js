const crypto = require('crypto');

function md5(str) {
  //* 参数必须为string 类型
  return crypto.createHash('md5').update(String(str)).digest('hex');
}
module.exports = {
  md5
}
