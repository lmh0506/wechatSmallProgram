//index.js
//获取应用实例
const app = getApp()
const API_URL = 'https://douban.uieee.com/v2/movie/top250'

Page({
  data: {
    movieList: [],
    page: 0,
    title: '加载中。。。',
    haveMore: ''
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
            page: res.data.start + res.data.count,
            title: res.data.title
          })
          that.total = res.data.total
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
  },
  getMore() {
    console.log(this.data.haveMore)
    if(this.data.haveMore === '没有更多数据了') return;
    let that = this
    // 显示加载状态
    that.setData({
      haveMore: '加载更多...'
    }, () => {
      wx.showNavigationBarLoading()
      wx.request({
        url: API_URL,
        data: {
          start: that.data.page
        },
        header: {
          "Content-Type": "json"
        },
        success(res) {
          if (res.statusCode === 200) {
            let movieList = that.data.movieList.concat(res.data.subjects)
            let page = res.data.start + res.data.count
            that.setData({
              movieList,
              page,
              title: res.data.title
            })
            that.total = res.data.total
            if (page >= that.total) {
              that.setData({
                haveMore: '没有更多数据了'
              })
            }
          }
          wx.hideNavigationBarLoading()
          console.log(res)
        },
        fail(e) {
          wx.hideNavigationBarLoading()
          wx.showToast({
            title: '加载失败',
          })
        }
      })
    })
  }
})
