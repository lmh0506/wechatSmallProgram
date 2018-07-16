// pages/search/search.js
const API_URL = 'https://douban.uieee.com/v2/movie/search'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchText: '',
    movieList: [],
    page: 0,
    haveMore: ''
  },
  handleChange(e) {
    this.setData({
      searchText: e.detail.value
    })
  },
  searchMovie(e) {
    console.log(this.data.searchText)
    let that = this
    wx.showNavigationBarLoading()
    this.setData({
      movieList: [],
      page: 0,
      haveMore: ''
    }, () => {
      wx.request({
        url: API_URL,
        data: {
          q: this.data.searchText,
          start: this.data.page
        },
        header: {
          "Content-Type": "json"
        },
        success(res) {
          if (res.statusCode === 200) {
            let page = res.data.start + res.data.count
            that.setData({
              movieList: res.data.subjects,
              page
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
  },
  getMore() {
    console.log(this.data.haveMore)
    if (this.data.haveMore === '没有更多数据了') return;
    let that = this
    // 显示加载状态
    that.setData({
      haveMore: '加载更多...'
    }, () => {
      wx.showNavigationBarLoading()
      wx.request({
        url: API_URL,
        data: {
          q: this.data.searchText,
          start: this.data.page
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})