// pages/animation/animation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animation: {}
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
  
  },
  rotate() {
    let animation = wx.createAnimation();
    animation.rotate(90).step();
    this.setData({
      animation: animation.export()
    })
  },
  scale() {
    let animation = wx.createAnimation();
    animation.scale(2).step();
    this.setData({
      animation: animation.export()
    })
  },
  translate() {
    let animation = wx.createAnimation();
    animation.translate(100, 50).step();
    this.setData({
      animation: animation.export()
    })
  },
  skew() {
    let animation = wx.createAnimation();
    animation.skew(100, 50).step();
    this.setData({
      animation: animation.export()
    })
  },
  rotateAndScale() {
    let animation = wx.createAnimation();
    animation.scale(2).rotate(90).step();
    animation.translate(50, -100).opacity(0.5).step({duration: 1000})
    this.setData({
      animation: animation.export()
    })
  }
})