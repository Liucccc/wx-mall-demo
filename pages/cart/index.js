import { getSetting, chooseAddress, openSetting } from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart") || [];
    this.setData({
      address
    })
    this.setCart(cart)
  },
  // 点击获取收货地址
  async handleChooseAddress() {
    try {
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      if (scopeAddress === false) {
        await openSetting();
      }
      let address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      wx.setStorageSync("address", address);

    } catch (err) {
      console.log(err);

    }
  },
  // 商品选中
  handleItemChange(e) {
    const goods_id = e.currentTarget.dataset.id;

    let { cart } = this.data;
    let index = cart.findIndex(v => v.goods_id === goods_id);
    cart[index].checked = !cart[index].checked;
    this.setCart(cart)

  },
  // 设置购物车状态同时重新计算底部工具栏数据
  setCart(cart) {
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    })

    allChecked = cart.length != 0 ? allChecked : false;

    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })

    wx.setStorageSync("cart", cart);
  }
})