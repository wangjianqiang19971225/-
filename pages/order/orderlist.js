import {
  request,
  regeneratorRuntime
} from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:[],
    phoneNumber:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.order_id)
    this.orderList(options.order_id)
  },
  orderList: async function (order_id) {
    let data = {
      token: wx.getStorageSync('token'),
      order_id: order_id
    }
    let orderList = await request('orderList', data, true, 'POST')
    console.log(orderList.data)
    this.setData({
      orderList: orderList.data.order,
      phoneNumber:orderList.data.order.live_store_tel
    })
  },
  call: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.phoneNumber
    })
  },
})
