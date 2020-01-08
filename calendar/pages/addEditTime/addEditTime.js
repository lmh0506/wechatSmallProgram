// pages/addEditTime/addEditTime.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {time = ''} = options
    if(time) {
      time = parseInt(time)
    }
    let timeList = wx.getStorageSync('timeList') || []
    this.editIndex = timeList.findIndex(item => item === time)
    this.setData({
      time
    })
  },

  // 输入的时间改变时
  onTimeChange(e) {
    this.setData({
      time: parseInt(e.detail)
    });
  },
  
  // 提交表单
  submit() {
    let { time } = this.data
    let errTxt = ''
    if(!time) {
      errTxt = '请输入时间'
    }

    if(errTxt) {
      wx.showToast({
        title: errTxt,
        icon: 'none',
        duration: 1000
      })
    } else {
      let timeList = wx.getStorageSync('timeList') || []
      let index = timeList.findIndex((item, index) => {
        // 时间相同且不是当前数据 判定为日期存在
        return item === time && index !== this.editIndex
      })

      if(index > -1) {
        wx.showToast({
          title: '该时间已存在',
          icon: 'none',
          duration: 1000
        })
      } else {
        if(this.editIndex > -1) {
          // 修改
          timeList[this.editIndex] = time
        } else {
          // 新增
          timeList.push(time)
        }
        wx.setStorageSync('timeList', timeList)
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1000
        })
        wx.navigateBack()
      }
      
    }
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