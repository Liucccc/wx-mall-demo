//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    swiperList: []
  },
  onLoad: function (ops) {
    var reqTask = wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success: (result) => {
        this.setData({
          swiperList: result.data.message
        })
      }
    });
  }
})
