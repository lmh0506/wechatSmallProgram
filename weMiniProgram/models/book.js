import HTTP from '../util/http-p'

class BookModel extends HTTP{
  getHotList() {
    return this.request({
      url: 'book/hot_list'
    })
  }

  search(start, q) {
    return this.request({
      url: 'book/search?summary=1',
      data: {
        q,
        start
      }
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

  postComment(book_id, content) {
    return this.request({
      url: 'book/add/short_comment',
      method: 'POST',
      data: {
        book_id,
        content
      }
    })
  }

}

export default new BookModel()
