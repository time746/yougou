import {getSetting, chooseAddress, openSetting, showModal, showToast, requestPayment} from '../../utils/asyncWx'
import {request} from '../../request/index.js'

Page({
  data: {
    address: {},
    goodsCount: 0,
    totalPrice: 0,
    cartList: []
  },
  onShow() {
    let address = wx.getStorageSync("address") || {};
    let cartList = wx.getStorageSync("cartList") || []
    cartList = cartList.filter(item => {
      return item.checked === true
    })
    this.setData({
      address
    })
    this.setCart(cartList)
    
  },
  // 事件处理
  //处理结算的点击
  async handleOrderPay() {
    try {
      let token = wx.getStorageSync("token");
      //如果没有token 则取相应页面获取
      if (token == false) {
        wx.navigateTo({
          url: '/pages/auth/auth'
        });
        return
      }
      // 如果有就创建订单
      //根据token获取订单编号
      let Authorization = token
      let order_price = this.data.totalPrice
      let consignee_addr = this.data.address.whole
      let goods = []
      let cartList = this.data.cartList
      cartList.forEach(item => {
        goods.push({
          goods_id: item.goods_id,
          goods_number: item.goods_number,
          goods_price: item.goods_price
        })
      })
      
      const orderParams = {order_price, consignee_addr, goods}
      let res1 = await request({
        url: '/my/orders/create',
        method: 'POST',
        header: {Authorization},
        data: orderParams
      })
      
      let order_number = res1.data.message.order_number
      console.log(order_number);
      //根据订单编号获取微信支付需要的参数
      let res2 = await request({
        url: '/my/orders/req_unifiedorder',
        method: 'POST',
        header: {Authorization},
        data: {order_number}
      })
      let paymentParams = res2.data.message.pay
      
      
      // 得到参数后拉起支付
      await requestPayment(paymentParams)
      //根据订单号去后台获取订单的状态
      let res3 = await request({
        url: '/my/orders/chkOrder',
        method: 'post',
        header: {Authorization},
        data: {order_number}
      })
      //支付成功显示toast 并且将支付了的商品删除
      await showToast("支付成功")
      
      let newCart = this.data.cartList
      newCart = newCart.filter(item => {
        return item.checked == false
      })
      wx.setStorageSync("cartList", newCart);
      // 之后返回购物车
      wx.navigateTo({
        url: '/pages/order/order'
      })

    } catch (err) {
      //失败后跳转回购物车,记得使用switchTab
      await showToast("支付失败")
      wx.switchTab({
        url: '/pages/cart/cart'
      });
      console.log(err);
    }
  },

  //函数封装
  //重新渲染底部工具栏(保存新的数据到data中), 保存新的购物车数据到storage

  
  setCart(cartList) {
    let allChecked = cartList.every(item => {
      return item.checked === true
    })
    if (cartList.length === 0) {
      allChecked = false
    }
    let goodsCount = 0
    let totalPrice = 0
    cartList.forEach(item => {
      if (item.checked) {
        //有的商品选择多个
        goodsCount += item.num
        totalPrice += item.goods_price
      }
    })
    
    this.setData({
      cartList,
      goodsCount,
      totalPrice
    })
  }
  
}); 
