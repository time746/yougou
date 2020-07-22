
//promise形式的getSetting
export const getSetting =  () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (result)=>{
        resolve(result)
      },
      fail: (error)=>{
        reject(error)
      }
    });
  })
}

//promise形式的chooseAddress
export const chooseAddress =  () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result)=>{
        resolve(result)
      },
      fail: (error)=>{
        reject(error)
      }
    });
  })
}

//promise形式的openSetting
export const openSetting =  () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (result)=>{
        resolve(result)
      },
      fail: (error)=>{
        reject(error)
      }
    });
  })
}

//promise形式的showModal
export const showModal =  (content="请在确认") => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content: content,
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
          resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}

//promise形式的showToast
export const showToast =  (title) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 1500,
      mask: true,
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}


//promise形式的login
export const login =  (title) => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout:10000,
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}

//promise形式的requestPayment
export const requestPayment =  (paymentParams) => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      ...paymentParams,
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}

export const tt = function () {
  return () => {
    console.log(this);
  }
}

