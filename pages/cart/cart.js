import {getSetting, chooseAddress, openSetting, showModal, showToast} from '../../utils/asyncWx'

Page({
  data: {
    address: {},
    allChecked: false,
    goodsCount: 0,
    totalPrice: 0,
    cartList: []
  },
  onShow() {
    let address = wx.getStorageSync("address") || {};
    let cartList = wx.getStorageSync("cartList") || []
    this.setData({
      address
    })
    this.setCart(cartList)
  },
  // 事件处理
  async handleAddressTap() {
    let res1 = await getSetting()
    let scopeAddress = res1.authSetting["scope.address"]
    if (scopeAddress === false) {
      await openSetting()
    }
    try {
      let address = await chooseAddress()
      address.whole = address.provinceName + address.cityName + address.countyName + address.detailInfo
      wx.setStorageSync("address", address);
    } catch (error) {
      console.log(error);
      
    }
    
  },
  handleItemTap(e) {

    let goodsId = e.currentTarget.dataset.goodsid
    let cartList = this.data.cartList
    let index = cartList.findIndex(item => {
      return item.goods_id === goodsId
    })
    cartList[index].checked = !cartList[index].checked
    wx.setStorageSync("cartList", cartList);
    this.setCart(cartList)
  },
  handleCheckAllTap() {
    let cartList = this.data.cartList
    let allChecked = !this.data.allChecked
    cartList.forEach(item => {
      item.checked = allChecked
    })
    this.setCart(cartList)
  },
  //处理商品数量的加减
  async handleItemCount(e) {
    let {goodsid, operation} = e.currentTarget.dataset
    let cartList = this.data.cartList
    let index = cartList.findIndex(item => {
      return item.goods_id === goodsid
    })

    if (cartList[index].num === 1 && operation === -1) {
      let res = await showModal("你确定要删除吗")
      if (res.confirm) {
        cartList.splice(index,1)
        this.setCart(cartList)
      }
    } else {
      cartList[index].num += operation
      this.setCart(cartList)
    }
    
  },
 handlePay() {
    let {address, goodsCount} = this.data
    if (address.whole === undefined) {
      showToast("你还没有设置收货地址")
    } else if (goodsCount === 0) {
      showToast("你还没有选择商品")
    } else {
      wx.navigateTo({
        url: '/pages/pay/pay'
      });
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
      allChecked,
      goodsCount,
      totalPrice
    })
    wx.setStorageSync("cartList", cartList);
  }
});






/*
//事件处理
handleAddressTap() {
  //获取权限状态
  wx.getSetting({
    success: (result)=>{
      let scopeAddress = result.authSetting["scope.address"]
      // console.log(scopeAddress);
      //如果有权限或者之前没有点击过
      if (scopeAddress === true || scopeAddress === undefined) {
        wx.chooseAddress({
          success: (result)=>{
            console.log(result);
          }
        });
        // 如果之前拒绝了
      } else {
        wx.openSetting({
          success: (result)=>{
            console.log(result);
          }
        });
      }
    }
  });
}

*/