import {
  request,
  regeneratorRuntime
} from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userlist:'',
    orderCount:'',
    total_integral:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    this.User()
  },
  User: async function () {
    let data = {
      token:wx.getStorageSync('token')
    }
    let User = await request('User', data,  true, 'GET')
    console.log(User)
    this.setData({
      userlist: User.data.userInfo,
      orderCount:User.data.orderCount,
      total_integral:User.data.total_integral
    })
  },
  regBusiness: async function () {
    let data = {
      token: wx.getStorageSync('token')
    }
    let regBusiness = await request('regBusiness', data, false, 'GET')
    console.log(regBusiness)
    if(regBusiness.code == 1||regBusiness.code == 0){
      wx.showToast({
        title: regBusiness.msg,
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.navigateTo({
        url: '/pages/stable/stable',
      })
    }
  },
  goToregion:function(){
   this.regBusiness()
  }

})
