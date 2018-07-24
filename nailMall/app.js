//app.js
App({
  onLaunch: function () {
    
  },
  getUserInfo(cb) {
    let that = this;
    if(this.globalData.userInfo){
      typeof cb === 'function' && cb(this.globalData.userInfo)
    }else{
      wx.login({
        success(res) {
          wx.getUserInfo({
            success(res) {
              console.log(res)
              that.globalData.userInfo = res.userInfo
              typeof cb === 'function' && cb(that.globalData.userInfo)
            },
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null
  }
})