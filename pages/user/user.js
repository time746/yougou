// miniprogram/pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    collectCount: 0
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow() {
    let userInfo = wx.getStorageSync("userInfo");
    let collectList = wx.getStorageSync("collectList");
    this.setData({
      userInfo,
      collectCount: collectList.length
    })
  }
})