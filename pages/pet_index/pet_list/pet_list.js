// pages/pet_index/pet_list/pet_list.js
const app = getApp();
var get_user_pets_url = 'https://wetech.top:7443/petcage/get_user_pets'
var add_order = 'https://wetech.top:7443/petcage/add_order'

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    pets: [],
    device_id: ""
  },
  onLoad(options) {
    var that = this

    that.setData({
      device_id: options.device_id
    });
    console.log("获取的设备id为：")
    console.log(that.data.device_id)
    // 查询宠物列表
    let open_id = wx.getStorageSync("open_id");
    console.log("open_id: " + open_id)
    wx.request({
      url: get_user_pets_url + "?open_id=" + open_id,
      data: {},
      header: { 'content-type': 'application/json' },
      method: 'post',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        console.log(result)
        that.setData({
          pets: result.data.data
        })
      },
      fail: () => { },
      complete: () => { }
    });
  },
  isCard(e) {
    this.setData({
      isCard: e.detail.value
    })
  },
  async pet_desc(e) {
    var that = this

    console.log("点击宠物图片事件，携带参数：")
    var pet_id = e.currentTarget.dataset.id.id
    console.log(pet_id)

    var navigate_url = '../info/index?pet_id=' + pet_id
    if (that.data.device_id != null) {
      navigate_url = '../../bluetooth_v4/bluetooth_v4?pet_id=' + pet_id
      await that.order_add(e)
    }
    console.log("navigate to page: " + navigate_url)
    that.to(navigate_url)
  },
  add_pet() {
    var that = this
    wx.navigateTo({
      url: '../pet_add/pet_add?device_id=' + that.data.device_id,
      success: (result) => {
        console.log("跳转到宠物添加页面成功")
      },
      fail: (err) => {
        console.log("跳转到宠物添加页面失败")
        console.log(err)
      },
      complete: () => { }
    });
  },
  order_add(e) {
    var that = this
    console.log("选择已有宠物，添加订单：")
    console.log(e)
    let open_id = wx.getStorageSync("open_id")
    console.log("open_id: " + open_id)

    var order_id = that.guid()
    // 添加订单
    return new Promise((resolve, reject) => {
      wx.request({
        url: add_order + 
          "?order_id=" + order_id + 
          "&phone=" + e.currentTarget.dataset.id.contact + 
          "&open_id=" + open_id + 
          "&device_id=" + that.data.device_id +
          "&pet_id=" + e.currentTarget.dataset.id.id,
        method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/json'
        }, // 设置请求的 header
        success(res) {
          if (res.data > 0) {
            console.log("创建订单成功")
            // 把订单id带回上一页
            var pages = getCurrentPages();
            var currPage = pages[pages.length - 1]; //当前页面
            var prevPage = pages[pages.length - 2]; //上一个页面
            //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
            prevPage.setData({
              order_id: order_id
            })
            wx.setStorageSync('order_id', order_id)
            // wx.navigateBack({
            //   delta: 1
            // })
          } else {
            console.log("创建订单失败")
            wx.showToast({
              title: '服务器错误，请重试！',
              icon: 'warn',
              duration: 2000
            })
          }
          console.log(res)
          resolve(res)
        },
        fail(err) {
          console.log(err)
          reject(err)
        }
      })
    })
  },
  to(navigate_url) {
    wx.navigateTo({
      url: navigate_url,
      success: (result) => {
        console.log("跳转宠物详细页面成功")
        console.log(result)
      },
      fail: (err) => {
        console.log("跳转宠物详情页面失败")
        console.log(err)
      },
      complete: () => { }
    });
  },
  //用于生成uuid
  s4: function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  },
  guid: function () {
    return (this.s4() + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + this.s4() + this.s4());
  },
})
