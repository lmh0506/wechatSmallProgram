import HTTP from '../util/http-p'

class BookModel extends HTTP{
  getHotList() {
    return this.request({
      url: 'book/hot_list'
    })
  }

  getDetail(id) {
    return this.request({
      url: `book/${id}/detail`
    })
  }

  getLikeStatus(id) {
    return this.request({
      url: `book/${id}/favor`
    })
  }

  getComments(id) {
    return this.request({
      url: `book/${id}/short_comment`
    })
  }

  getMyBookCount() {
    return this.request({
      url: 'book/favor/count'
    })
  }
}

export default new BookModel()
