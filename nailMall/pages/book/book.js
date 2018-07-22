// pages/book/book.js
const data = require('../../utils/data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    range: [],
    time: '11:28',
    date: '2017-12-10',
    bookFlag: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.hideNavigationBarLoading()
    this.setData({
      ...options,
      range: data.getSkillData()
    })
  },
  nameChange(res) {
    console.log(res)
    this.setData({
      index: res.detail.value
    })
  },
  timeChange(res) {
    console.log(res)
    this.setData({
      time: res.detail.value
    })
  },
  dateChange(res) {
    console.log(res)
    this.setData({
      date: res.detail.value
    })
  },
  bookTap() {
    if (this.data.bookFlag) {
      this.setData({
        bookFlag: false
      }, () => {
        setTimeout(() => {
          this.setData({
            bookFlag: true
          })
        }, 2000)
      })
    }
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