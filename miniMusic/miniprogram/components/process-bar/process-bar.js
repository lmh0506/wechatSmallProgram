// components/process-bar/process-bar.js
let currentSec = 0
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isSame: Boolean
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
      this.bgAudioManager = wx.getBackgroundAudioManager();
      // 如果歌曲未改变 则重新获取一次歌曲时间
      if(this.data.isSame && this.data.showTime.totalTime === '00:00') {
        this.setTime()
      }
      this.getMovableDis()
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
        // 防止拖动完成后 还会触发touchchange事件
        this.isMoving = false
        this.triggerEvent('musicPlay')
      });

      this.bgAudioManager.onPause(()=>{
        console.log('pause')
        this.triggerEvent('musicPause')
      });

      this.bgAudioManager.onStop(()=>{
        console.log('stop')
      });

      this.bgAudioManager.onWaiting(()=>{
        console.log('waiting')
      });

      this.bgAudioManager.onTimeUpdate(()=>{
        // 正在拖动时不更新进度条
        if(this.isMoving) return
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

        this.triggerEvent('timeUpdate', { currentTime })
        
      });

      this.bgAudioManager.onEnded(()=>{
        console.log('ended')
        this.triggerEvent('musicEnd')
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
    onTouchEnd(e) {
      this.bgAudioManager.seek(this.totalDuration * this.data.progress / 100)
      let currentTime = this.bgAudioManager.currentTime
      let currentTimeFmt = this.dateFormat(currentTime).time
      this.setData({
        progress: this.data.progress,
        movableDis: this.data.movableDis,
        'showTime.currentTime': currentTimeFmt
      })
      // 停止拖动
      this.isMoving = false
    },
    onChange(e) {
      if(e.detail.source === 'touch') {
        this.data.progress = e.detail.x / (this.movableAreaWidth - this.movableViewWidth) * 100
        this.data.movableDis = e.detail.x
        // 正在拖动
        this.isMoving = true
      }
    },
    onTap(e) {
      console.log(e)
    }
  }
})
