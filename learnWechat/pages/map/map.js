// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{ // 标记点
      iconPath: "/images/location.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 20,
      height: 20,
      title: '腾讯大楼'
    }],
    polyline: [{ // 路线
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true,
      arrowLine: true
    }],
    circles: [{
      latitude: 23.099994,
      longitude: 113.324520,
      color: '#3388FFFF',
      fillColor: '#3388FF22',
      radius: 50,
      strokeWidth: 2
    }],
    controls: [{
      id: 1,
      iconPath: '/images/location.png',
      position: {
        left: 50,
        top: 50,
        width: 20,
        height: 20
      },
      clickable: true
    }],
    myLocation: ''
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
  markerTap(res) {
    console.log('markersTap', res)
  },
  getLocation() {
    let that = this
    wx.getLocation({
      success: function(res) {
        console.log(res)
        that.setData({
          myLocation: `${res.latitude}, ${res.longitude}`
        })
      },
    })
  },
  chooseLocation() {
    wx.chooseLocation({
      success: function(res) {
        console.log(res)
      },
    })
  }
})