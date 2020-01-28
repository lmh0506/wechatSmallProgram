// miniprogram/pages/blog/blog.js
let keyWord = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 控制底部弹出层是否显示
    modalShow: false,
    blogList: [],
    total: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadBlogList()
  },
  loadBlogList(start = 0) {
    wx.showLoading({
      title: '拼命加载中'
    });
    wx.cloud.callFunction({
      name: 'blog',
      data: {
        $url: 'list',
        keyWord,
        start,
        limit: 10
      }
    }).then(res => {
      this.setData({
        blogList: start === 0 ? res.result.data : this.data.blogList.concat(res.result.data),
        total: res.result.total
      })
      wx.hideLoading();
      wx.stopPullDownRefresh()
    })
  },
  onPublish() {
    // 判断用户是否授权
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: (res) => {
              this.toBlogEdit(res.userInfo)
            }
          })
        } else {
          this.setData({
            modalShow: true
          })
        }
      }
    })
  },
  onLoginSuccess(userInfo) {
    this.toBlogEdit(userInfo)
  },
  onLoginFail() {
    wx.showModal({
      title: '授权用户才能发布'
    });
  },
  toBlogEdit(userInfo) {
    wx.navigateTo({
      url: `/pages/blog-edit/blog-edit?nickName=${userInfo.nickName}&avatarUrl=${userInfo.avatarUrl}`
    });
  },
  goComment(e) {
    wx.navigateTo({
      url: `/pages/blog-comment/blog-comment?id=${e.currentTarget.dataset.id}`
    });
  },
  onSearch(e) {
    keyWord = e.detail
    this.loadBlogList()
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
    this.loadBlogList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let len = this.data.blogList.length
    if(this.data.total > len) {
      this.loadBlogList(len)
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