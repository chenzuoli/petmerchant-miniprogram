// pages/analysis/petcage/petcage/petcage.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {

  },
  repair: function() {
    wx.navigateTo({
      url: '../repair/repair',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  manage: function() {
    wx.navigateTo({
      url: '../manage/manage',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  purchase: function() {
    wx.navigateTo({
      url: '../purchase/purchase',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  upgrade: function() {
    wx.navigateTo({
      url: '../upgrade/upgrade',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  service: function() {
    wx.navigateTo({
      url: '../service/service',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})