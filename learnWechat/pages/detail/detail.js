var common = require('../../common/common.js')

// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    autoPlay: false
  },

  changeSwitch() {
    this.setData({
      autoPlay: !this.data.autoPlay
    })
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('页面加载完成')
    wx.showNavigationBarLoading()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('页面渲染完成')
    wx.hideNavigationBarLoading()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('页面显示')
    wx.setNavigationBarTitle({
      title: '优惠详情',
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('页面隐藏')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('页面卸载')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('页面下拉')
    this.setData({
      name: 'lmh'
    })
    common.show(true)
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('页面上拉')
    common.showToast(true)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('页面分享')
    return {
      title: '分享标题',
      path: '/pages/index/index',
      success() {
        wx.showToast({
          title: '分享成功',
          duration: 2000
        })
      }
    }
  },
  jumpToMov() {
    wx.navigateTo({
      url: '/pages/mov/mov',
    })
  }
})