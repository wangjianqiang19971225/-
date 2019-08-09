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
    timecourseList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow: function () {

    this.Timecourse()

  },
  Timecourse: async function () {
    let data = {
      more: 2
    }
    let Timecourse = await request('Timecourse', data, true, 'POST')
    console.log(Timecourse.data)
    this.setData({
      timecourseList: Timecourse.data
    })
  },


})
