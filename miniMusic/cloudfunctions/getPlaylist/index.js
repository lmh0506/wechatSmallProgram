// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const rp = require('request-promise')

const db = cloud.database()

const URL = 'http://musicapi.xiecheng.live/personalized'

const playlistCollection = db.collection('playlist')
const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async (event, context) => {
  let res = await rp(URL)
  // 需要插入的数据
  const playlist = JSON.parse(res).result
  let newData = []

  // 获取歌单总数
  const countRes = await playlistCollection.count()
  const total = countRes.total

  // 获取数据次数  因为每次获取数据限制100条
  const batchTimes = Math.ceil(total / MAX_LIMIT)
  const tasks = []

  // 将所有数据请求存储到promise数组中一起获取
  for(let i = 0; i < batchTimes; i++) {
    tasks.push(playlistCollection.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get())
  }


  // 数据库内的所有数据
  let allList = []
  if(tasks.length > 0) {
    const allListRes = await Promise.all(tasks)
    allListRes.forEach(item => {
      allList = allList.concat(item.data)
    })
  }

  // 将插入数据去重
  for(let i = 0, len = playlist.length; i < len; i++) {
    let flag = true
    for(let j = 0, len2 = allList.length; j < len2; j++) {
      if(playlist[i].id === allList[j].id) {
        flag = false
        break
      }
    }
    flag && newData.push(playlist[i])
  }

  for(let i = 0; i < newData.length; i++) {
    await playlistCollection.add({
      data: {
        ...newData[i],
        createTime: db.serverDate()
      }
    }).then(res => {
      console.log('插入成功')
    }).catch(err => {
      console.log('插入失败', err)
    })
  }

  return newData.length
}