import {
  request,
  regeneratorRuntime
} from '../../utils/request.js'
Page({
  data: {
    pic:[]
  },
  onLoad: function (options) {
    const pic = options.pic
    this.getmanagerimgs(pic)
  },
  getmanagerimgs: async function (id) {
    let data = {
      id: id
    }
    let getmanagerimgs = await request('getmanagerimgs', data, true, 'POST')
    console.log(getmanagerimgs.data)
    this.setData ({
      pic:getmanagerimgs.data
    })
  }
})
