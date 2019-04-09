import HTTP from '../util/http'

class LikeModel extends HTTP{
  like(data) {
    let url = data.isLike ? 'like' : 'like/cancel'
    this.request({
      url,
      method: 'POST',
      data
    })
  }

  getClassicLikeStatus(artID, category, sCallback) {
    this.request({
      url: 'classic/' + category + '/' + artID + '/favor',
      success: sCallback
    })
  }
}

export default new LikeModel()
