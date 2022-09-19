const { expressjwt } = require("express-jwt")
//!: express-jwt用来检测路由中是否带有未失效的token，也可添加无需见的路由白名单
const { PRIVATE_KEY } = require('../utils/constant')

const jwtAuth = expressjwt({
  secret:PRIVATE_KEY,
  algorithms:['HS256'],
  credenticalsRequired:true,//设置false就不进行校验了，游客也可以访问
}).unless({
  path:[
    '/',
    '/api/user/login'
  ]
})

module.exports = jwtAuth
