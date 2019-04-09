import Classic from '../../models/classic'
import Like from '../../models/like'
import like from '../../models/like';
// pages/classic/classic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    first: false,
    latest: true,
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Classic.getLatest(data => {
      this.setData({
        classic: data,
        likeCount: data.fav_nums,
        likeStatus: data.like_status === 1
      })
    })
  },
  onLike(e) {
    Like.like({
      isLike: e.detail.isLike,
      art_id: this.data.classic.id,
      type: this.data.classic.type
    })
  },
  onNext() {
    this._updateClassic('next')
  },
  onPrevious() {
    this._updateClassic('previous')
  },

  _updateClassic(nextOrPrevious) {
    let index = this.data.classic.index
    Classic.getClassic(index, nextOrPrevious, data => {
      this._getLikeStatus(data.id, data.type)
      this.setData({
        classic: data,
        latest: Classic.isLatest(data.index),
        first: Classic.isFirst(data.index)
      })
    })
  },

  _getLikeStatus(artID, category) {
    Like.getClassicLikeStatus(artID, category, data => {
      this.setData({
        likeCount: data.fav_nums,
        likeStatus: data.like_status === 1
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