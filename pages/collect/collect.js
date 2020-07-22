// miniprogram/pages/order/order.js
import {request} from '../../request/index'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {id: 0, value: "商品收藏", isActive: true},
      {id: 1, value: "品牌收藏", isActive: false},
      {id: 2, value: "店铺收藏", isActive: false},
      {id: 3, value: "浏览足迹", isActive: false}
    ],
    collectList: []
  },
  onShow() {
    let collectList = wx.getStorageSync("collectList") || [];
    this.setData({
      collectList
    })
  },


  //事件监听
  handleTabBarTap(e) {
    let index = e.detail
    //点击后切换标题
    this.changeTabBarItem(index)
  },

  //方法封装
  changeTabBarItem(index) {
    let tabs = this.data.tabs
    tabs.forEach((item, i) => {
      if (i === index) {
        item.isActive = true
      } else {
        item.isActive = false
      }
    })
    this.setData({
      tabs
    })
  },
  

})