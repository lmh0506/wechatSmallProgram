import Book from '../../models/book'
// pages/book-detail/book-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    likeStatus: false,
    likeCount: 0,
    book: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    Book.getDetail(id).then(book => {
      this.setData({
        book
      })
    })

    Book.getComments(id).then(comments => {
      this.setData({
        comments: comments.comments
      })
    })

    Book.getLikeStatus(id).then(data => {
      this.setData({
        likeStatus: data.like_status,
        likeCount: data.fav_nums
      })
    })
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