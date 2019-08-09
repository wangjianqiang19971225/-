import {
  request,
  regeneratorRuntime
} from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    one_2: 0,
    two_2: 5,
    orderlist: '',
    order_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.order(options.order_id)
    this.setData({
      order_id: options.order_id
    })
  },
  in_xin: function (e) {
    var in_xin = e.currentTarget.dataset.in;
    var one_2;
    if (in_xin === 'use_sc2') {
      one_2 = Number(e.currentTarget.id);
    } else {
      one_2 = Number(e.currentTarget.id) + this.data.one_2;
    }
    this.setData({
      one_2: one_2,
      two_2: 5 - one_2
    })
  },
  order: async function (order_id) {
    let data = {
      token: wx.getStorageSync('token'),
      order_id: order_id
    }
    let order = await request('order', data, true, 'GET')
    console.log(order.data.goodsList)
    this.setData({
      orderlist: order.data.goodsList

    })
  },
  getorder: function () {
    const order_id = this.data.order_id
    const one_2 = this.data.one_2
    if (one_2 == 0) {
      wx.showToast({
        title: '请评价',
        icon: 'none',
        duration: 2000
      })
      return
    } else {
      this.orderget(order_id, one_2)
    }

  },
  orderget: async function (order_id, scores) {
    let data = {
      token: wx.getStorageSync('token'),
      order_id: order_id,
      scores: scores
    }
    let order = await request('order', data, true, 'POST')
    console.log(order.data.goodsList)
    wx.navigateBack({
      delta: 1
    })


  },

})
