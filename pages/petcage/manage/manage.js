// pages/petcage/manage/manage.js
var get_petcage_list = "https://pipilong.pet:7553/petcage/merchant/petcage_list"

Page({
  /**
   * Page initial data
   */
  data: {
    listData: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    var that = this
    let token = wx.getStorageSync("token")

    wx.request({
      url: get_petcage_list,
      data: {
        phone: wx.getStorageSync("phone")
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "token": token
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        if (res.data.status = '200') {
          that.setData({
            listData: res.data.data,
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})