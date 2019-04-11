import Book from '../../models/book'
import Like from '../../models/like'
// pages/book-detail/book-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    likeStatus: false,
    likeCount: 0,
    book: null,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading()
    const id = options.id
    
    Promise.all(
      [Book.getDetail(id), 
      Book.getComments(id), 
      Book.getLikeStatus(id)]
    ).then(([book, comments, data]) => {
      this.setData({
        book,
        comments: comments.comments,
        likeStatus: data.like_status === 1,
        likeCount: data.fav_nums
      })
      wx.hideLoading();
    })
  },

  onLike(e) {
    Like.like({
      isLike: e.detail.isLike,
      art_id: this.data.book.id,
      type: 400
    })
  },

  onFakePost() {
    this.setData({
      posting: true
    })
  },

  onCancle() {
    this.setData({
      posting: false
    })
  },

  onPost(e) {
    let comment = e.detail.text || e.detail.value

    if(!comment) {
      wx.showToast({
        title: '短评不能为空',
        icon: 'none'
      });
      return
    }

    if(comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      });
      return
    }

    Book.postComment(this.data.book.id, comment).then(res => {
      wx.showToast({
        title: '提交成功',
        icon: 'none'
      });

      this.data.comments.unshift({
        content: comment,
        nums: 1
      })

      this.setData({
        comments: this.data.comments,
        posting: false
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