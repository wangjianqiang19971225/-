import regeneratorRuntime from './runtime.js'
const baseHost = "https://www.yizhiba.cn/api/"
const baseUrl = {
  // gettest: baseHost + "/mock/5aded45053796b38dd26e970/comments#!method=get" // 测试接口
  // getOpenid: baseHost + "/page/wxpay/xcxlogin.html", // 获取openid
  Bannerlist: baseHost + "/index/bannerlist",
  Login: baseHost + "/user/login",
  // Token: baseHost + "/user/getToken",
  Buy: baseHost + "/goods/detail",
  Recomend: baseHost + "/index/recomend",
  Timecourse: baseHost + "/index/time_course",
  Surrounding: baseHost + "/workinground/lw",
  Typecourse: baseHost + "/Classstudy/type_course",
  OrderLists: baseHost + "/user.order/lists",
  Detail: baseHost + "/Classstudy/detail",
  buyNow: baseHost + "/order/buyNow",
  User: baseHost + "/user.index/detail",
  Search: baseHost + "/index/search",
  scerweima: baseHost + "/qrcodes/scerweima",
  getindexscrmer: baseHost + "/qrcodes/getindexscrmer",
  pay: baseHost + "/user.order/pay",
  orderList: baseHost + "/user.order/detail",
  BusinessType: baseHost + "/Business/businessType",
  regBusiness: baseHost + "/Business/regBusiness",
  regHouseKeeper: baseHost + "/House/regHouseKeeper",
  evaluateLists: baseHost + "/user.comment/evaluateLists",
  order: baseHost + "/user.comment/order",
  classsudy: baseHost + "/Safty/saftydanger",
  history: baseHost + "/user.Integral/history",
  loginInc: baseHost + "/user.Integral/loginIncIntegral",
  getPark: baseHost + "/park/getPark",
  shareInter: baseHost + "/user.Invite/shareInter",
  getParkdetail: baseHost + "/park/getParkdetail",
  getscrmer: baseHost + "/qrcodes/getscrmer",
  getstudents: baseHost + "/Classes/getstudents",
  getcustomer: baseHost + "/qrcodes/getcustomer",
  getmanagerimgs: baseHost + "classstudy/getmimgs",
}

function request(url, postData = {}, toast = true, method = 'POST') {
  const app = getApp()
  return new Promise((resolve, reject) => {

    let paras = {
      url: baseUrl[url] + '?t=' + new Date().getTime(),
      data: postData,
      // header: {
      //   // "content-type": "application/json"
      //   "content-type": "application/x-www-form-urlencoded"
      // },
      method,
      success: data => {
        if (toast) {
          wx.hideLoading()
        }
        // console.log(url + '返回成功：', data.data)
        if (data.statusCode == 200) {
          resolve(data.data)
        }
        /*else {
                 reject(data.data)
                 wx.showModal({
                   title: '提示',
                   content: data.data.message,
                   showCancel: false
                 })

               }*/

        // if (data.data.status == -2) {
        //   wx.showToast({
        //     title: data.data.message,
        //     icon: 'none'
        //   })
        // }
        if (data.data.code == -1) {
          wx.clearStorage()
          wx.switchTab({
            url: '/pages/my/my'
          })
          wx.showToast({
            title: '请登录',
            icon: 'none',
            duration: 2000
          })
        }
        // if (data.data.status == 602 || data.data.message == '账号已在其他设备登录！') {
        //   try {
        //     wx.clearStorage()
        //     wx.redirectTo({
        //       url: '/pages/register/register',
        //     })
        //   }
        //   catch (err) {
        //   }
        //   wx.showToast({
        //     title: data.data.message,
        //     icon: 'none'
        //   })
        // }

        /*if (!data.data.data) {
          data.data.data = {}
        }
        if (data.data.code == 2000) {
          if (data.data.count >= 0) {
            data.data.data.totalCount = data.data.count
          }
          resolve(data.data.data)
        } else {
          // reject(data.data.msg)
          wx.showModal({
            title: '提示',
            content: data.data.msg,
            showCancel: false
          })
        } */
      },
      fail: (err) => {
        if (toast) {
          wx.hideLoading()
        }
        wx.showToast({
          title: '请求失败，网络错误！',
          icon: 'none'
        })
        console.error(url + '返回失败：', err)
        reject(err)
      }
    }
    // console.log('请求url：', url)
    // console.log('请求参数：', postData)
    if (toast) {
      wx.showLoading({
        title: '加载中...'
      })
    }
    wx.request(paras)
  })
}
module.exports = {
  request,
  regeneratorRuntime
}
