// pages/analysis/analysis/analysis.js
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
  time_dis: function(){
    wx.navigateTo({
      url: '../time_distributed/time_distributed',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  pet_type_dis: function(){
    wx.navigateTo({
      url: '../pet_type/pet_type',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  pet_variety_dis: function(){
    wx.navigateTo({
      url: '../pet_variety/pet_variety',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  user_age_dis: function(){
    wx.navigateTo({
      url: '../user_age/user_age',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  user_gender_dis: function() {
    wx.navigateTo({
      url: '../user_gender/user_gender',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  pet_gender_dis: function(){
    wx.navigateTo({
      url: '../pet_gender/pet_gender',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  petcage_size_usage_dis: function(){
    wx.navigateTo({
      url: '../petcage_size_usage/petcage_size_usage',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  pet_size_dis: function(){
    wx.navigateTo({
      url: '../pet_size/pet_size',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  petcage_power_dis: function(){
    wx.navigateTo({
      url: '../petcage_power/petcage_power',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }

})