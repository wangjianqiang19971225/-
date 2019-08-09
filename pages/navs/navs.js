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
    typecourseList:[]
  },
  onShow: function () {
    this.Typecourse(this.data.currentTabsIndex)
  },
  Typecourse: async function (type) {
    let data = {
      lat: app.globalData.lat,
      lng: app.globalData.lon,
      type: type
    }
    let Typecourse = await request('Typecourse', data, true, 'POST')
    console.log(Typecourse.data)
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

})
