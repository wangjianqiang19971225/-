import {
  request,
  regeneratorRuntime
} from '../../utils/request.js'
import WxValidate from '../../utils/WxValidate.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    phone: '',
    txt: '',
    card1: '',
    img1: '',
    shop_id: ''
  },
  onLoad: function (options) {
    this.initValidate()
    this.setData({
      shop_id: options.shop_id
    })
  },

  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  //验证函数
  initValidate: function () {
    const rules = {
      name: {
        required: true,
        minlength: 2
      },
      phone: {
        required: true,
        tel: true
      },
      txt: {
        required: true,
      },

    }
    const messages = {
      name: {
        required: '请填写姓名',
        minlength: '请输入正确的名称'
      },
      phone: {
        required: '请填写手机号',
        tel: '请填写正确的手机号'
      },
      txt: {
        required: '请填写描述',
      },

    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  formSubmit: function (e) {
    // console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    const params = e.detail.value
    const name = e.detail.value.name
    const phone = e.detail.value.phone
    const txt = e.detail.value.txt
    const card1 = this.data.card1
    const shop_id = this.data.shop_id
    console.log(e)
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    this.classsudy(name, phone, card1, txt, shop_id)
    this.showModal({
      msg: '提交成功'
    })
    wx.navigateBack({
      delta: 1
    })



  },
  getcamera1: function (options) {
    var that = this
    // console.log(options)
    // console.log(that.data.card1)
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        // var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: "https://www.yizhiba.cn/api/classstudy/upload", //这个方法就是后台处理上传的方法
          filePath: res.tempFilePaths[0], //获取到上传的图片
          name: 'file',
          success: function (info) {
            console.log(info); //info.data就是上传成功的图片名称 您可以在wxml里面搞一个隐藏域存储起来，在上面Submit提交里拼装一块提交出去
            // console.log(tempFilePaths)
            let imgjson = JSON.parse(info.data)
            console.log(imgjson)
            if (imgjson.code == 1) {
              wx.showToast({
                title: imgjson.message,
                icon: 'none'
              })
              return false
            }
            that.setData({
              card1: imgjson.data,
              img1: res.tempFilePaths[0]
            })
            // console.log(that.data.card1)
          }
        })
      }
    })
  },
  classsudy: async function (name, phone, card1, txt, shop_id) {
    let data = {
      token: wx.getStorageSync('token'),
      control_content: txt,
      img: card1,
      name: name,
      connect_phone: phone,
      shop_id: shop_id
    }
    let classsudy = await request('classsudy', data, true, 'POST')
    console.log(classsudy.data)
  }
})
