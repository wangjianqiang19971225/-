import {
  request,
  regeneratorRuntime
} from '../../utils/request.js'
Page({

  data: {
    currentTabsIndex: 1,
    evaluateLists: [],
  },
  onShow: function () {
    this.evaluateLists('yesevaluate')
  },
  tap: function (e) {
    const index = e.currentTarget.dataset.current
    this.setData({
      currentTabsIndex: index
    })
    if (index == 1) {
      this.evaluateLists('yesevaluate')
    }
    if (index == 2) {
      this.evaluateLists('noevaluate')
    }
  },
  evaluateLists: async function (dataType) {
    let data = {
      token: wx.getStorageSync('token'),
      dataType: dataType
    }
    let evaluateLists = await request('evaluateLists', data, true, 'POST')
    console.log(evaluateLists.data)
    this.setData({
      evaluateLists: evaluateLists.data.list
    })
  },
  gotoevaluate: function (e ) {
    const index = e.currentTarget.dataset.index
    const evaluateLists = this.data.evaluateLists
    const order_id = evaluateLists[index].order_id
    wx.navigateTo({
      url: '/pages/evaluate/evaluatelist?order_id=' + order_id
    })
  },
})
