// pages/petcage/purchase/purchase.js
var purchase_petcage_url = "https://pipilong.pet:7553/petcage/merchant/add_petcage"

Page({
  /**
   * Page initial data
   */
  data: {
    token: '',
    checkboxValues: [],
    radioboxValue: "",
    desc: ""
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('token')
    this.setData({
      token: token
    })
  },
  checkboxChange: function (e) {
    console.log(e)
    var _value = e.detail.value;
    if (_value.length == 0) {
      this.setData({
        checkboxValues: [],
      })
    } else {
      this.setData({
        checkboxValues: _value,
      })
    }
  },
  radioboxChange: function (e) {
    console.log(e)
    var _value = e.detail.value;
    if (_value.length == 0) {
      this.setData({
        radioboxValue: "",
      })
    } else {
      this.setData({
        radioboxValue: _value,
      })
    }
  },
  changeDesc: function (e) {
    this.setData({
      desc: e.detail.value
    })
  },
  submit: async function () {
    var that = this
    console.log(that.data)
    let phone = wx.getStorageSync('phone')
    if (phone == '') {
      await that.login()
    }
    await that.purchase()
  },
  login: function () {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: '你还未登录',
        content: '登录后才能购买',
        showCancel: true,
        cancelText: '放弃购买',
        cancelColor: '#000000',
        confirmText: '立即登录',
        confirmColor: '#3CC51F',
        success: (result) => {
          if (result.confirm) {
            wx.navigateTo({
              url: '../../login/login',
              success: (result) => {

              },
              fail: () => { },
              complete: () => { }
            });
          }
          resolve(result)
        },
        fail: (err) => { reject(err) },
        complete: () => { }
      });
    })

  },
  purchase: function () {
    var that = this
    return new Promise((resolve, reject) => {
      wx.request({
        url: purchase_petcage_url,
        data: {
          phone: phone,
          accessory_ids: that.data.checkboxValues.join(','),
          size: that.data.radioboxValue
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'token': that.data.token
        }, // 设置请求的 header
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          console.log(res)
          if (res.status = '200') {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000
            })
            wx.navigateTo({
              url: '../petcage/petcage',
            })
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'warn',
              image: '',
              duration: 1500,
              mask: false,
              success: (result) => {

              },
              fail: () => { },
              complete: () => { }
            });
          }
          resolve(res)
        },
        fail: function (res) {
          reject(res)
        },
        complete: function (res) { },
      })
    })
  }
})