import Classic from '../../models/classic'
import Book from '../../models/book'
// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    count: 0,
    classics: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized()
    this.getMybookCount()
    this.getMyClassics()
    
  },
  getMybookCount() {
    Book.getMyBookCount().then(data => {
      this.setData({
        count: data.count
      })
    })
  },

  getMyClassics() {
    Classic.getMyClassics(classics => {
      this.setData({
        classics
      })
    })
  },

  // 用户是否已经授权
  userAuthorized() {
    let that = this
    wx.getSetting({
      success(res) {
        if(res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: ({userInfo})=>{
              that.setData({
                userInfo
              })
            }
          });
        }
      }
    })
  },

  getUserInfo(e) {
    let userInfo = e.detail.userInfo
    if(userInfo) {
      this.setData({
        userInfo: e.detail.userInfo
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