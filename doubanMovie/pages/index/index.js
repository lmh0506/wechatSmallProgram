//index.js
//获取应用实例
const app = getApp()
const API_URL = 'https://douban.uieee.com/v2/movie/top250'

Page({
  data: {
    movieList: [],
    page: 0,
    title: '加载中。。。'
  },
  // 挡页面初始化完成时加载数据
  onLoad: function () {
    let that = this
    // 显示加载状态
    wx.showLoading({
      title: '加载中'
    })
    wx.showNavigationBarLoading()
    wx.request({
      url: API_URL,
      header: {
        "Content-Type": "json"
      },
      success(res) {
        if(res.statusCode === 200) {
          that.setData({
            movieList: res.data.subjects,
            page: res.data.start,
            title: res.data.title
          })
          that.count = res.data.count
        }
        wx.hideLoading()
        wx.hideNavigationBarLoading()
        console.log(res)
      },
      fail(e) {
        wx.hideLoading();
        wx.hideNavigationBarLoading()
        wx.showToast({
          title: '加载失败',
        })
      }
    })
  }
})
