/*
 * @Author: TinsFox
 * @Date: 2020-12-15 16:19:36
 * @LastEditors: TinsFox
 * @LastEditTime: 2020-12-15 16:50:36
 * @Description:
 */
import {
  orderDetail
} from "../../../../api/order"
let id = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderData: {},
    id: 0
  },
  loadData() {
    orderDetail(id).then(res => {
      console.log(res)
      this.setData({
        orderData: res.records[0]
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    id = options.id
    this.loadData()
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