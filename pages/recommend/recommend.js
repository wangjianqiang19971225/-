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
    recomendList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow:function(){
    this.Recomend()
  },
  Recomend: async function () {
    let data = {
      lat: wx.getStorageSync('lat'),
      lng: wx.getStorageSync('lon'),
      more: 2
    }
    let Recomend = await request('Recomend', data, true, 'POST')
    console.log(Recomend)
    this.setData({
      recomendList: Recomend.data
    })
  },


})
