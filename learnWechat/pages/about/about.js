// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: '我是msg',
    objArr: [
      {
      id: 1,
      name: 'item_1'
      },
      {
        id: 2,
        name: 'item_2'
      },
      {
        id: 3,
        name: 'item_3'
      },
      {
        id: 4,
        name: 'item_4'
      }
    ],
    flag: true
  },

  changeMsg(e) {
    console.log(e, '点击事件')
    this.setData({
      msg: this.data.msg === '我是msg' ? '我是lmh' : '我是msg',
      flag: !this.data.flag
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