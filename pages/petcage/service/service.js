// pages/petcage/service/service.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },
  submit: function() {
    wx.navigateTo({
      url: '../petcage/petcage',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})