//index.js
//获取应用实例
const app = getApp()
const data = require('../../utils/data.js')

Page({
  data: {
    bannerArr: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  onLoad: function () {
    this.setData({
      bannerArr: data.getBannerData()
    })
  }
})
