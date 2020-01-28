// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

function parseTime(time) {
  return time.toString().length < 2 ? '0' + time : time
}

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  let date = new Date()
  let year = date.getFullYear()
  let month = parseTime(date.getMonth() + 1)
  let day = parseTime(date.getDate())
  let hour = parseTime(date.getHours())
  let min = parseTime(date.getMinutes())
  let s = parseTime(date.getSeconds())

  let res = await cloud.openapi.subscribeMessage.send({
    touser: OPENID, // 接收者（用户）的 openid
    template_id: 'b_ZLKaD0fCcOMKMe8f5F95y9G_zHDtgGqIMei-79Qso', // 所需下发的订阅模板id
    page: 'pages/blog-comment/blog-comment?id=' + event.id, // 点击模板卡片后的跳转页面，仅限本小程序内的页面。支持带参数,（示例index?foo=bar）。该字段不填则模板无跳转
    data: {
      thing1: {
        value: event.content
      },
      time2: {
        value: `${year}年${month}月${day}日 ${hour}:${min}:${s}`
      }
    }
  })
  return res
}