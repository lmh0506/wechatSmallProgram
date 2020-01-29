// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const {OPENID} = cloud.getWXContext()
  let res = await cloud.openapi.wxacode.getUnlimited({
    scene: OPENID
  })

  let uploadRes = await cloud.uploadFile({
    cloudPath: 'qrcode/' + Date.now() + '-' + Math.random() * 1e8 + '.png',
    fileContent: res.buffer
  })

  return uploadRes.fileID
}