// miniprogram/pages/order/order.js
import {request} from '../../request/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {id: 0, value: "全部订单", isActive: true},
      {id: 1, value: "待付款", isActive: false},
      {id: 2, value: "待发货", isActive: false},
      {id: 3, value: "退款/退货", isActive: false}
    ],
    orders: []
  },
  onShow() {
    
    //在onshow中获取参数需要使用页面栈, 
    let pages =  getCurrentPages();
    let currentPage = pages[pages.length - 1]
    let type = currentPage.options.type
    let token = wx.getStorageSync("token");
    console.log(token);
    // 如果没有token则授权
    if (token == false) {
      wx.navigateTo({
        url: '/pages/auth/auth'
      });
      return
    }
    // 根据第几个按钮点进来的就选中第几个tabbar
    this.changeTabBarItem(type - 1)
    // 获取到全部参数后发送请求, token是无效的 ,下面就不做了
    this.getOrders(token, type)
    
  },
  //网络请求
  async getOrders(url, token, type) {
    let res = await request({
      url: '/my/orders/all',
      header: {Authorization: token},
      data: {type}
    })
    this.setData({
      orders: res.data.message
    })
  },

  //事件监听
  handleTabBarTap(e) {
    let index = e.detail
    //点击后切换标题
    this.changeTabBarItem(index)
    // 点击后发送网络请求 第一个type为1
    this.getOrders(index + 1)
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