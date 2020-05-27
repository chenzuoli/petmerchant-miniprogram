var wxCharts = require('../../../wxcharts/wxcharts.js');
var time_distributed_url = "https://pipilong.pet:7553/petcage/merchant/time_distributed_charts";
var app = getApp();
var lineChart = null;
var token = '';
Page({
  onShareAppMessage: function(res) {
    return {
      title: '宠笼使用时间分布',
      path: '/pages/index/index',
      success: function() {},
      fail: function() {}
    }
  },
  data: {
    day: [],
    week: [],
    month: []
  },
  onLoad: async function() {
    await this.getData();
    this.chart();
  },
  getData: function() {
    var that = this
    token = wx.getStorageSync("token")
    var day = []
    var week = []
    var month = []
    return new Promise((resolve, reject) => {
      wx.request({
        url: time_distributed_url,
        data: '',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "token": token
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          console.log(res.data)
          let days = res.data.data.day
          let weeks = res.data.data.week
          let months = res.data.data.month
          for (var key in days) {
            day.push(days[key])
          }
          for (var key in weeks) {
            week.push(weeks[key])
          }
          for (var key in months) {
            month.push(months[key])
          }
          console.log(day)
          console.log(week)
          console.log(month)
          that.setData({
            day: day,
            week: week,
            month: month
          })
          resolve(res)
        },
        fail: function(res) {
          console.log(res)
          reject(res)
        },
        complete: function(res) {},
      })
    })
  },
  updateData: async function() {
    await this.getData();
  },
  chart: function() {
    var that = this
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: ['1', '2', '3', '4', '5', '6', '7'],
      series: [{
        name: '日',
        data: that.data.day,
        format: function(val) {
          return val.toFixed(2) + '次';
        }
      }, {
        name: '周',
        data: that.data.week,
        format: function(val) {
          return val.toFixed(2) + '次';
        }
      }, {
        name: '月',
        data: that.data.month,
        format: function(val) {
          return val.toFixed(2) + '次';
        }
      }],
      yAxis: {
        title: '使用次数（次）',
        format: function(val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: 320,
      height: 150
    });
  }

});