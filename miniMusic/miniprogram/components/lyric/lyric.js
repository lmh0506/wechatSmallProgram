// components/lyric/lyric.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    lyric: String,
    isLyricShow: Boolean
  },
  observers: {
    lyric(val) {
      if(val === '暂无歌词') {
        this.setData({
          lrcList: [
            {
              lrc: val,
              time: 0
            }
          ],
          nowLrcIndex: -1
        })
      } else {
        this.parseLyric(val)
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    lrcList: [],
    nowLrcIndex: 0,
    scrollTop: 0
  },
  lifetimes: {
    ready() {
      wx.getSystemInfo({
        success: (res)=>{
          // 求出1rpx高度
          this.lineHeight = res.screenWidth / 750 * 64
        }
      });
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    parseLyric(lyric) {
      let lyricLines = lyric.split('\n')
      let lrcList = []
      lyricLines.forEach(line => {
        let time = line.match(/\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g)
        if(time) {
          let lrc = line.split(time)[1]
          let timeReg = time[0].match(/(\d{2,}):(\d{2})(?:\.(\d{2,3}))?/)
          // 把时间转换为秒
          let time2Seconds = parseInt(timeReg[1]) * 60 + parseInt(timeReg[2]) + parseInt(timeReg[3]) / 1000

          lrcList.push({
            lrc,
            time: time2Seconds
          })
        }
      })

      this.setData({
        lrcList
      })
    },
    update(time) {
      let list = this.data.lrcList
      let len = list.length
      if(len === 0) {
        return
      }

      if(time > list[len - 1].time) {
        if(this.data.nowLrcIndex !== -1) {
          this.setData({
            nowLrcIndex: -1,
            scrollTop: len * this.lineHeight
          })
        }
      }
      
      for(let i = 0; i < len; i++) {
        if(time <= list[i].time) {
          this.setData({
            nowLrcIndex: i - 1,
            scrollTop: (i - 1) * this.lineHeight
          })
          break
        }
      }
    }
  }
})
