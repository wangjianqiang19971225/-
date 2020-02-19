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
    currentTabsIndex: 1,
    index:2,
    hidden:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.setData({
    hidden :app.globalData.hidden
   })
  },
  onShow: function () {
    this.Surrounding(this.data.currentTabsIndex)
  },
  Surrounding: async function (type) {

    let data = {
      lat: wx.getStorageSync('lat'),
      lng: wx.getStorageSync('lon'),
      type: type
    }
    let Surrounding = await request('Surrounding', data, true, 'POST')
    console.log(Surrounding.data)
    if(Surrounding.data == ''){
      this.setData({
        index:1
      })
    }else{
      this.setData({
        index:2
      })
    }
    this.setData({
      surroundingList: Surrounding.data
    })
  },
  tap: function (e) {
    this.onLoad()
    const index = e.currentTarget.dataset.current
    this.setData({
      currentTabsIndex: index
    })
    this.Surrounding(index)
  }

})
