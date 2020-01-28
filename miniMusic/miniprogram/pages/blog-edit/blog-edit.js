// miniprogram/pages/blog-edit/blog-edit.js
const MAX_WORDS_NUM = 140
const MAX_IMG_NUM = 9

const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wordsNum: 0,
    footerBottom: 0,
    imgs: [],
    selectPhoto: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.content = ''
    this.userInfo = options
  },
  onInput(e) {
    this.content = e.detail.value
    let wordsNum = e.detail.cursor >= MAX_WORDS_NUM ? '最大字数为' + MAX_WORDS_NUM : e.detail.cursor
    this.setData({
      wordsNum
    })
  },
  onFocus(e) {
    // 获取模拟器键盘高度
    this.setData({
      footerBottom: e.detail.height
    })
  },
  onBlur() {
    this.setData({
      footerBottom: 0
    })
  },
  onChooseImg() {

    let max = MAX_IMG_NUM - this.data.imgs.length
    wx.chooseImage({
      count: max,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: (res) => {
        let imgs = this.data.imgs.concat(res.tempFilePaths)
        this.setData({
          imgs,
          selectPhoto: imgs.length < MAX_IMG_NUM
        })
      }
    });
  },
  onDeleteImg(e) {
    let index = e.currentTarget.dataset.index
    this.data.imgs.splice(index, 1)
    this.setData({
      imgs: this.data.imgs,
      selectPhoto: this.data.imgs.length < MAX_IMG_NUM
    })
  },
  onPreviewImgs(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.index,
      urls: this.data.imgs
    });
  },
  async send() {
    if(this.content.trim() === '') {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      });
      return
    }
    // 数据库：内容 图片fileId openid 昵称 头像 时间
    // 图片 -> 云存储 fileID 云文件ID
    wx.showLoading({
      title: '发布中',
      mask: true
    });
    let promiseArr = []

    // 图片上传
    this.data.imgs.forEach(img => {
      // 获取扩展名
      let suffix = /\.\w+$/.exec(img)[0]
      promiseArr.push(wx.cloud.uploadFile({
        cloudPath: 'blog/' + Date.now() + '-' + Math.random() * 1e7 + suffix,
        filePath: img
      }))
    })

    // 存入到云数据库
    try{
      let uploadRes = await Promise.all(promiseArr)
      let fileIds = uploadRes.map(res => res.fileID)
      
      let data = {
        content: this.content,
        imgs: fileIds,
        ...this.userInfo,
        createTime: db.serverDate()  // 服务端时间
      }

      try{
        // 小程序端调用云数据库会自动带上openid字段
        await db.collection('blog').add({
          data
        })
        wx.showToast({
          title: '发布成功'
        });

        wx.navigateBack();
        const pages = getCurrentPages();
        // 获取上一个页面
        const prevPage = pages[pages.length - 2]
        prevPage.loadBlogList()        

      } catch (e) {
        console.log(e)
        wx.showToast({
          title: '发布失败',
          icon: 'none'
        });
      }
    } catch (e) {
      console.log(e)
      wx.showToast({
        title: '图片上传失败',
        icon: 'none'
      });
    }
    wx.hideLoading();
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