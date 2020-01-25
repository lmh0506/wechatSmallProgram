// components/process-bar/process-bar.js
let currentSec = 0
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showTime: {
      currentTime: "00:00",
      totalTime: "00:00"
    },
    movableDis: 0,
    progress: 0
  },
  lifetimes: {
    ready() {
      this.getMovableDis()
      this.bgAudioManager = wx.getBackgroundAudioManager();
      this.bindBGMEvent()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getMovableDis() {
      const query = this.createSelectorQuery()
      query.select('.movable-area').boundingClientRect()
      query.select('.movable-view').boundingClientRect()
      query.exec(rect => {
        this.movableAreaWidth = rect[0].width
        this.movableViewWidth = rect[1].width
      })
    },
    bindBGMEvent() {
      this.bgAudioManager.onCanplay(()=>{
        console.log('canplay')
        let duration = this.bgAudioManager.duration
        if (duration) {
          this.setTime()
        } else {
          setTimeout(() => {
            this.setTime()
          }, 1000)
        }
      });

      this.bgAudioManager.onPlay(()=>{
        console.log('play')
      });

      this.bgAudioManager.onPause(()=>{
        console.log('pause')
      });

      this.bgAudioManager.onStop(()=>{
        console.log('stop')
      });

      this.bgAudioManager.onWaiting(()=>{
        console.log('waiting')
      });

      this.bgAudioManager.onTimeUpdate(()=>{
        console.log('timeupdate')
        let currentTime = this.bgAudioManager.currentTime
        let duration = this.totalDuration

        let currentTimeFmt = this.dateFormat(currentTime)

        let sec = currentTime.toString().split('.')[0]
        if(sec != currentSec) {
          this.setData({
            'showTime.currentTime': currentTimeFmt.time,
            movableDis: (this.movableAreaWidth - this.movableViewWidth) * currentTime / duration,
            progress: currentTime / duration * 100
          })
          currentSec = sec
        }
      });

      this.bgAudioManager.onEnded(()=>{
        console.log('ended')
      });

      this.bgAudioManager.onError((err)=>{
        console.error(err.errMsg)
        console.error(err.errCode)
        wx.showToast({
          title: '错误：' + err.errCode
        })
      });
    },

    setTime() {
      let duration = this.bgAudioManager.duration
      this.totalDuration = duration
      let durationFmt = this.dateFormat(duration)
      this.setData({
        'showTime.totalTime': durationFmt.time
      })
    },
    dateFormat(sec) {
      const min = this.parseNum(Math.floor(sec / 60))
      sec = this.parseNum(Math.floor(sec % 60))
      return {
        min,
        sec,
        time: `${min}:${sec}`
      }

    },
    parseNum(num) {
      return num < 10 ? '0' + num : num
    },
    onTouchEnd() {
      this.bgAudioManager.seek(this.totalDuration * this.data.progress / 100)
      let currentTime = this.bgAudioManager.currentTime
      let currentTimeFmt = this.dateFormat(currentTime).time
      this.setData({
        progress: this.data.progress,
        movableDis: this.data.movableDis,
        'showTime.currentTime': currentTimeFmt
      })
    },
    onChange(e) {
      if(e.detail.source === 'touch') {
        this.data.progress = e.detail.x / (this.movableAreaWidth - this.movableViewWidth) * 100
        this.data.movableDis = e.detail.x
      }
    }
  }
})
