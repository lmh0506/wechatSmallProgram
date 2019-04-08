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
}

export default new LikeModel()
