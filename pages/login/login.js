Page({
  data: {

  },
  handleGetUserInfo(e) {
    let userInfo = e.detail.userInfo
    wx.setStorageSync("userInfo", userInfo);
    wx.navigateBack({
      delta: 1
    });
  }
}) 