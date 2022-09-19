const { querySql }  = require("../db")
const { debug }= require("../utils/constant")

function login(username, password){
  debug && console.log(`select * from admin_user where username = '${username}' and password = '${password}'`)
  return querySql(`select * from admin_user where username = '${username}' and password = '${password}'`)
}

module.exports = {
  login
}
