import {
  request,
  regeneratorRuntime
} from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailsList: '',
    goodsNum: 1,
    phoneNumber:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.Buy(options.goods_id)
  },
  onShow:function(){
    this.onLoad()
  },

  Buy: async function (id) {
    let data = {
      goods_id: id,
      token: wx.getStorageSync('token')
    }
    let Buy = await request('Buy', data, true, 'POST')
    console.log(Buy.info)
    this.setData({
      detailsList: Buy.info,
      phoneNumber: Buy.info.live_store_tel
    })
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
  },
  //加
  addCount: function () {
    var num = this.data.goodsNum
    num++
    this.setData({
      goodsNum: num
    })
  },
  call:function(){
    wx.makePhoneCall({
      phoneNumber:  this.data.phoneNumber
    })
  },

})
