// miniprogram/pages/blog-comment/blog-comment.js
import formatTime from '../..//utils/formatTime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    blog: {},
    comments: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData(options, () => {
      this.getBlogDetail()
    })
  },
  async getBlogDetail() {
    wx.showLoading({
      title: '加载中。。。',
      mask: true
    });

    let res = await wx.cloud.callFunction({
      name: 'blog',
      data: {
        $url: 'detail',
        id: this.data.id
      }
    })

    let comments = res.result.comments.map(item => ({
      ...item,
      createTime: formatTime(new Date(item.createTime))
    }))

    this.setData({
      blog: res.result.detail,
      comments
    })

    wx.hideLoading();
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