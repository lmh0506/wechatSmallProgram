// pages/interface/interface.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showToast({
      icon: 'success',
      title: '加载成功',
      duration: 1000,
      mask: true
    })
    setTimeout(() => {
      wx.showLoading({
        title: '加载中',
        mask: 'true'
      })
      setTimeout(() => {
        wx.hideLoading()
      }, 2000)
    }, 1000)
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
  
  },
  showModal() {
    wx.showModal({
      title: '提示',
      content: '你确定要离开吗',
      cancelText: '确定',
      confirmText: '取消',
      success(res) {
        if(res.confirm) {
          console.log('点击取消')
        } else if(res.cancel) {
          console.log('点击确定')
        }
      }
    })
  },
  showAction() {
    let data = ['银行卡支付', '微信支付', '支付宝支付']
    wx.showActionSheet({
      itemList: data,
      success(res) {
        console.log(res)
        switch (res.tapIndex) {
          case 0: console.log('点击银行卡支付'); break;
          case 1: console.log('点击微信支付'); break;
          case 2: console.log('点击支付宝支付'); break;
        }
      }
    })
  }
})