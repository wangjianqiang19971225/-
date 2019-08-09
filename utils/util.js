// yyyy - MM - dd HH: mm: ss
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const formatTime = (timestamp, isFormat, format = 'yyyy.MM.dd HH:mm') => {
  const date = new Date(parseInt(timestamp))
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  let dateArr = [year, month, day, hour, minute, second].map(formatNumber)
  format = format.replace('yyyy', dateArr[0])
  format = format.replace('MM', dateArr[1])
  format = format.replace('dd', dateArr[2])
  format = format.replace('HH', dateArr[3])
  format = format.replace('mm', dateArr[4])
  format = format.replace('ss', dateArr[5])
  return format
}

const formatTimes = (timestamp, isFormat, format = 'yyyy年MM月dd日 HH:mm') => {
  const date = new Date(parseInt(timestamp))
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  let dateArr = [year, month, day, hour, minute, second].map(formatNumber)
  format = format.replace('yyyy', dateArr[0])
  format = format.replace('MM', dateArr[1])
  format = format.replace('dd', dateArr[2])
  format = format.replace('HH', dateArr[3])
  format = format.replace('mm', dateArr[4])
  format = format.replace('ss', dateArr[5])
  return format
}

function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500
  }

  let _lastTime = null

  // 返回新的函数
  return function () {
    let _nowTime = + new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments)   //将this和参数传给原函数
      _lastTime = _nowTime
    }
  }
}

// 微信小程序BindTap快速连续点击目标页面跳转多次问题处理
/*
   小程序基于MINA框架，该框架的核心框架的核心是一个响应的数据绑定系统，整个系统分为两块视图层（View）和逻辑层（App Service），框架可以让数据与视图非常简单地保持同步。当做数据修改的时候，只需要在逻辑层修改数据，视图层就会做相应的更新；当点击按钮的时候，视图层会发送 bindtap的事件给逻辑层，逻辑层找到对应的事件处理函数loadMulti执行。

        由于视图层发送bindtap事件给逻辑层并找到对应的处理函数需要时间T1，找到对应的处理函数loadMulti后，执行loadMulti函数：wx.navigateTo, hide 原页面，需要时间T2，如果在T1+T2时间内，快速连续点击N次，完全可以加载显示N次目标页面。
解决办法：

  在页面生命周期函数 onShow中 写入 this.pageLoading = !1; // false
  在点击事件函数中先判断
  if (!this.pageLoading) { // 取反， 如果是true继续执行
      this.pageLoading = !0; // 初始化默认状态，fasle
      wx.navigateTo({ // 页面进行跳转
        url: '/pages/loadOnce/index',
      })
  }

 */

module.exports = {
  formatTime: formatTime,
  formatTimes: formatTimes,
  throttle: throttle
}