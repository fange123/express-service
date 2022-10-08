//todo:通过环境变量env判断本地环境还是线上环境：不同环境电子书上传后存储的位置不一样
const {env} = require('./env');

const UPLOAD_PATH = env === 'dev' ? '/Users/zhangdabao/upload/admin-upload-ebook':''

module.exports = {
  CODE_ERROR: -1,
  CODE_SUCCESS:0,
  CODE_TOKEN_EXPIRED:-2,//token无效
  debug:true,
  PWD_SALE:'admin_imooc_node',
  PRIVATE_KEY:"this is my token",
  JWT_EXPIRED:60*60,//token失效时间
  UPLOAD_PATH
}
