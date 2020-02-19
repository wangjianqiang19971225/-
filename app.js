import {
  request,
  regeneratorRuntime
} from './utils/request.js'
App({
  globalData: {
    userInfo: null,
    show: null,
    area:null,
    hidden:null
  },
  onLaunch: function () {
  },

  citySelect:{
    provriceId:null, //省
    cityId:null,    //市
    districtId:null  //区
  },
})
