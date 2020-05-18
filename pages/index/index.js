// pages/index/index.js
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
  analysis: function(){
    wx.navigateTo({
      url: '../analysis/analysis/analysis',
    })
  },
  petcage: function(){
    wx.navigateTo({
      url: '../petcage/petcage/petcage',
    })
  },
  user: function(){
    wx.navigateTo({
      url: '../user/user',
    })
  },
  customer: function(){
    wx.navigateTo({
      url: '../customer/customer',
    })
  },
  order: function(){
    wx.navigateTo({
      url: '../order/order',
    })
  }

})