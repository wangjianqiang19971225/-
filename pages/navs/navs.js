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
    currentTabsIndex: 1,
    typecourseList: [],
    index: 2,
    hidden: ''
  },
  onLoad: function () {
    this.setData({
      hidden: app.globalData.hidden
    })
  },
  onShow: function () {
    this.Typecourse(this.data.currentTabsIndex)

  },
  Typecourse: async function (type) {
    let data = {
      lat: wx.getStorageSync('lat'),
      lng: wx.getStorageSync('lon'),
      type: type
    }
    let Typecourse = await request('Typecourse', data, true, 'POST')
    console.log(Typecourse.data)
    if (Typecourse.data == '') {
      this.setData({
        index: 1
      })
    } else {
      this.setData({
        index: 2
      })
    }
    this.setData({
      typecourseList: Typecourse.data
    })


  },
  tap: function (e) {
    const index = e.currentTarget.dataset.current
    this.setData({
      currentTabsIndex: index
    })
    this.Typecourse(index)
  },

})
