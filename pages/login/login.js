import {
  request,
  regeneratorRuntime
} from '../../utils/request.js'
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    uniqueid:''
  },
  onLoad: function (options) {
    if (options.uniqueid == undefined) {
      return false
    } else {
      this.setData({
        uniqueid:options.uniqueid
      })
    }
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
              }
            })
            wx.switchTab({
              url: '/pages/index/index'
            })
          } else {
            console.log("授权失败");
          }
        },
      })
    } else {
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },
  // Token: async function (code) {
  //   let data = {
  //     code: code
  //   }
  //   let Token = await request('Token', data, true, 'POST')
  //   console.log(Token)
  //   let token = Token.data.token
  //   console.log(token)
  //   wx.setStorageSync('token', token);
  // },
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
