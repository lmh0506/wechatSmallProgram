// pages/addEditDate/addEditDate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    date: '',
    currentDate: new Date().getTime(),
    isShowMask: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {content = '', date = ''} = options
    let dateList = wx.getStorageSync('dateList') || []
    this.editIndex = dateList.findIndex(item => item.date === date)
    this.setData({
      content,
      date
    })
  },
  onDateChange(e) {
    let currentDate = e.detail

    let date = new Date(currentDate)
    let year = date.getFullYear().toString().padStart(2, '0')
    let month = (date.getMonth() + 1).toString().padStart(2, '0')
    let day = date.getDate().toString().padStart(2, '0')

    this.setData({
      currentDate,
      date: `${year}-${month}-${day}`
    });
    this.hideMask()
  },
  // 输入的内容改变时
  onContentChange(e) {
    this.setData({
      content: e.detail
    });
  },
  // 显示日期选择框
  showMask() {
    this.setData({
      isShowMask: true
    })
  },
  // 隐藏日期选择框
  hideMask() {
    this.setData({
      isShowMask: false
    })
  },
  // 提交表单
  submit() {
    let {date, content} = this.data
    let errTxt = ''
    if(!date) {
      errTxt = '请选择日期'
    } else if (!content) {
      errTxt = '请输入内容'
    }

    if(errTxt) {
      wx.showToast({
        title: errTxt,
        icon: 'none',
        duration: 1000
      })
    } else {
      let dateList = wx.getStorageSync('dateList') || []
      let index = dateList.findIndex((item, index) => {
        // 时间相同且不是当前数据 判定为日期存在
        return item.date === date && index !== this.editIndex
      })

      if(index > -1) {
        wx.showToast({
          title: '该日期已存在',
          icon: 'none',
          duration: 1000
        })
      } else {
        if(this.editIndex > -1) {
          // 修改
          dateList[this.editIndex] = {
            content,
            date
          }
        } else {
          // 新增
          dateList.push({
            content,
            date
          })
        }
        wx.setStorageSync('dateList', dateList)
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