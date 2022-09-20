const { querySql,queryOne }  = require("../db")
const { debug }= require("../utils/constant")

function login(username, password){
  debug && console.log(`select * from admin_user where username = '${username}' and password = '${password}'`)
  return querySql(`select * from admin_user where username = '${username}' and password = '${password}'`)
}


function findUser(username) {
    debug && console.log(`select * from admin_user where username = '${username}'`)
    // * 指定要查询的内容
    return queryOne(`select avatar,id,nickname,role,username from admin_user where username = '${username}'`)
}



module.exports = {
  login,
  findUser
}
