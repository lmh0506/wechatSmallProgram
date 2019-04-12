import HTTP from '../util/http'

class ClassicModel extends HTTP{
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: data => {
        sCallback(data)
        this._setLatesIndex(data.index)
        wx.setStorageSync(this._getKey(data.index), data);
      }
    })
  }

  getClassic(index, nextOrPrevious, sCallback) {
    let key = nextOrPrevious === 'next' ?
              this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if(!classic) {
      this.request({
        url: 'classic/' + index + '/' + nextOrPrevious,
        success: data => {
          sCallback(data)
          wx.setStorageSync(this._getKey(data.index), data);
        }
      })
    }else{
      sCallback(classic)
    }          
    
  }

  getMyClassics(sCallback) {
    this.request({
      url: 'classic/favor',
      success: data => {
        sCallback(data)
      }
    })
  }

  isFirst(index) {
    return index === 1
  }

  isLatest(index) {
    return index === this._getLatesIndex()
  }

  _setLatesIndex(index) {
    wx.setStorageSync('latest', index)
  }

  _getLatesIndex() {
    return wx.getStorageSync('latest')
  }

  _getKey(index) {
    return 'classic-' + index 
  }
}

export default new ClassicModel()
