// miniprogram/pages/player/player.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: '',
    isPlaying: false // false 不播放  true 播放
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._musiclist = wx.getStorageSync('musiclist') || []
    // 正在播放的index
    this._nowPlayIndex = options.index * 1

    this.bgAudioManager = wx.getBackgroundAudioManager();
    this.loadMusicDetail(options.id)
  },
  loadMusicDetail(id) {
    let music = this._musiclist[this._nowPlayIndex]
    wx.setNavigationBarTitle({
      title: music.name
    });
    wx.cloud.callFunction({
      name: 'music',
      data: {
        $url: 'musicUrl',
        id
      }
    }).then(res => {
      this.setData({
        picUrl: music.al.picUrl,
        isPlaying: false
      })
      let data = res.result.data[0]
      this.bgAudioManager.stop()

      this.bgAudioManager.src = data.url
      this.bgAudioManager.title = music.name
      this.bgAudioManager.coverImgUrl = music.al.picUrl
      this.bgAudioManager.singer = music.ar[0].name
      this.bgAudioManager.epname = music.al.name

      this.setData({
        isPlaying: true
      })

      this.bgAudioManager.onPlay(()=>{
        this.setData({
          isPlaying: true
        })
      });

      this.bgAudioManager.onPause(()=>{
        this.setData({
          isPlaying: false
        })
      });

    })
  },

  togglePLaying() {
    if(this.data.isPlaying) {
      this.bgAudioManager.pause()
    }else{
      this.bgAudioManager.play()
    }
    this.setData({
      isPlaying: !this.data.isPlaying
    })
  },

  onPrev() {
    this._nowPlayIndex--
    if(this._nowPlayIndex < 0) {
      this._nowPlayIndex = this._musiclist.length - 1
    }
    this.loadMusicDetail(this._musiclist[this._nowPlayIndex].id)
  },

  onNext() {
    this._nowPlayIndex = (this._nowPlayIndex + 1) % this._musiclist.length
    this.loadMusicDetail(this._musiclist[this._nowPlayIndex].id)
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