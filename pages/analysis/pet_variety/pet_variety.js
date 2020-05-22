var wxCharts = require('../../../wxcharts/wxcharts.js');
var pieChart = null;
var pet_variety_dis_url = "https://localhost:7553/petcage/merchant/pet_variety_dis"
Page({
  data: {
    pet_variety_data: []
  },
  touchHandler: function (e) {
    console.log(pieChart.getCurrentDataIndex(e));
  },
  onLoad: async function (e) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    await this.getData();

    pieChart = new wxCharts({
      animation: true,
      canvasId: 'pieCanvas',
      type: 'pie',
      series: this.data.pet_variety_data,
      width: windowWidth,
      height: 300,
      dataLabel: true,
    });
  },
  getData: function () {
    var that = this
    let token = wx.getStorageSync("token");
    return new Promise((resolve, reject) => {
      wx.request({
        url: pet_variety_dis_url,
        data: {},
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "token": token
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: (result) => {
          console.log(result.data)
          that.setData({
            pet_variety_data: result.data.data
          })
          resolve(result)
        },
        fail: (err) => {
          reject(err)
        },
        complete: () => { }
      });
    })
  },
  updateData: function () {
    var that = this
    that.getData()
  }
});