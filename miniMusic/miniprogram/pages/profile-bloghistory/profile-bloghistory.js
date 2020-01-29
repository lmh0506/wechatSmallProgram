// miniprogram/pages/profile-bloghistory/profile-bloghistory.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    blogList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBlogList()
  },
  getBlogList() {
    wx.cloud.callFunction({
      name: 'blog',
      data: {
        $url: 'getListByOpenid',
        start: this.data.blogList.length,
        limit: 10
      }
    }).then(res => {
      this.total = res.result.total
      this.setData({
        blogList: this.data.blogList.concat(res.result.data)
      })
    })
  },
  goComment(e) {
    wx.navigateTo({
      url: `/pages/blog-comment/blog-comment?id=${e.currentTarget.dataset.id}`
    });
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
    if(this.total > this.data.blogList.length) {
      this.getBlogList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    let { blog, id } = e.target.dataset
    return {
      title: blog.content,
      path: '/pages/blog-comment/blog-comment?id=' + id
    }
  }
})