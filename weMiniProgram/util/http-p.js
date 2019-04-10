import {APP_KEY, API_BASE_URL, TIPS} from '../config'
class HTTP{
  request({url, method = 'GET', data = {}}) {
    return new Promise((resolve, reject) => {
      this._request({
        url,
        method,
        data
      }, resolve, reject)
    })
  }

  _request({url, method = 'GET', data}, resolve, reject) {
    
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
          resolve(res.data)
        }else{
          const error_code = res.data.error_code
          this._show_error(error_code)
          reject(error_code)
        }
      },
      fail: err => {
        console.log(err)
        this._show_error()
        reject(err)
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
