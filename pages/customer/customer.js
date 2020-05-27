// pages/customer/customer.js
var get_order_list = "https://pipilong.pet:7553/petcage/merchant/order_list"
var util = require('../../utils/util.js')

Page({

  /**
   * Page initial data
   */
  data: {
    allData:[],
    listData: [],
    now: "",
    date: "日期筛选",
    token: ""
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    var that = this
    token = wx.getStorageSync("token")
    that.setData({
      token: token
    })

    const formatTime = util.formatTime(new Date())
    console.log("now: " + formatTime)
    that.setData({
      now: formatTime
    })

    wx.request({
      url: get_order_list,
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
            allData: res.data.data
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  search: function(e) {
    console.log(e)
    var that = this
    var phone = e.detail.value.phone
    var date = e.detail.value.date
    var data = that.data.allData
    var newListData = []
    for(var i = 0; i < data.length; i++) {
      var phone_search = data[i].phone.search(phone)
      var date_search = data[i].start_time.search(date)
      if(phone_search != -1 && date_search != -1) {
        newListData.push(data[i])
      }
    }
    that.setData({
      listData: newListData
    })
  }
})