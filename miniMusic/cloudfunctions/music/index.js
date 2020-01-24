// 云函数入口文件
const cloud = require('wx-server-sdk')

const TcbRouter = require('tcb-router')

const rp = require('request-promise')

cloud.init()

const db = cloud.database()

const playlistCollection = db.collection('playlist')

const BASE_URL = 'http://musicapi.xiecheng.live/'

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({event})

  app.router('playlist', async (ctx, next) => {
    let res = await playlistCollection
    .skip(event.start)
    .limit(event.limit)
    .orderBy('createTime', 'desc')
    .get()
    let totalRes = await playlistCollection.count()

    ctx.body = {
      ...res,
      ...totalRes
    }
  })

  app.router('musiclist', async (ctx, next) => {
    let res = await rp(BASE_URL + 'playlist/detail?id=' + event.id)

    ctx.body = JSON.parse(res)
  })


  return app.serve()
}