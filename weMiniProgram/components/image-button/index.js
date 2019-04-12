// components/image-button/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    openType: String
  },

  options: {
    // 启用slot
    multipleSlots: true
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGetUserInfo(e) {
      this.triggerEvent('getUserInfo', e.detail)
    }
  }
})
