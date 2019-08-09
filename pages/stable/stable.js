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
    array: [],
    index: 0,
    default: '请选择类型',
    arrayId: '',
    card1: '',
    crad2: '',
    cord3: '',
    img1: '',
    img2: '',
    img3: '',
    name: '',
    phone: '',
    address: '',
    business: '',
    credit: '',
  },
  //点击上传身份证正面 调取相机和相册
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
          url: "https://lw.gyfledu.com/api/Uploadify/upFile", //这个方法就是后台处理上传的方法
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
  getcamera2: function (options) {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res)
        wx.uploadFile({
          url: "https://lw.gyfledu.com/api/Uploadify/upFile",
          filePath: res.tempFilePaths[0],
          name: 'file',
          success: function (info) {
            console.log(info)
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
              card2: imgjson.data,
              img2: res.tempFilePaths[0]
            })
          }
        })
      }
    })
  },
  getcamera3: function (options) {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res)
        wx.uploadFile({
          url: "https://lw.gyfledu.com/api/Uploadify/upFile",
          filePath: res.tempFilePaths[0],
          name: 'file',
          success: function (info) {
            console.log(info)
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
              card3: imgjson.data,
              img3: res.tempFilePaths[0]
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate()
    this.BusinessType()
  },

  //报错
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
      address: {
        required: true
      },
      business: {
        required: true,
      },
      credit: {
        required: true,
        minlength: 18
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
      address: {
        required: '请输入地址'
      },
      business: {
        required: '请填写商户名称',
      },
      credit: {
        required: '请输入您的统一社会信用代码',
        minlength: '请输入正确的统一社会信用代码'
      },
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  //调用验证函数
  formSubmit: function (e) {
    // console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    const params = e.detail.value
    const name = e.detail.value.name
    const phone = e.detail.value.phone
    const address = e.detail.value.address
    const business = e.detail.value.business
    const credit = e.detail.value.credit
    console.log(e)
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    const card1 = this.data.card1
    const card2 = this.data.card2
    const card3 = this.data.card3
    const arrayname = this.data.default
    const arrayId = this.data.arrayId
    console.log(card1)
    console.log(card2)
    console.log(card3)

    if (card1 == undefined || card2 == undefined || card3 == undefined || arrayId == "") {
      this.showModal({
        msg: '请您完善信息'
      })
    } else {
      this.regBusiness(name, phone, address, business, credit, card1, card2, card3, arrayId, arrayname)
      this.showModal({
        msg: '申请成功'
      })
      wx.navigateBack({
        delta: 1
      })
    }

  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let index = e.detail.value
    let array = this.data.array
    this.setData({
      index,
      default: array[index].group_name,
      arrayId: array[index].shop_group_id
    })
  },
  BusinessType: async function () {
    let data = {
      token: wx.getStorageSync('token')
    }
    let BusinessType = await request('BusinessType', data, true, 'POST')
    console.log(BusinessType.data)
    this.setData({
      array: BusinessType.data
    })
  },
  regBusiness: async function (name, phone, address, business, credit, card1, card2, card3, arrayId, arrayname) {
    let data = {
      token: wx.getStorageSync('token'),
      user_name: name,
      contacts_phone: phone,
      company_address_detail: address,
      company_name: business,
      business_social_credit_code: credit,
      shop_group_name: arrayname,
      shop_group_id: arrayId,
      business_licence_number_electronic: card1,
      contacts_card_electronic_2: card2,
      contacts_card_electronic_3: card3,
    }
    let regBusiness = await request('regBusiness', data, true, 'POST')
    console.log(regBusiness.data)


    // if (regBusiness.data.code == 1) {

    // } else {
    //   this.showModal({
    //     msg: regBusiness.data.msg
    //   })
    // }
  }
})
