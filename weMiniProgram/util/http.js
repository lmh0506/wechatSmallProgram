import {APP_KEY, API_BASE_URL, TIPS} from '../config'
class HTTP{

  request({url, method = 'GET', data, success}) {
    
    wx.request({
      url: API_BASE_URL + url,
      method,
      data,
      header: {
        appkey: APP_KEY
      },
      success: res => {
        let code = res.statusCode
        if(code >= 200 && code < 300) {
          success && success(res.data)
        }else{
          this._show_error(res.data.error_code)
        }
      },
      fail: err => {
        console.log(err)
        this._show_error()
      }
    })
  }

  _show_error(error_code = 1) {
    wx.showToast({
      title: TIPS[error_code],
      icon: 'none',
      duration: 2000
    });
  }
}

export default HTTP
