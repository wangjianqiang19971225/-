import {
  request,
  regeneratorRuntime
} from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getPark: [],
    currentTabsIndex: 0,
    currentTabsId: '',
    getParkdetail:[],
    title_image:[],
    image:[],
    show:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPark(options.shop_id)
    // this.getParkdetail(options.id)
    this.setData({
      currentTabsIndex: options.id,
    })
    console.log(options.id)
    console.log(options.shop_id)
  },

  tap: function (e) {
    const index = e.currentTarget.dataset.index
    const id = e.currentTarget.dataset.id
    console.log(id)
    this.setData({
      currentTabsIndex: index,
    })
    this.getParkdetail(id)
  },
  getPark: async function (shop_id) {
    let data = {
      shop_id: shop_id
    }
    let getPark = await request('getPark', data, true, 'POST')
    console.log(getPark)
    this.setData({
      getPark: getPark.data,
    })
    const Index = this.data.currentTabsIndex
    const Park = this.data.getPark
    console.log(Index)
    this.getParkdetail(Park[Index].id)
  },
  getParkdetail: async function (act_id) {
    let data = {
      act_id: act_id
    }
    let getParkdetail = await request('getParkdetail', data, true, 'POST')
    console.log(getParkdetail)
    this.setData({
      getParkdetail: getParkdetail.data,
      title_image: getParkdetail.data.title_image,
      image: getParkdetail.data.image,
    })
    console.log(getParkdetail.data.image)
    if(getParkdetail.data.image == ''){
      this.setData({
        show: 1
      })
    }else {
      this.setData({
        show: 0
      })
    }
    console.log(this.data.show)
  },
})
