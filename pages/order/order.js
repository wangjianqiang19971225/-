import {
  request,
  regeneratorRuntime
} from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTabsIndex: 0,
    orderlists: []
  },
  onLoad: function (options) {
    this.setData({
      currentTabsIndex: options.current_id
    })
    this.OrderLists('all')
    if (options.current_id == 0 || '') {
      this.OrderLists('all')
    }
    if (options.current_id == 1) {
      this.OrderLists('payment')
    }
    if (options.current_id == 2) {
      this.OrderLists('consumption')
    }
    if (options.current_id == 3) {
      this.OrderLists('complete')
    }
  },
  onShow: function () {
    // this.OrderLists('all')
  },
  tap: function (e) {
    const index = e.currentTarget.dataset.current
    this.setData({
      currentTabsIndex: index
    })
    // this.Typecourse(index)
    if (index == 0) {
      this.OrderLists('all')
    }
    if (index == 1) {
      this.OrderLists('payment')
    }
    if (index == 2) {
      this.OrderLists('consumption')
    }
    if (index == 3) {
      this.OrderLists('complete')
    }
  },
  OrderLists: async function (type) {
    let data = {
      token: wx.getStorageSync('token'),
      dataType: type
    }
    let OrderLists = await request('OrderLists', data, true, 'POST')
    console.log(OrderLists.data)
    this.setData({
      orderlists: OrderLists.data.list
    })
  },
  gotopay: function (e) {
    const index = e.currentTarget.dataset.index
    const orderlists = this.data.orderlists
    const pay_status = orderlists[index].pay_status
    const is_evaluate = orderlists[index].is_evaluate
    const order_id = orderlists[index].order_id
    if (pay_status == 0) {
      this.pay(order_id)
    }
    if (pay_status == 4 & is_evaluate == 0) {
      wx.navigateTo({
        url: '/pages/evaluate/evaluatelist?order_id=' + order_id
      })
    }
    if (pay_status == 2) {
      wx.navigateTo({
        url: '/pages/order/orderlist?order_id=' + order_id
      })
    }
    // if (is_evaluate == 0) {
    //   wx.navigateTo({
    //     url: '/pages/evaluate/evaluatelist?order_id=' + order_id
    //   })
    // }
  },
  pay: async function (order_id) {
    let data = {
      token: wx.getStorageSync('token'),
      order_id: order_id
    }
    let pay = await request('pay', data, true, 'POST')
    console.log(pay)
    wx.requestPayment({
      'timeStamp': pay.data.timeStamp,
      'nonceStr': pay.data.nonceStr,
      'package': "prepay_id=" + pay.data.prepay_id,
      'signType': 'MD5',
      'paySign': pay.data.paySign,
      'success': function (res) {},
      'fail': function (res) {},
      'complete': function (res) {}
    })
  },
})
