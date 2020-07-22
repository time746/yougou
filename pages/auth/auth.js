import { login } from '../../utils/asyncWx.js'
import {request} from '../../request/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //事件处理
  async handleGetUserInfo(e) {
    // 获取token 这里直接固定
    /*
    const {encryptedData, rawData, iv, signature} = e.detail
    let res = await login()
    const code = res.code
    let loginParams = {encryptedData, rawData, iv, signature, code}
    let res2 = await request({
      url: '/users/wxlogin',
      data: loginParams,
      methods: 'post'
    })
    */
    let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
    wx.setStorageSync("token", token);
    wx.navigateBack({
      delta: 1
    });
  }
})