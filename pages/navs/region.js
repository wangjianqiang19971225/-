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
    crad2: '',
    cord3: '',
    img2: '',
    img3: '',
    name: '',
    phone: '',
    address: '',
    longitude: '',
    latitude: '',
    LocationList: '请选择定位'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  onLoad: function (options) {
    this.initValidate()
    // this.BusinessType()
  },

  getLocation: function () {
    var that = this
    wx.chooseLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        console.log(res)
        that.setData({
          LocationList: res.address.slice(0, 10),
          longitude: res.longitude,
          latitude: res.latitude
        })
      }
    })
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
      }
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
    const card2 = this.data.card2
    const card3 = this.data.card3
    const longitude = this.data.longitude
    const latitude = this.data.latitude
    console.log(e)
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }

    if (card2 == undefined || card3 == undefined || card3 == longitude || card3 == latitude) {
      this.showModal({
        msg: '请您完善信息'
      })
    } else {
      this.regHouseKeeper(name, phone, address, card2, card3, longitude, latitude)
      this.showModal({
        msg: '申请成功'
      })
      wx.navigateBack({
        delta: 1
      })
    }
  },
  regHouseKeeper: async function (name, phone, address, card2, card3, longitude, latitude) {
    let data = {
      token: wx.getStorageSync('token'),
      house_name: name,
      company_phone: phone,
      company_address_detail: address,
      longitude: longitude,
      latitude: latitude,
      contacts_card_electronic_2: card2,
      contacts_card_electronic_3: card3,
    }
    let regHouseKeeper = await request('regHouseKeeper', data, true, 'POST')
    console.log(regHouseKeeper.data)

  },

})
