import { request } from '../../request/index'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    subGoods: [],
    currentIndex: 0,
    scrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断缓存中是否有数据
    let savegoods = wx.getStorageSync("category")
    if (savegoods) {
      if (Date.now() - savegoods.time > 1000*100) {
        this.getCategory()
      } else {
        this.setData({
          goods: savegoods.data,
          subGoods: savegoods.data[0].children
        })
      }
    } else {
      this.getCategory()
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 网络请求
  getCategory() {
    request({
      url: '/categories'
    }).then(res => {
      // 将数据存储在缓存
      wx.setStorageSync("category", {time:Date.now(),data: res.data.message})
      this.setData({
        goods: res.data.message,
        subGoods: res.data.message[0].children
      })
    })
  },

  // 事件
  categoryTap(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      currentIndex: index,
      subGoods: this.data.goods[index].children,
      scrollTop: 0
    })
  }
})