import Book from '../../models/book'
import KeyWord from '../../models/keyword'
// pages/book/book.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,
    hotWord: [],
    searchArray: [],
    keyword: '',
    total: -1,
    noResult: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Book.getHotList().then(data => {
      this.setData({
        books: data
      })
    })
  },

  toBookDetail(e) {
    let id = e.detail.id || e.target.dataset.book.id
    wx.navigateTo({
      url: `/pages/book-detail/book-detail?id=${id}`
    });
  },

  onSearch() {
    KeyWord.getHot().then(data => {
      this.setData({
        hotWord: data.hot,
        searching: true
      })
    })
  },

  onCancel() {
    this.setData({
      searching: false,
      searchArray: [],
      keyword: '',
      noResult: false
    })
  },

  onClear() {
    this.setData({
      searchArray: [],
      keyword: '',
      noResult: false
    })
  },

  onSearchBook(e) {
    wx.showLoading();
    this.setData({
      searchArray: [],
      keyword: e.detail.keyword,
      noResult: false
    })
    Book.search(this.data.searchArray.length, this.data.keyword).then(data => {
      let searchArray = this.data.searchArray.concat(data.books)
      this.setData({
        searchArray,
        total: data.total
      })
      if(data.total === 0) {
        this.setData({
          noResult: true
        })
      }
      wx.hideLoading();
    })
  },

  _loadMore() {
    this.setData({
      loading: true
    })
    console.log(this.data.loading)
    Book.search(this.data.searchArray.length, this.data.keyword).then(data => {
      let searchArray = this.data.searchArray.concat(data.books)
      this.setData({
        searchArray,
        total: data.total,
        loading: false
      })
    }, () => {
      this.setData({
        loading: false
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
    let {searching, searchArray, total, loading} = this.data
    if(!loading && searching && searchArray.length < total) {
      this._loadMore()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})