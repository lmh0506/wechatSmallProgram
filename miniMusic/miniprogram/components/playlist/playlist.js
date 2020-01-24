// components/playlist/playlist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    playlist: {
      type: Object
    }
  },

  observers: {
    ['playlist.playCount'](val) {
      this.setData({
        _count: this._tranNumber(val, 2)
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _count: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _tranNumber(num, point) {
      let numStr = num.toString().split('.')[0]
      if(numStr.length < 6) {
        return numStr
      } else if(numStr.length >= 6 && numStr.length <= 8) {
        return (numStr / 1e4).toFixed(point) + '万'
      } else if(numStr.length > 8) {
        return (numStr / 1e8).toFixed(point) + '亿'
      }
    },
    goToMusicList() {
      wx.navigateTo({url: `/pages/musicList/musicList?id=${this.data.playlist.id}`});
    }
  }
})
