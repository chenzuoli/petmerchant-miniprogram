// pages/petcage/purchase/purchase.js
var purchase_petcage_url = "https://wetech.top:7553/petcage/merchant/add_petcage"

Page({
  /**
   * Page initial data
   */
  data: {
    token: '',
    checkboxValues: [],
    desc: ""
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    var token = wx.getStorageSync('token')
    this.setData({
      token: token
    })
  },
  checkboxChange: function(e) {
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
  changeDesc: function(e) {
    this.setData({
      desc: e.detail.value
    })
  },
  submit: function() {
    var that = this
    console.log(that.data)
    wx.request({
      url: purchase_petcage_url,
      data: {
        phone: wx.getStorageSync('phone'),
        accessory_ids: that.data.checkboxValues.join(',')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': that.data.token
      }, // 设置请求的 header
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
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
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})