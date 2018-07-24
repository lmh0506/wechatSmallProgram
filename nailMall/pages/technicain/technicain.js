// pages/technicain/technicain.js
const data = require('../../utils/data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    skillData: [],
    range: ['美发', '美容', '美甲', '美睫'],
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      skillData: data.getSkillData()
    })
  },
  loadMore() {
    console.log('加载更多')
    let skillData = this.data.skillData.concat(data.getSkillData())
    this.setData({
      skillData
    })
  },
  change(res) {
    this.setData({
      index: res.detail.value
    })
  },
  navgatorDetail(e) {
    let item = e.currentTarget.dataset.item
    console.log(item)
    wx.navigateTo({
      url: `../technicain_detail/technicain_detail?avatar=${item.avatar}&company=${item.company}&message=${item.message}&nickname=${item.nickname}&price=${item.price}`,
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