import KeyWord from '../../models/keyword'
// components/search/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hotWord: Array,
    searchArray: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    history: [],
    searching: false,
    searchVal: ''
  },

  attached() {
    this.getHistory()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getHistory() {
      this.setData({
        history: KeyWord.getHistory()
      })
    },

    onCancel() {
      this.triggerEvent('cancel')
    },

    onConfirm(e) {
      let keyword = e.detail.value || e.detail.text
      if(!keyword) {
        wx.showToast({
          title: '搜索关键字不能为空',
          icon: 'none'
        });

        return;
      }
      KeyWord.addToHistory(keyword)
      this.getHistory()

      this.triggerEvent('search', {keyword})

      this.setData({
        searching: true,
        searchVal: keyword
      })
    },

    onDelete() {
      this.setData({
        searching: false,
        searchVal: ''
      })
      this.triggerEvent('clear')
    },

    onBookTap(e) {
      this.triggerEvent('bookTap', {id: e.target.dataset.id})
    }
  }
})
