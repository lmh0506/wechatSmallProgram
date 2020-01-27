// miniprogram/pages/blog/blog.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 控制底部弹出层是否显示
    modalShow: false,
    blogList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadBlogList()
  },
  loadBlogList() {
    wx.cloud.callFunction({
      name: 'blog',
      data: {
        $url: 'list',
        start: this.data.blogList.length,
        limit: 10
      }
    }).then(res => {
      this.setData({
        blogList: this.data.blogList.concat(res.result)
      })
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
      title: '授权用户才能发布',
      // content: '',
      // showCancel: true,
      // cancelText: '取消',
      // cancelColor: '#000000',
      // confirmText: '确定',
      // confirmColor: '#3CC51F',
      // success: (result) => {
      //   if(result.confirm){
          
      //   }
      // },
      // fail: ()=>{},
      // complete: ()=>{}
    });
  },
  toBlogEdit(userInfo) {
    wx.navigateTo({
      url: `/pages/blog-edit/blog-edit?nickName=${userInfo.nickName}&avatarUrl=${userInfo.avatarUrl}`
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})