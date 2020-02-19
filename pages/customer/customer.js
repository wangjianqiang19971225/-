var app = getApp()
import {
  request,
  regeneratorRuntime
} from '../../utils/request.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scerweima: '',
    imgUrl: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    this.scerweima()
  },
  scerweima: async function () {
    let data = {
      url:wx.getStorageSync('uniqueid')
    }
    let scerweima = await request('getindexscrmer', data, false, 'POST')
    console.log(scerweima)
    this.setData({
      scerweima: scerweima.data
    })
    if(scerweima.code == 1){
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
  },
  getscrmer: async function () {
    let data = {
      url: wx.getStorageSync('uniqueid')
    }
    let getscrmer = await request('getscrmer', data, false, 'POST')
    console.log(getscrmer)
    this.setData({
      imgUrl: getscrmer.data
    })
    if(getscrmer.code == 1){
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
  },
  onShareAppMessage: function (res) {
    var that = this
    const uniqueid = wx.getStorageSync('uniqueid')
    if (res.from === 'button') {}
    return {
      title: "遛娃圈",
      path: '/pages/index/index?uniqueid=' + uniqueid,
      imageUrl: that.data.imgUrl,
    }

  },

  save() {
    let that = this
    this.getscrmer()
    //若二维码未加载完毕，加个动画提高用户体验
    wx.showToast({
      icon: 'loading',
      title: '正在保存图片',
      duration: 1000
    })
    // 判断用户是否授权"保存到相册"
    wx.getSetting({
      success(res) {
        //没有权限，发起授权
        console.log(res)
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() { //用户允许授权，保存图片到相册
              that.savePhoto();
            },
            fail() { //用户点击拒绝授权，跳转到设置页，引导用户授权
              wx.openSetting({
                success() {
                  wx.authorize({
                    scope: 'scope.writePhotosAlbum',
                    success() {
                      that.savePhoto();
                    }
                  })
                }
              })
            }
          })
        } else { //用户已授权，保存到相册
          that.savePhoto()
        }
      }
    })
  },
  //保存图片到相册，提示保存成功
  savePhoto() {
    let that = this
    wx.downloadFile({
      url: that.data.imgUrl,
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '保存成功',
              icon: "success",
              duration: 1000
            })
          }
        })
      }
    })
  },
})
