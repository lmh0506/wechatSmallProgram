import classicBeh from '../classic-beh'
const mMgr = wx.getBackgroundAudioManager();
// components/classic/music/index.js
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    url: {
      type: String,
      observer(newVal, oldVal, changedPath) {
        if(newVal !== oldVal) {
          this.setData({
            isPlay: false
          })
          this._recoverStatus()
        }
      }
    },
    title: String
  },
  /**
   * 组件的初始数据
   */
  data: {
    pauseSrc: './images/player@pause.png',
    playSrc: './images/player@play.png',
    isPlay: false
  },
  attached() {
    this._monitorSwitch()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay() {
      let isPlay = !this.data.isPlay
      if(isPlay) {
        mMgr.title = this.properties.title
        mMgr.src = this.properties.url
        mMgr.play()
      }else{
        mMgr.pause()
      }
      
      this.setData({
        isPlay
      })

    },

    _recoverStatus() {
      if(mMgr.paused) {
        this.setData({
          isPlay: false
        })
        return
      }

      if(mMgr.src === this.properties.url) {
        this.setData({
          isPlay: true
        })
        return
      }
    },

    _monitorSwitch() {
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
    }
  }
})
