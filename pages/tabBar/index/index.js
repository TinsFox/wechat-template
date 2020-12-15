/*
 * @Author: TinsFox
 * @Date: 2020-11-24 22:56:05
 * @LastEditors: TinsFox
 * @LastEditTime: 2020-12-15 10:20:27
 * @Description: 
 */
// pages/tabBar/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList: [{
      name: '课室地图',
      src: '/images/icon1.png',
      url: '/pages/home/map/map'
    }, {
      name: '设备报修',
      src: '/images/icon2.png',
      url: "/pages/home/report-for-repair/report-for-repair"
    }, {
      name: '我的报修',
      src: '/images/icon3.png'

    }, {
      name: "排障手册",
      src: '/images/icon4.png'
    }]
  },
  userInfoHandler(data) {
    console.log(data)
    wx.BaaS.auth.loginWithWechat(data).then(user => {
      console.log(user)
      // user 包含用户完整信息，详见下方描述
    }, err => {
      // **err 有两种情况**：用户拒绝授权，HError 对象上会包含基本用户信息：id、openid、unionid；其他类型的错误，如网络断开、请求超时等，将返回 HError 对象（详情见下方注解）
    })
  },
  navTo(e) {
    console.log(e)
    const url = e.currentTarget.dataset.url
    console.log(url)
    wx.navigateTo({
      url: url,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})