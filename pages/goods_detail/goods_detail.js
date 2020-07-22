const { request } = require("../../request/index")
import {showToast} from '../../utils/asyncWx'

// miniprogram/pages/goods_detail/goods_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {},
    isCollect: false
  },
  goodsDetail: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages = getCurrentPages()
    let currentPage = pages[pages.length  - 1]
    
    let options = currentPage.options
    // console.log(options);
    this.getGoodsDetail(options.goods_id)
    //测试,先固定id
    // this.getGoodsDetail(43986)
    //查看当前商品是否被收藏 ,写在网络请求中

  },


  //网络请求 
  async getGoodsDetail(goodsId) {
    let res = await request({
      url: '/goods/detail',
      data: {goods_id: goodsId}
    })
    let goodsDetail = res.data.message
    this.goodsDetail = goodsDetail

    //查看改商品是否收藏
    let collectList = wx.getStorageSync("collectList") || [];

    let isCollect = collectList.some(item => {
      return item.goods_id == goodsId
    })
    
    // 只保存需要的数据
    this.setData({
      goodsDetail: {
        goods_name: goodsDetail.goods_name,
        goods_price: goodsDetail.goods_price,
        pics: goodsDetail.pics,
        //有些手机无法识别webp格式图片
        goods_introduce: goodsDetail.goods_introduce.replace(/\.webp/g, ".jpg"),
        goods_id: goodsId
      },
      isCollect
    }) 

  },
  //事件处理
  handleSwiperItemTap(e) {
    let urls = this.goodsDetail.pics.map(item => {
      return item.pics_mid
    })
    let {index} = e.currentTarget.dataset
    // console.log(urls);
    // console.log(e);
    wx.previewImage({
      current: urls[index],
      urls
    });
  },
  handleAddCart() {
    //先去缓存获取
    let cartList = wx.getStorageSync('cartList') || [];
    let index = cartList.findIndex(item => {
      return item.goods_id === this.goodsDetail.goods_id
    })

    console.log(index);
    if (index === -1) {
      this.goodsDetail.num = 1
      this.goodsDetail.checked = true
      cartList.push(this.goodsDetail)
    } else {
      cartList[index].num++
    }
    //修改号后重新赋值
    wx.setStorageSync("cartList", cartList);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true,
    });
  },
  //处理收藏按钮
  handleCollectTap() {
    //获取收藏的数组, 看有没有当前商品
    let collectList = wx.getStorageSync("collectList") || [];
    
    let goodsId = this.goodsDetail.goods_id
    let index = collectList.findIndex(item => {
      return item.goods_id === goodsId
    })
    
    let isCollect = index === -1 ? false : true
    // 如果有则删除, isCollect改为false
    if (isCollect) {
      collectList.splice(index, 1)
      isCollect = false
      showToast("取消收藏成功")

    } else {
      //如果没有则添加
      collectList.push(this.goodsDetail)
      isCollect = true
      showToast("收藏成功")
    }
    //修改data中的isCollect , 保存新的收藏数组到缓存中
    this.setData({
      isCollect
    })
    wx.setStorageSync("collectList", collectList);
  }
})