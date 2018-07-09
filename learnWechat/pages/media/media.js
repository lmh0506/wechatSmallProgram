// pages/media/media.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay: false,
    percent: 0,
    audioTime: '00:00',
    currentVoice: 50,
    showCamera: false,
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
      }]
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
    this.videoContext = wx.createVideoContext('myVideo')
    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.autopaly = true;
    this.innerAudioContext.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
    this.innerAudioContext.volume = 0.5

    this.innerAudioContext.onPlay(() => {
      console.log('开始播放');
    })

    this.innerAudioContext.onError(res => {
      console.log(res)
    })

    this.innerAudioContext.onTimeUpdate(() => {
      let currentTime = this.innerAudioContext.currentTime
      let percent = currentTime / this.innerAudioContext.duration * 100
      let min = Math.floor(currentTime / 60).toString()
      min = min.length === 1 ? '0' + min : min
      let second = Math.floor(currentTime % 60).toString().padStart('0', 2)
      second = second.length === 1 ? '0' + second : second
      this.setData({
        percent,
        audioTime: min + ':' + second
      })
    })
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
  playOrPause() {
    if (!this.data.isPlay) {
      this.innerAudioContext.play()
    } else {
      this.innerAudioContext.pause()
    }

    this.setData({
      isPlay: !this.data.isPlay
    })
  },
  setVoice(e) {
    this.setData({
      currentVoice: e.detail.value
    })

    this.innerAudioContext.volume = e.detail.value / 100
    console.log(e.detail.value / 100)
  },
  showCamera() {
    this.setData({
      showCamera: true
    })
  },
  takePhoto() {
    const ctx = wx.createCameraContext();
    ctx.takePhoto({
      quality: 'high',
      success: (res => {
        console.log(res)
        this.setData({
          src: res.tempImagePath,
          showCamera: false
        })
      }),
      fail(e) { // 接口调用失败或者用户没有授权
        console.log(e)
      }
    })
  },
  error(e) {
    console.log(e)
  },
  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  },
  bindInputBlur: function (e) {
    this.inputValue = e.detail.value
  }
})

function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
