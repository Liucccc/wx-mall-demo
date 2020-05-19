import { login } from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //获得用户信息，存储token
  async handleGetUserInfo(e) {
    try {
      const { encryptedData, rawData, iv, signature } = e.detail;
      const { code } = await login();
      const loginParams = { encryptedData, rawData, iv, signature, code };
      const { token } = await request({ url: "/users/wxlogin", data: loginParams, method: "POST" });
      wx.setStorageSync("token", token);
      wx.navigateBack({
        delta: 1
      });
    } catch (error) {
      console.log(error);
      //没有企业账号，模拟
      wx.setStorageSync("token", "Bearer 11111");
      wx.navigateBack({
        delta: 1
      });

    }
  }
})