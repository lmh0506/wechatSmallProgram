// miniprogram/pages/profile-playhistory/profile-playhistory.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playHistory: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let openid = app.globalData.openid
    let playHistory = wx.getStorageSync(openid)
    
    if(playHistory && playHistory.length > 0) {
      // 替换storage里面的musiclist
      wx.setStorageSync('musiclist', playHistory);
      this.setData({
        playHistory
      })
    } else {
      wx.showModal({
        title: '播放历史为空',
        showCancel: false,
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: () => {
          wx.navigateBack();
        },
      });
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