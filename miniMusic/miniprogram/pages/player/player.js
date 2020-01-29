// miniprogram/pages/player/player.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: '',
    isPlaying: false, // false 不播放  true 播放
    isLyricShow: false, // 是否当前歌词显示
    lyric: '暂无歌词',
    isSame: false // 是否为同一首歌
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
    this.setData({
      isSame: id == app.globalData.playingMusicId
    })
    app.setPlayMusicId(id * 1)
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

      // 如果播放地址不存在
      if(!data.url) {
        wx.showToast({
          title: '无权限播放'
        })
        return
      }

      if(!this.data.isSame) {
        this.bgAudioManager.stop()
  
        this.bgAudioManager.src = data.url
        this.bgAudioManager.title = music.name
        this.bgAudioManager.coverImgUrl = music.al.picUrl
        this.bgAudioManager.singer = music.ar[0].name
        this.bgAudioManager.epname = music.al.name

        // 保存播放历史
        this.savePlayHistory()
      }

      this.setData({
        isPlaying: true
      })

      // 加载歌词
      wx.cloud.callFunction({
        name: 'music',
        data: {
          $url: 'lyric',
          id
        }
      }).then(res => {
        let lyric = '暂无歌词'
        if(res.result.lrc) {
          lyric = res.result.lrc.lyric || '暂无歌词'
        }

        this.setData({
          lyric
        })
      })

    })
  },

  togglePlaying() {
    if(this.data.isPlaying) {
      this.bgAudioManager.pause()
    }else{
      this.bgAudioManager.play()
    }
    this.setData({
      isPlaying: !this.data.isPlaying
    })
  },
  musicPlay() {
    this.setData({
      isPlaying: true
    })
  },
  musicPause() {
    this.setData({
      isPlaying: false
    })
  },
  toggleLyricShow() {
    this.setData({
      isLyricShow: !this.data.isLyricShow
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
  timeUpdate(e) {
    this.selectComponent('.lyric').update(e.detail.currentTime)
  },
  savePlayHistory() {
    // 当前播放歌曲
    let music = this._musiclist[this._nowPlayIndex]
    let openid = app.globalData.openid
    let history = wx.getStorageSync(openid);
    let index = history.findIndex(item => item.id === music.id)
    if(index === -1) {
      history.unshift(music)
    }
    wx.setStorageSync(openid, history);
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