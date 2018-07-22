//index.js
//获取应用实例
const app = getApp()
const data = require('../../utils/data.js')

Page({
  data: {
    bannerArr: [],
    navIcons: [],
    sectionItems: [],
    color: ['red', 'orange', 'yellow', 'green', 'purple'],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    curNavId: 1,
    navIndex: 0
  },
  onLoad: function () {
    wx.showToast({
      title: '正在加载。。。',
      icon: 'loading',
      mask: true
    })
    this.setData({
      bannerArr: data.getBannerData(),
      navIcons: data.getIndexNavData(),
      sectionItems: data.getIndexNavSectionData()
    }, () => {
      wx.hideToast()
    })
  },
  navClick(e) {
    this.setData({
      curNavId: e.currentTarget.dataset.id,
      navIndex: e.currentTarget.dataset.index
    })
  },
  loadMore(e) {
    console.log(e, '到底了')
    let index = this.data.navIndex;
    let cur_section = this.data.sectionItems[index].concat(data.getIndexNavSectionData()[index])
    let sectionItems = this.data.sectionItems.slice()
    sectionItems[index] = cur_section
    console.log(sectionItems)
    this.setData({
      sectionItems 
    })
  },
  navgitDetail(e) {
    console.log(e)
    let item = e.currentTarget.dataset.item;
    console.log(item)
    wx.navigateTo({
      url: `/pages/detail/detail?img=${item.civerpath}&subject=${item.subject}&price=${item.price}&message=${item.message}`,
      success() {
        wx.showNavigationBarLoading()
        wx.setNavigationBarTitle({
          title: '详情页',
        })
      }
    })
  },
  navgitBook(e) {
    console.log(e)
    let item = e.currentTarget.dataset.item;
    console.log(item)
    wx.navigateTo({
      url: `/pages/book/book?img=${item.civerpath}&subject=${item.subject}&price=${item.price}&message=${item.message}`,
      success() {
        wx.showNavigationBarLoading()
        wx.setNavigationBarTitle({
          title: '预约渠道',
        })
      }
    })
  }
})
