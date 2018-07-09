
const api = {
  showToast(flag) {
    if (flag) {
      wx.showToast({
        title: '到达底部了',
      })
    }
  }, 
  show(flag) {
    if (flag) {

      wx.showModal({
        title: 'modal',
        content: 'modalContent',
      })
    }
  }
}

module.exports = api
