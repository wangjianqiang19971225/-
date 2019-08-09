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
      lat: app.globalData.lat,
      lon: app.globalData.lon,
      more: 2
    }
    let Recomend = await request('Recomend', data, true, 'POST')
    console.log(Recomend.data)
    this.setData({
      recomendList: Recomend.data
    })
  },


})
