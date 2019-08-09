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
    surroundingList: [],
    currentTabsIndex: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow: function () {

    this.Surrounding(this.data.currentTabsIndex)

  },
  Surrounding: async function (type) {
    let data = {
      lat: app.globalData.lat,
      lng: app.globalData.lon,
      type: type
    }
    let Surrounding = await request('Surrounding', data, true, 'POST')
    console.log(Surrounding.data)
    this.setData({
      surroundingList: Surrounding.data
    })
  },
  tap: function (e) {
    const index = e.currentTarget.dataset.current
    this.setData({
      currentTabsIndex: index
    })
    this.Surrounding(index)
  }

})
