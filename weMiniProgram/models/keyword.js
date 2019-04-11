import HTTP from '../util/http-p'

class KeyWordModel extends HTTP {
  key = 'q'

  maxLength = 10

  getHistory() {
    return wx.getStorageSync(this.key) || []
  }

  getHot() {
    return this.request({
      url: 'book/hot_keyword'
    })
  }

  addToHistory(keyword) {
    let history = this.getHistory()
    let index = history.indexOf(keyword)

    if(index < 0) {
      history.unshift(keyword)
    }else if(index === 0) {
      return
    }else{
      history.splice(index, 1)
      history.unshift(keyword)
    }

    if(history.length > this.maxLength) {
      history.pop()
    }

    wx.setStorageSync(this.key, history);
  }

}

export default new KeyWordModel()
