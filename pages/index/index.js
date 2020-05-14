import { request } from '../../request/index.js'

Page({
  data: {
    // 轮播图
    swiperList: [],
    // 分类
    catesList: [],
    // 楼层
    floorList: []
  },
  onLoad: function (ops) {
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
  },
  // 获取轮播图
  getSwiperList() {
    request({
      url: '/home/swiperdata'
    }).then(result => {
      this.setData({
        swiperList: result
      })
    });
  },
  // 获取分类导航
  getCatesList() {
    request({
      url: '/home/catitems'
    }).then(result => {
      this.setData({
        catesList: result
      })
    });
  },
  // 楼层
  getFloorList() {
    request({
      url: '/home/floordata'
    }).then(result => {
      this.setData({
        floorList: result
      })
    });
  }
})
