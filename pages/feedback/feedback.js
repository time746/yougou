// miniprogram/pages/order/order.js
import {request} from '../../request/index'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {id: 0, value: "体验问题", isActive: true},
      {id: 1, value: "商品,商家投诉", isActive: false}
    ],
    imgPath: [],
    textInfo: ""
  },
  onShow() {

  },


  //事件监听
  handleTabBarTap(e) {
    let index = e.detail
    //点击后切换标题
    this.changeTabBarItem(index)
  },
  //监听+号的点击
  handleChooseImgTap() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: (result)=>{
        this.setData({
          imgPath: [...this.data.imgPath, ...result.tempFilePaths]
        })
        console.log(this.data.imgPath);
      }
    });
  },
  handleIconTap(e) {
    console.log(e);
    let imgPath = this.data.imgPath
    let index = e.currentTarget.dataset.index
    imgPath.splice(index, 1)
    this.setData({
      imgPath
    })
  },
  handleTextInfoChange(e) {
    this.setData({
      textInfo: e.detail.value
    })
  },

  /* textarea的双向绑定
    点击提交后验证数据是否合法
    如果有图片, 上传图片得到网络路径
    然后发送图片路径和文本
    发送成功返回上一个页面

  */

  handleSubmitTap() {
    let textInfo = this.data.textInfo
    let imgPath = this.data.imgPath
    if (!textInfo.trim()) {
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        duration: 1500,
        mask: true
      });
      return
    }
    imgPath.forEach((item,index) => {
        wx.uploadFile({
        url: 'https://img.abcyun.co/api/upload',
        filePath: item,
        name: "image",
        formData: {
          apitype: 'ali'
        },
        success: (result)=>{
          console.log(result);

          //保存图片
         // ...
          //如果到了最后一张  保存
          // this.setData({

          // })

        }
      });

    })
        
  
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