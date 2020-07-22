import {request} from "../../request/index.js"


Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {id: 0, value: "综合", isActive: true},
      {id: 1, value: "销量", isActive: false},
      {id: 2, value: "价格", isActive: false}
    ],
    goodsList: [],
    totalPage: 1,
  },
  queryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryParams.cid = options.c_id || ""
    this.queryParams.query = options.query || ""
    //测试
    // this.queryParams.cid = 5
    this.getGoodsList()
    this.queryParams.pagenum++
    
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
    this.queryParams.pagenum = 1
    this.setData({
      goodsList: []
    })
    this.getGoodsList()
    this.queryParams.pagenum++
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.queryParams.pagenum > this.data.totalPage) {
      wx.showToast({title: '没有下一页数据了'});
    } else {
      this.getGoodsList()
      this.queryParams.pagenum++
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  tabBarTap(e) {
    let index = e.detail
    let {tabs} = this.data
    tabs.forEach((item, i) => {
      if (index == i) {
        item.isActive = true
      }else {
        item.isActive = false
      }
    })
    this.setData({
      tabs
    })

  },
  async getGoodsList() {
    let res = await request({
      url: '/goods/search',
      data: this.queryParams
    })
    let goodsData = res.data.message
    let totalPage = Math.ceil(goodsData.total/this.queryParams.pagesize)
    this.setData({
      goodsList: [...this.data.goodsList, ...goodsData.goods],
      totalPage: totalPage
    })
    //关闭下拉动画
    wx.stopPullDownRefresh()
  }
})