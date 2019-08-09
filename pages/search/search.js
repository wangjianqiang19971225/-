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
    searchTxt: '',
    searchRecord: [],
    searchList: [],
    currentTabsIndex: 1,
    index:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.openHistorySearch()
    console.log(this.data.searchRecord)
  },
  input_txt: function (e) { //输入框输入事件
    this.setData({
      searchTxt: e.detail.value.trim()
    })
    console.log(e.detail.value.trim())
  },
  bindconfirm: function () {
    const keyword = this.data.searchTxt
    this.Search(keyword)
   this.setData({
    currentTabsIndex:2
   })
    var searchRecord = this.data.searchRecord
    if (keyword == '') {
      //输入为空时的处理
    } else {
      //将搜索值放入历史记录中,只能放前五条
      if (searchRecord.length < 5) {
        searchRecord.unshift({
          value: keyword,
          id: searchRecord.length
        })
      } else {
        searchRecord.pop() //删掉旧的时间最早的第一条
        searchRecord.unshift({
          value: keyword,
          id: searchRecord.length
        })
      }
      //将历史记录数组整体储存到缓存中
      wx.setStorageSync('searchRecord', searchRecord)
    }
  },
  Search: async function (keyword) {
    let data = {
      keyword: keyword,
      lat:app.globalData.lat,
      lng:app.globalData.lon
    }
    let Search = await request('Search', data, true, 'POST')
    console.log(Search)
    this.setData({
      searchList: Search.data
    })
    if(Search.data==''){
      this.setData({
        index:1
      })
    }
  },
  openHistorySearch: function () {
    this.setData({
      searchRecord: wx.getStorageSync('searchRecord') || [], //若无储存则为空
    })
  },
  searchText: function (e) {
    const index = e.currentTarget.dataset.index
    const search = this.data.searchRecord[index].value
    this.Search(search)
    this.setData({
      currentTabsIndex:2
     })
  },
})
