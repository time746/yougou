import {
  request
} from '../../request/index'
import {
  debounce
} from '../../utils/utils'

Page({
  data: {
    goodsList: [],
    isShow: false,
    value: ""
  },
  timerId: null,

  onLoad() {

  },
  handleSearchChange(e) {
    let keywords = e.detail.value

    //如果字符串为空
    if (!keywords.trim()) {
      this.timerId && clearTimeout(this.timerId)
      this.setData({
        isShow: true
      })
      return
    }
    //显示按钮
    this.setData({
      isShow: true
    })

    //延时1s后获取数据
    this.timerId && clearTimeout(this.timerId)
    this.timerId = setTimeout(() => {
      this.getGoodsList(keywords)
    }, 1000)

  },
  //取消按钮的点击事件1. 数组清空, input value清空, 清除定时器, 按钮自身隐藏
  handleCancelTap() {
    clearTimeout(this.timerId)
    this.setData({
      value: '',
      goodsList: [],
      isShow: false

    })
  },


  //网络请求
  // 根据关键字获取相应的数据, 并保存
  async getGoodsList(query) {
    let res = await request({
      url: '/goods/qsearch',
      data: {
        query
      }
    })
    console.log(res);
    this.setData({
      goodsList: res.data.message
    })

  }


})