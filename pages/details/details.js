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
    currentTabsIndex: 1,
    detailList: [],
    detailList2: [],
    detailList3: [],
    detailList4: [],
    detailList5: [],
    detailList6: [],
    detailList7: [],
    num: '', //后端给的分数,显示相应的星星
    one_1: '',
    two_1: '',
    shop_group_id: '',
    shop_id: '',
    index: '',
    phoneNumber: '',
    hidden: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      hidden: app.globalData.hidden
    })
    console.log(options.shop_id)
    this.setData({
      shop_id: options.shop_id
    })
  },
  gotoshang: function () {
    const shop_id = this.data.shop_id
    wx.navigateTo({
      url: '/pages/application/application?shop_id=' + shop_id
    })
  },
  onShow: function () {
    const shop_id = this.data.shop_id
    this.Detail(shop_id, "1")
    this.Detail2(shop_id, "2")
    this.Detail3(shop_id, "3")
    this.Detail4(shop_id, "4")
    this.Detail5(shop_id, "5")
    this.Detail6(shop_id, "6")
    this.Detail7(shop_id, "7")
    // this.increase()
  },
  tap: function (e) {
    const index = e.currentTarget.dataset.current
    this.setData({
      currentTabsIndex: index
    })
    // this.Surrounding(index)
  },
  buy: function (e) {
    this.setData({
      currentTabsIndex: 2
    })
  },
  Detail: async function (id, type) {
    let data = {
      lat: wx.getStorageSync('lat'),
      lng: wx.getStorageSync('lon'),
      shop_id: id,
      type: type
    }
    let Detail = await request('Detail', data, true, 'POST')
    console.log(Detail.data)
    this.setData({
      detailList: Detail.data[0],
      num: Detail.data[0].score,
      phoneNumber: Detail.data[0].shop_phone

    })
    console.log(this.data.detailList)
    this.setData({
      one_1: this.data.num,
      two_1: 5 - this.data.num
    })
  },
  Detail2: async function (id, type) {
    let data = {
      shop_id: id,
      type: type
    }
    let Detail = await request('Detail', data, true, 'POST')
    console.log(Detail.data)
    this.setData({
      detailList2: Detail.data.shop_profile,
      shop_group_id: Detail.data.shop_group_id
    })
    const shopId = this.data.shop_group_id
    const detailList6 = this.data.detailList6
    console.log(detailList6)
    // const a = []
    // if (shopId == 1) {
    //   for (var i = 0; i < detailList6.length; i++) {
    //     const namea = detailList6[i].s_name

    //     // var ab = detailList6[i]
    //     // a.push()
    //     // console.log(a)
    //     // const obg = Object.assign(ab,{'s_name':namea.slice(0, 1)})
    //     // this.setData({
    //     //   detailList6: detailList6[i].s_name.slice(0, 1)
    //     // })
    //     // a.push(s_name)
    //     // console.log(ab)
    //     console.log(namea)
    //     console.log(obg)
    //   }
    // }
  },
  Detail3: async function (id, type) {
    let data = {
      shop_id: id,
      type: type
    }
    let Detail = await request('Detail', data, true, 'POST')
    console.log(Detail.data)
    this.setData({
      detailList3: Detail.data.welfare
    })

  },
  Detail4: async function (id, type) {
    let data = {
      shop_id: id,
      type: type
    }
    let Detail = await request('Detail', data, true, 'POST')
    console.log(Detail.data)
    this.setData({
      detailList4: Detail.data
    })
  },
  Detail5: async function (id, type) {
    let data = {
      shop_id: id,
      type: type
    }
    let Detail = await request('Detail', data, true, 'POST')
    console.log(Detail.data)
    this.setData({
      detailList5: Detail.data.notice
    })
  },
  Detail6: async function (id, type) {
    let data = {
      shop_id: id,
      type: type
    }
    let Detail = await request('Detail', data, true, 'POST')
    console.log(Detail.data)
    this.setData({
      detailList6: Detail.data
    })
    if (Detail.data == '') {
      this.setData({
        index: 1
      })
    }

  },
  Detail7: async function (id, type) {
    let data = {
      shop_id: id,
      type: type
    }
    let Detail = await request('Detail', data, true, 'POST')
    console.log(Detail.data)
    this.setData({
      detailList7: Detail.data
    })
  },
  call: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.phoneNumber
    })
  },
  product: function (e) {
    const index = e.currentTarget.dataset.index
    const shop_id = this.data.shop_id
    wx.navigateTo({
      url: "/pages/product/product?shop_id=" + shop_id + '&id=' + index
    })
  },
  product1: function (e) {
    const index = e.currentTarget.dataset.index
    const shop_id = this.data.shop_id
    wx.navigateTo({
      url: "/pages/product1/product1?shop_id=" + shop_id + '&id=' + index
    })
  }
})
