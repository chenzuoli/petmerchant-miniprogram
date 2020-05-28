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
  user_index: function() {
    wx.navigateTo({
      url: '../user_index/index/index',
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
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