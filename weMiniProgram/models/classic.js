import HTTP from '../util/http'

class ClassicModel extends HTTP{
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: data => {
        sCallback(data)
      }
    })
  }
}

export default new ClassicModel()
