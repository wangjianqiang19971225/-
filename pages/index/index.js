import {
  request,
  regeneratorRuntime
} from '../../utils/request.js'
var app = getApp()
import {
  area
} from '../../utils/area.js';
import {
  area2
} from '../../utils/area2.js';
app.globalData.area = {
  ...area,
  ...area2
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerlist: [],
    recomendList: [],
    timecourseList: [],
    show: '',
    cityName: '',
    regHouseKeeper: [],
    erwei:'',
    phone:''

    // cityData: area[app.citySelect.provriceId].children[app.citySelect.cityId],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (wx.getStorageSync('cityName') == '') {
      wx.getLocation({
        type: 'wgs84',
        success(res) {
          console.log(res)
          const lat = res.latitude
          const lon = res.longitude
          wx.setStorageSync('lat', lat);
          wx.setStorageSync('lon', lon);
          wx.setStorageSync('latitude', lat);
          wx.setStorageSync('longitude', lon);
          var locationString = res.latitude + "," + res.longitude;
          wx.request({
            url: 'https://apis.map.qq.com/ws/geocoder/v1/',
            data: {
              "key": "CVZBZ-N2JWU-PTKVR-22AXM-B4MYV-RQBCZ",
              "location": locationString
            },
            method: 'GET',
            success: function (res) {
              //输出一下位置信息
              console.log(res)
              const city = res.data.result.address_component.city.slice(0, 2)
              wx.setStorageSync('cityName', city);
              wx.setStorageSync('currentCity', city);
              console.log(city)
              that.setData({
                cityName: wx.getStorageSync('cityName')
              })
            }
          });
          that.Recomend(res.latitude, res.longitude)
          that.Bannerlist(res.latitude, res.longitude)
           that.Timecourse(res.latitude, res.longitude)
        }
      })
    } else {
      wx.getLocation({
        type: 'wgs84',
        success(res) {
          const lat = res.latitude
          const lon = res.longitude
          var locationString = res.latitude + "," + res.longitude;
          wx.request({
            url: 'https://apis.map.qq.com/ws/geocoder/v1/',
            data: {
              "key": "CVZBZ-N2JWU-PTKVR-22AXM-B4MYV-RQBCZ",
              "location": locationString
            },
            method: 'GET',
            success: function (res) {
              //输出一下位置信息
              console.log(res)
              const city = res.data.result.address_component.city.slice(0, 2)
              if (wx.getStorageSync('cityName') != city) {
                wx.showModal({
                  content: '系统定位您在' + city + ',' + ' 需要切换到' + city + '吗?',
                  success(res) {
                    if (res.confirm) {
                      that.setData({
                        cityName: city
                      })
                      app.globalData.hidden = ''
                      console.log(app.globalData.hidden)
                      wx.setStorageSync('cityName', city);
                      wx.setStorageSync('lat', lat)
                      wx.setStorageSync('lon', lon)
                      that.onLoad()
                    } else if (res.cancel) {
                      app.globalData.hidden = 1
                      console.log(app.globalData.hidden)
                      return false
                    }
                  }
                })
              }else {
                app.globalData.hidden = ''
                console.log(app.globalData.hidden)
                wx.setStorageSync('cityName', city);
                wx.setStorageSync('lat', lat)
                wx.setStorageSync('lon', lon)
                return false
              }
            }
          });
          that.Recomend(wx.getStorageSync('lat'), wx.getStorageSync('lon'))
          that.Bannerlist(wx.getStorageSync('lat'), wx.getStorageSync('lon'))
          that.Timecourse(wx.getStorageSync('lat'), wx.getStorageSync('lon'))
        }
      })

    }
    // 查看是否授权
    console.log(app.globalData.show)
    that.getcustomer()
  },
  onShow: function () {
    var that = this
    that.onLoad()
    that.setData({
      cityName: wx.getStorageSync('cityName')
    })
    that.Bannerlist(wx.getStorageSync('lat'), wx.getStorageSync('lon'))
    that.Timecourse(wx.getStorageSync('lat'), wx.getStorageSync('lon'))
    that.setData({
      show: app.globalData.show
    })
    that.getcustomer()
    app.globalData.show = ''
    if (app.citySelect.provriceId == null) {
      return false
    }else {
      var cityName = area[app.citySelect.provriceId].children[app.citySelect.cityId].name
      const lat = area[app.citySelect.provriceId].children[app.citySelect.cityId].lat
      const lon = area[app.citySelect.provriceId].children[app.citySelect.cityId].lng
      const city = cityName.slice(0, 2)
      that.setData({
        cityName: city
      })

      wx.setStorageSync('cityName', city)
      wx.setStorageSync('lat', lat)
      wx.setStorageSync('lon', lon)
      app.citySelect.provriceId= ''
      that.onLoad()
    }
  },
  delete: function () {
    this.setData({
      show: ''
    })
  },


  call: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.phone
    })
  },

  getcustomer: async function () {
    let getcustomer = await request('getcustomer', true, 'POST')
    console.log(getcustomer)
    this.setData({
      erwei: getcustomer.data.image,
      phone: getcustomer.data.phone
    })
  },

  goTomember: function () {
    wx.showToast({
      title: '暂未开放，敬请期待',
      icon: 'none',
      duration: 4000
    })
  },
  Bannerlist: async function (lat, lon) {
    let data = {
      lat: lat,
      lng: lon,
      type: 1
    }
    let Bannerlist = await request('Bannerlist', data, false, 'POST')
    console.log(Bannerlist.data)
    this.setData({
      bannerlist: Bannerlist.data
    })
  },
  Recomend: async function (lat, lon) {
    let data = {
      lat: lat,
      lng: lon,
      more: 1
    }
    let Recomend = await request('Recomend', data, false, 'POST')
    this.setData({
      recomendList: Recomend.data
    })
  },
  Timecourse: async function (lat, lon) {
    let data = {
      lat: lat,
      lng: lon,
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
    wx.navigateTo({
      url: '/pages/switchcity/switchcity',
    })
    // var that = this
    // wx.chooseLocation({
    //   type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    //   success(res) {
    //     app.globalData.lat = res.latitude
    //     app.globalData.lon = res.longitude
    //     var locationString = res.latitude + "," + res.longitude;
    //     wx.request({
    //       url: 'http://apis.map.qq.com/ws/geocoder/v1/',
    //       data: {
    //         "key": "XWBBZ-6JAKS-FL3OP-6LX7I-R62NV-F5FBI",
    //         "location": locationString
    //       },
    //       method: 'GET',
    //       success: function (res) {
    //         //输出一下位置信息
    //         console.log(res)

    //         that.setData({
    //           LocationList: res.data.result.address_component.city.slice(0, 2)
    //         })
    //       }
    //     })
    //   }
    // })


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
    let regHouseKeeper = await request('regHouseKeeper', data, true, 'GET')
    console.log(regHouseKeeper)
    if (regHouseKeeper.code == 1 || regHouseKeeper.code == 0) {
      wx.showToast({
        title: regHouseKeeper.msg,
        icon: 'none',
        duration: 2000
      })
    } else if(regHouseKeeper.code == 2){
      wx.showModal({
        title: '您的申请被拒绝了',
        content: '拒绝原因：' +regHouseKeeper.data.msg,
        cancelText: '暂不修改',
        confirmText: '立即修改',
        success (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/navs/region',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      wx.navigateTo({
        url: '/pages/navs/region',
      })
    }

  },
  goToregion: function () {
    this.regHouseKeeper()
  }
})
