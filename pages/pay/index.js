import regeneratorRuntime from '../../lib/runtime/runtime';
import {
  request
} from '../../request/index.js'
import {
  showModal
} from "../../utils/asyncWx.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const address = wx.getStorageSync("address");
    let cart = wx.getStorageSync("cart") || [];
    cart = cart.filter(v => v.checked);
    this.setData({
      address
    })
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    })
    this.setData({
      cart,
      totalPrice,
      totalNum
    })
  },
  //结算
  async handleOrderPay() {
    try {
      const token = wx.getStorageSync("token");
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index'

        });
        return;
      }
      const order_price = this.data.totalPrice;
      const consignee_addr = this.data.address.all;
      let cart = this.data.cart;
      let goods = [];
      cart.forEach(v => goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      }));
      const orderParams = {
        order_price,
        consignee_addr,
        goods
      }
      const res = await request({
        url: "/my/orders/create",
        method: "POST",
        data: orderParams
      })

      let newCart = wx.getStorageSync("cart");
      newCart = newCart.filter(v => !v.checked);
      wx.setStorageSync("cart", newCart);

      await showModal({
        content: "没有企业账号，支付成功"
      })
      wx.navigateTo({
        url: '/pages/order/index?type=1'
      });

    } catch (error) {
      console.log(error);
      await showModal({
        content: "没有企业账号，支付失败"
      })
      wx.navigateTo({
        url: '/pages/order/index?type=1'
      });
    }
  }
})