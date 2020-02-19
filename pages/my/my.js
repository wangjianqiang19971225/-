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
    total_integral:'',
    show:'',
    uniqueid:''
  },
  onLoad:function (options) {
    const token = wx.getStorageSync('token')
    if(token == ''){
      this.setData({
        show:0
      })
    }else{
      this.setData({
        show:1
      })
    }
    this.User()
    this.loginInc()
    // this.onLoad()
    if (options.uniqueid == undefined) {
      return false
    } else {
      this.setData({
        uniqueid:options.uniqueid
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    this.User()
    this.loginInc()
    // this.onLoad()
    const token = wx.getStorageSync('token')
    if(token == ''){
      this.setData({
        show:0
      })
    }else{
      this.setData({
        show:1
      })
    }
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
  loginInc: function () {
    let data = {
      token: wx.getStorageSync('token')
    }
    let loginInc = request('loginInc', data, false, 'GET')
    console.log(loginInc)
  },
  regBusiness: async function () {
    let data = {
      token: wx.getStorageSync('token')
        }
    let regBusiness = await request('regBusiness', data, true, 'GET')
    console.log(regBusiness)
        console.log(regBusiness)
        if (regBusiness.code == 1 || regBusiness.code == 0) {
          wx.showToast({
            title: regBusiness.msg,
            icon: 'none',
            duration: 2000
          })
        } else if(regBusiness.code == 2){
          wx.showModal({
            title: '您的申请被拒绝了',
            content: '拒绝原因：' +regBusiness.msg,
            cancelText: '暂不修改',
            confirmText: '立即修改',
            success (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/stable/stable',
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }else{
          wx.navigateTo({
            url: '/pages/stable/stable',
          })
        }
  },
  goToregion:function(){
   this.regBusiness()
  },
  bindGetUserInfo(res) {
    var that = this;
    let info = res;
    console.log(info);
    if (info.detail.userInfo) {
      console.log("点击了同意授权");
      wx.login({
        success: function (res) {
          console.log(res)
          if (res.code) {
            console.log(JSON.stringify(info.detail.userInfo))
            // that.Token(res.code)
            wx.request({
              url: 'https://www.yizhiba.cn/api/user/getToken',
              data: {
                code: res.code,
              },
              method: 'POST',
              success: function (res) {
                console.log(res)
                let token = res.data.data.token
                let uniqueid = res.data.data.uniqueid
                console.log(token)
                wx.setStorageSync('token', token);
                wx.setStorageSync('uniqueid', uniqueid);
                if(res.data.code == 1){
                  that.Login(JSON.stringify(info.detail.userInfo))
                }else{
                  return
                }
                that.onLoad()
              }
            })
          } else {
            console.log("授权失败");
          }
        },
      })
    } else {

    }
  },
  Login: async function (user_info) {
    let data = {
      user_info:user_info,
      token:wx.getStorageSync('token')
    }
    let Login = await request('Login', data, true, 'POST')
    console.log(Login.code)
    if(Login.code==1){
      this.shareInter(this.data.uniqueid)
    }
  },
  shareInter: function (uniqueid) {
    let data = {
      uniqueid: uniqueid,
      token: wx.getStorageSync('token')
    }
    let shareInter = request('shareInter', data, false, 'GET')
    console.log(shareInter)
  },

})
