import {
  request,
  regeneratorRuntime
} from '../../utils/request.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerlist: [],
    recomendList: [],
    timecourseList: [],
    show: '',
    scerweima: '',
    LocationList: '北京',
    lat: '',
    lon: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              console.log('已授权')
            }
          })
        } else {
          console.log('未授权')
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
      }
    })
    console.log(options)
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        app.globalData.lat = res.latitude
        app.globalData.lon = res.longitude
        that.setData({
          lat: res.latitude,
          lon: res.longitude,
        })
        that.Recomend(res.latitude, res.longitude)
      }
    })
    console.log(app.globalData.show)
    that.Bannerlist()
    that.Timecourse()
    if (options.uniqueid == undefined) {
      return false
    } else {
      this.shareInter(options.uniqueid)
    }
  },
  onShow: function () {
    this.Bannerlist()
    this.Timecourse()
    console.log(app.globalData.show)
    this.setData({
      show: app.globalData.show
    })
    this.scerweima()
    app.globalData.show = ''
  },
  delete: function () {
    this.setData({
      show: ''
    })
  },
  shareInter: function (uniqueid) {
    let data = {
      uniqueid: uniqueid,
      token: wx.getStorageSync('token')
    }
    let shareInter = request('shareInter', data, false, 'GET')
    console.log(shareInter)
  },

  call: function () {
    wx.makePhoneCall({
      phoneNumber: '1231215413'
    })
  },

  scerweima: async function () {
    let data = {
      url: "https://baidu.com/"
    }
    let scerweima = await request('scerweima', data, true, 'POST')
    this.setData({
      scerweima: scerweima.data
    })
  },

  goTomember: function () {
    wx.showToast({
      title: '暂未开放，敬请期待',
      icon: 'none',
      duration: 4000
    })
  },
  Bannerlist: async function () {
    let data = {
      type: 1
    }
    let Bannerlist = await request('Bannerlist', data, false, 'POST')
    this.setData({
      bannerlist: Bannerlist.data
    })
  },
  Recomend: async function (lat, lon) {
    let data = {
      lat: lat,
      lon: lon,
      more: 1
    }
    let Recomend = await request('Recomend', data, false, 'POST')
    this.setData({
      recomendList: Recomend.data
    })
  },
  Timecourse: async function () {
    let data = {
      more: 1
    }
    let Timecourse = await request('Timecourse', data, false, 'POST')
    this.setData({
      timecourseList: Timecourse.data
    })
  },
  loginInc: function () {
    let data = {
      token: wx.getStorageSync('token')
    }
    let loginInc = request('loginInc', data, false, 'GET')
    console.log(loginInc)
  },
  getLocation: function () {
    var that = this
    wx.chooseLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        app.globalData.lat = res.latitude
        app.globalData.lon = res.longitude
        console.log(res)
        const Lt = res.name
        if (Lt == '') {
          return false
        }
        that.setData({
          LocationList: Lt.slice(0, 2)
        })
      }
    })
  },
  // Bannerlist: async function () {
  //   let data = {
  //     type: 2
  //   }
  //   let Bannerlist = await request('Bannerlist', data, true, 'POST')
  //   console.log(Bannerlist.data)
  //   this.setData({
  //     navslist:Bannerlist.data
  //   })
  // }
  regHouseKeeper: async function () {
    let data = {
      token: wx.getStorageSync('token')
    }
    let regHouseKeeper = await request('regHouseKeeper', data, false, 'GET')
    console.log(regHouseKeeper)
    if(regHouseKeeper.code == 1||regHouseKeeper.code == 0){
      wx.showToast({
        title: regHouseKeeper.msg,
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.navigateTo({
        url: '/pages/navs/region',
      })
    }
  },
  goToregion:function(){
   this.regHouseKeeper()
  }
})
