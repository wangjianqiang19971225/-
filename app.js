import {
  request,
  regeneratorRuntime
} from './utils/request.js'
App({
  globalData: {
    userInfo: null,
    lat: null,
    lon: null,
    show: null,
  },
  onLaunch: function () {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        that.globalData.lat = res.latitude
        that.globalData.lon = res.longitude
      }
    })
    that.loginInc()
  },
  loginInc: function () {
    let data = {
      token: wx.getStorageSync('token')
    }
    let loginInc = request('loginInc', data, false, 'GET')
    console.log(loginInc)
  },
})
