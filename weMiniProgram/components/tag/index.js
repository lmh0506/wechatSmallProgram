// components/tag/index.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    // 启用slot
    multipleSlots: true
  },
  // 引入外部传入的样式类
  externalClasses: ['tag-class'],
  properties: {
    text: String
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
    
    onTap() {
      this.triggerEvent('tapping', {
        text: this.properties.text
      })
    },
  }
})
