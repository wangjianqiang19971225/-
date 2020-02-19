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
    detailsList: '',
    goodsNum: 1,
    phoneNumber:'',
    distance:'',
    business_info: [],
    crowd_info: [],
    reserv_info: [],
    rule_info: [],
    hidden:'',
    price: '',
    finallyPrice:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.Buy(options.goods_id)
    this.setData({
      hidden :app.globalData.hidden
     })
  },
  // onShow:function(){
  //   this.onLoad()
  // },

  Buy: async function (id) {
    let data = {
      lat: wx.getStorageSync('lat'),
      lng: wx.getStorageSync('lon'),
      goods_id: id,
      token: wx.getStorageSync('token')
    }
    let Buy = await request('Buy', data, true, 'POST')
    console.log(Buy.info)
    this.setData({
      detailsList: Buy.info.detail,
      price: Buy.info.detail.price,
      phoneNumber: Buy.info.detail.shop_phone,
      business_info: Buy.info.purchaseNotes.business_info,
      crowd_info: Buy.info.purchaseNotes.crowd_info,
      reserv_info: Buy.info.purchaseNotes.reserv_info,
      rule_info: Buy.info.purchaseNotes.rule_info,
      distance: Buy.info.res.distance
    })
    this.price()
  },
  payment: function () {
    this.buyNow(this.data.goodsNum)
    wx.navigateTo({
      url: '/pages/pay/pay?goods_id=' + this.data.detailsList.goods_id + '&goods_num=' + this.data.goodsNum
    })
  },

  buyNow: async function (goods_num) {
    let data = {
      token: wx.getStorageSync('token'),
      goods_id: this.data.detailsList.goods_id,
      goods_num: goods_num
    }
    let buyNow = await request('buyNow', data, true, 'GET')
    console.log(buyNow.data)
  },
  // 减
  minusCount: function () {
    var num = this.data.goodsNum
    if (num <= 1) {
      return false
    }
    num--
    this.setData({
      goodsNum: num
    })
    this.price()
  },
  //加
  addCount: function () {
    var num = this.data.goodsNum
    num++
    this.setData({
      goodsNum: num
    })
    this.price()
  },
  call:function(){
    wx.makePhoneCall({
      phoneNumber:  this.data.phoneNumber
    })
  },
  price:function () {
    const num = this.data.goodsNum
    console.log(num)
    const price = this.data.price
    console.log(price)
    this.setData({
      finallyPrice:( price * num).toFixed(2)
    })
  }

})
