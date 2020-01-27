// 云函数入口文件
const cloud = require('wx-server-sdk')

const TcbRouter = require('tcb-router')

cloud.init()

const db = cloud.database()

const blogCollection = db.collection('blog')

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({event})

  app.router('list', async (ctx, next) => {
    let res = await blogCollection.skip(event.start)
    .limit(event.limit)
    .orderBy('createTime', 'desc')
    .get()

    ctx.body = res.data
  })

  return app.serve()
}