const mysql  = require('mysql');
const config = require('./config')
const debug = require('../utils/constant')


function connect(){
  return mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    multipleStatements: true,//multipleStatements：允许每条 mysql 语句有多条查询.使用它时要非常注意，因为它很容易引起 sql 注入（默认：false）
  })
}

function querySql(sql){
  const con = connect()
  return new Promise((resolve, reject)=> {
    try {
      con.query(sql,(err,res)=>{
        if(err){
          reject(err)
           debug && console.log('查询失败，原因:' + JSON.stringify(err))
        }else{
          resolve(res)
          debug && console.log('查询成功', JSON.stringify(res))
        }
      })
    }catch(err){
      reject(err)

    }finally {
      con.end()
    }

})

}


module.exports ={querySql}
