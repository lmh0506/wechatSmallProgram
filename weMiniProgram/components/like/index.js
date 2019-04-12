// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count: {
      type: Number,
      value: 0
    },
    isLike: {
      type: Boolean,
      value: false
    },
    readOnly: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: './images/like.png',
    noSrc: './images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(e) {
      if(!this.properties.readOnly){
        let count = this.data.count
        count = this.data.isLike ? count === 0 ? count : --count : ++ count
        this.setData({
          count,
          isLike: !this.data.isLike
        })
        // 自定义事件
        this.triggerEvent('like', {
          count,
          isLike: this.data.isLike
        })
      }
    }
  }
})
