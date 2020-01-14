//获取应用实例

var network_util = require('../../utils/network.js');
var util = require('../../utils/util.js');

const app = getApp()
var location;
var isOpenSetting = false;
var longi;
var lat;
Page({
  data: {
    location: '上海市',
    hasRefresh: false,
    nowBackGround: [100, 8],
    nowTemperature: '0 ℃',
    nowWind: '晴/东北风  微风',
    nowAir: '',
    hourlyArr: [],
    dailyForecast: [],
    lifeStyle: [],
    week: ''
  },
  gotest: function() {
    wx.navigateTo({
      url: '../scrollView/scrollView',
    })
  },
  //天气接口
  Weather: function(lat, longi) {
    var _this = this;
    //数据集合
    var url = "https://free-api.heweather.com/s6/weather";
    var airUrl = "https://free-api.heweather.com/s6/air/now";
    var ipUrl = "https://tianqiapi.com/ip";
    var param = {};

    console.log(app.globalData.ip);
    var data = {
      key: "bff5cc9bcfdf46b0a0e9bf0c260ff14f",
      location: location ? longi + "," + lat : "shanghai",
      lang: "zh",
      unit: "m"
    };
    network_util._get(url, data, function (res) {
      // console.log(res.data.HeWeather6[0])
      var now = res.data.HeWeather6[0].now;
      var hourly = res.data.HeWeather6[0].hourly;
      var daily = res.data.HeWeather6[0].daily_forecast;
      var lifestyle = res.data.HeWeather6[0].lifestyle;
      _this.setData({
        nowBackGround: [now.cond_code, now.tmp],
        nowTemperature: now.tmp + "℃", 
        nowCondition: now.cond_txt,
        nowWind: now.wind_dir + "   " + now.wind_sc + "级",
        hourlyArr: hourly,
        dailyForecast: daily,
        lifeStyle: [lifestyle[2], lifestyle[1], lifestyle[6], lifestyle[5]],
        lifeMore: [lifestyle[0], lifestyle[3], lifestyle[4], lifestyle[7]]
      })
    }, function (res) {

    }, function () {
      // 数据成功后，停止下拉刷新
      wx.stopPullDownRefresh();
      wx.hideLoading()
    });
    //空气质量请求
    data = {
      key: "bff5cc9bcfdf46b0a0e9bf0c260ff14f",
      location: _this.data.desc,
      lang: "zh",
      unit: "m"
    };
    network_util._get(airUrl, data, function(res) {
      console.log(res.data)
      var nowAirCity = res.data.HeWeather6[0].air_now_city;
      _this.setData({
        nowAir: "空气质量"  + " " + nowAirCity.qlty,
        main: "主要污染物" + " " + nowAirCity.main,
        density: [nowAirCity.pm10, nowAirCity.pm25, nowAirCity.no2, nowAirCity.so2, nowAirCity.co, nowAirCity.o3]
      })
    }, function(res) {

    }, function() {

    });
  },
  //地理反编码
  genCodeLocation: function(lat, longi) {
    var _this = this;
    var url = "https://restapi.amap.com/v3/geocode/regeo";
    var data = {
      key: "05e62c98ebc533cb8811ae71ca817033",
      location: longi + "," + lat
    }
    network_util._get(url, data, function (res) {
      // console.log(res.data)
      _this.setData({
        desc: res.data.regeocode.addressComponent.city,
          location: res.data.regeocode.addressComponent.city+res.data.regeocode.addressComponent.district + res.data.regeocode.addressComponent.township
      })
    }, function (res) {

    }, function () {
      location = "youzhi"
      _this.Weather(lat, longi)
    })
  },
  onLoad: function () {
    this.getLocationAction()
    this.setData({
      week: util.weekDay(new Date().getDay()),
      seq: new Date().getDay()
    })
  },
  getLocationAction: function() {
    // var location;
    var _this = this;
    wx.getLocation({
      success: function (res) {
        lat = res.latitude
        longi = res.longitude
        wx.showLoading({
          title: '加载中',
          mask: true
        })
        _this.genCodeLocation(lat, longi)
      },
      fail: function () {
        _this.Weather("", "");
      }
    }) 
  },
  onShow : function() {
    // if (isOpenSetting) {
    //   this.getLocationAction()
    // }
  },
  chooseLocation: function() {
      var isopenLoction;
      var _this = this;
      wx.getSetting({
        success: (res) => {
          // console.log(res)
          isopenLoction = res.authSetting["scope.userLocation"]
          // console.log(isopenLoction)
          if (isopenLoction) {
            wx.chooseLocation({
              success: function (res) {
                // console.log(res)
                _this.setData({
                  location: res.address,
                })
                longi=res.longitude
                lat=res.latitude
                location = res.latitude + ":" + res.longitude
                _this.Weather(res.latitude, res.longitude)
              },
            })
          } else {
            wx.showToast({
              title: '检测到您没获得位置权限，请先开启哦',
              icon: "none",
              duration: 3000
            })
            setTimeout(function () {
              //打开设置
              wx.openSetting({
                success: (res) => {
                  // console.log(res)
                  isOpenSetting = res.authSetting["scope.userLocation"]
                  _this.getLocationAction()
                }
              })
            }, 3000)
          }
        }
      })
  },
  onShareAppMessage: function () {
    return {
      title: '即时天气',
      path: '/pages/index/index',
    }
  },
  onPullDownRefresh: function() {
    this.Weather(longi, lat);
  },

})
