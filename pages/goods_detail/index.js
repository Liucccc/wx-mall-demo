import { request } from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },
  GoodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options;
    this.getGoodsDetail(goods_id);
  },
  // 商品详情
  async getGoodsDetail(goods_id) {
    const res = await request({ url: "/goods/detail", data: { goods_id } })
    this.GoodsInfo = res;
    this.setData({
      goodsObj: {
        pics: res.pics,
        goods_price: res.goods_price,
        goods_name: res.goods_name,
        goods_introduce: res.goods_introduce.replace(/\.webp/g, '.jpg')
      }
    })
  },
  // 轮播图点击查看大图
  handlePreviewImage(e) {
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
    let current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });
  },
  // 添加到购物车
  handleCartAdd() {
    let cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
    if (index === -1) {
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true
      cart.push(this.GoodsInfo);
    } else {
      cart[index].num++;
    }

    wx.setStorageSync("cart", cart);

    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    });
  }
})