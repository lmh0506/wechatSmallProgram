// pages/image/image.js
const chooseImg = {
  sourceType: [['album'], ['camera'], ['camera', 'album']],
  count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  sizeType: [['original'], ['compressed'], ['original', 'compressed']]
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sourceType: ['相册选择', '相机拍摄', '相册选择或相机拍摄'],
    sourceTypeIndex: 0,
    sizeType: ['原图', '压缩', '原图或压缩'],
    sizeTypeIndex: 0,
    count: chooseImg.count,
    countIndex: 8,
    imgArr: [],
    content: ''
  },
  chooseSourceType() {
    let that = this
    // 设置图片来源
    wx.showActionSheet({
      itemList: that.data.sourceType,
      success(res) {
        that.setData({
          sourceTypeIndex: res.tapIndex
        })
      }
    })
  },
  chooseSizeType() {
    let that = this
    // 设置图片的质量
    wx.showActionSheet({
      itemList: that.data.sizeType,
      success(res) {
        that.setData({
          sizeTypeIndex: res.tapIndex
        })
      }
    })
  },
  chooseCount(e) {
    // 设置可选择的图片数量
    this.setData({
      countIndex: e.detail.value
    })
  },
  chooseImage() {
    let that = this;
    // 从相机或相册选择图片
    wx.chooseImage({
      sourceType: chooseImg.sourceType[that.data.sourceTypeIndex],
      sizeType: chooseImg.sizeType[that.data.sizeTypeIndex],
      count: chooseImg.count[that.data.countIndex],
      success: function(res) {
        console.log(res)
        that.setData({
          imgArr: res.tempFilePaths
        })
      },
    })
  },
  previewImage(e) {
    let that = this;
    // 点击预览图片
    wx.previewImage({
      urls: that.data.imgArr,
      current: that.data.imgArr[e.target.dataset.index]
    })
  },
  copy(e) {
    console.log(e)
    // 设置剪贴板内容
    wx.setClipboardData({
      data: e.target.dataset.content,
      success(res) {
        console.log(res)
      }
    })
  },
  getCopy() {
    let that = this;
    // 获取剪贴板内容
    wx.getClipboardData({
      success(res) {
        that.setData({
          content: res.data
        })
      }
    })
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
  
  }
})