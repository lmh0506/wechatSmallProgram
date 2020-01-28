// 云函数入口文件
const cloud = require('wx-server-sdk')

const TcbRouter = require('tcb-router')

cloud.init()

const db = cloud.database()

const blogCollection = db.collection('blog')
const blogCommentCollection = db.collection('blog-comment')
const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({event})

  app.router('list', async (ctx, next) => {
    let keyWord = event.keyWord
    let w = {}
    if(keyWord.trim() !== '') {
      w = {
        content: db.RegExp({
          regexp: keyWord,
          options: 'i'
        })
      }
    }

    let res = await blogCollection.where(w)
    .skip(event.start)
    .limit(event.limit)
    .orderBy('createTime', 'desc')
    .get()

    let totalRes = await blogCollection.where(w).count()

    ctx.body = {
      data: res.data,
      ...totalRes
    }
  })

  app.router('detail', async (ctx, next) => {
    let blogId = event.id
    let w = {
      blogId
    }

    let res = await blogCollection.where({
      _id: blogId
    }).get()
    let comments = []
    let totalRes = await blogCommentCollection.where(w).count()
    console.log(totalRes)

    if(totalRes.total > 0) {
      let batchTimes = Math.ceil(totalRes.total / MAX_LIMIT)
      let tasks = []
      for(let i = 0; i < batchTimes; i++) {
        tasks.push(blogCommentCollection.where(w)
        .skip(i * MAX_LIMIT)
        .limit(MAX_LIMIT)
        .orderBy('createTime', 'desc')
        .get())
      }
      console.log(tasks)

      if(tasks.length > 0) {
        comments = (await Promise.all(tasks)).reduce((acc, cur) => {
          return acc.data.concat(cur.data)
        })
      }
    }


    ctx.body = {
      detail: res.data[0],
      comments: comments.data
    }
  })

  return app.serve()
}