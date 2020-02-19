import {
  request,
  regeneratorRuntime
} from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payList: '',
    payListw: '',
    searchTxt: '',
    id: '',
    goods_num: '',
    phoneNumber: '',
    receiver_mobile: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.goods_num)
    this.buyNow(options.goods_id, options.goods_num)
    this.setData({
      id: options.goods_id,
      goods_num: options.goods_num
    })
  },
  buyNow: async function (id, num) {
    let data = {
      lat: wx.getStorageSync('lat'),
      lng: wx.getStorageSync('lon'),
      token: wx.getStorageSync('token'),
      goods_id: id,
      goods_num: num
    }
    let buyNow = await request('buyNow', data, true, 'GET')
    console.log(buyNow.data)
    this.setData({
      payList: buyNow.data.goods_list,
      payListw: buyNow.data,
      phoneNumber: buyNow.data.receiver_mobile,
      receiver_mobile: buyNow.data.receiver_mobile,
      searchTxt: buyNow.data.receiver_mobile,
    })
  },
  input_txt: function (e) { //输入框输入事件
    this.setData({
      searchTxt: e.detail.value,
    })

  },
  gotopay: function () {
    const search = this.data.searchTxt
    console.log(search)
    const num = this.data.goods_num
    if (!(/^1[34578]\d{9}$/.test(search))) {
      wx.showToast({
        title: '手机号码有误',
        duration: 2000,
        icon: 'none'
      });
    } else {
      this.pay(this.data.id, search, num)
    }
  },

  pay: async function (id, mobile, num) {
    let data = {
      token: wx.getStorageSync('token'),
      goods_id: id,
      goods_num: num,
      receiver_mobile: mobile
    }
    let buyNow = await request('buyNow', data, true, 'POST')
    console.log(buyNow)
    if (buyNow.code == 0) {
      wx.showToast({
        title: '请填写购买者手机号',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.requestPayment({
        'timeStamp': buyNow.data.payment.timeStamp,
        'nonceStr': buyNow.data.payment.nonceStr,
        'package': "prepay_id=" + buyNow.data.payment.prepay_id,
        'signType': 'MD5',
        'paySign': buyNow.data.payment.paySign,
        'success': function (res) {
          console.log(res)
          if (res.errMsg == "requestPayment:ok") {
            wx.navigateBack({
              delta: 2
            })
          }
        },
        'fail': function (res) {},
        'complete': function (res) {}
      })
    }

  },
  call: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.phoneNumber
    })
  },
})
