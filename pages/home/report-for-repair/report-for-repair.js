/*
 * @Author: TinsFox
 * @Date: 2020-12-15 10:20:06
 * @LastEditors: TinsFox
 * @LastEditTime: 2020-12-15 16:40:33
 * @Description: 
 */
import {
  qaTypes,
  loadQa
} from "../../../api/room"
import room from "../../../utils/picker.room"
import {
  postOrder
} from "../../../api/order"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList: room,
    stepsList: [{
      name: '故障分析'
    }, {
      name: '填保修单'
    }, {
      name: '成功'
    }],
    curStep: 0,
    qaTypes: [],
    qaQuestion: {},
    form: {
      ordererPhone: "",
      urgent: 1,
      flag: true
    },
    analysis: 0
  },
  // {"classroom":"A1-102","equipmentType":10001,"problem":"fox test","ordererPhone":"13924387832","urgent":1}
  qaType(e) {
    const item = e.currentTarget.dataset.item
    this.setData({
      analysis: 1,
      ['form.equipmentType']: item.id,
      ['form.equipment']: item.title
    })
    console.log(this.data.qaQuestion[item.id])
  },
  qaQuestion(e) {
    const qaQuestion = e.currentTarget.dataset.id
    this.setData({
      curStep: 1,
      ['form.problem']: qaQuestion.question
    })
    console.log(this.data.form)
  },
  loadQa(id) {
    loadQa(id).then(res => {
      res.sort(this.up)
      this.setData({
        [`qaQuestion.${id}`]: res
      })
    })
  },
  up(x, y) {
    return x.sort - y.sort
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qaTypes().then(res => {
      this.setData({
        qaTypes: res
      })
      for (let item of res) {
        this.loadQa(item.id)
      }
    })
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
  async submit() {
    let form = this.data.form
    if (form.ordererPhone == '') {
      form.ordererPhone = "-"
    }
    console.log(form)
    form.problem = form.problem + "-开发测试订单"
    await this.SubscribeMessage()
    postOrder(form).then(res => {
      console.log(res)
      if (res.repairItemId) {
        wx.redirectTo({
          url: `/pages/home/order/order-detail/order-detail?id=${res.repairItemId}`
        })
      }
    })
  },
  SubscribeMessage() {
    return new Promise((resolve, resject) => {
      const tmplIds = ["K-wPOtsViEg_FZreNKRu0cYgQgl_JruGNzGt5nunGnw"]
      wx.getSetting({
        withSubscriptions: true, // 是否获取用户订阅消息的订阅状态，默认false不返回
        success(res) {
          if (res.authSetting['scope.subscribeMessage']) { // 用户点击了“总是保持以上，不再询问”
            wx.openSetting({ // 打开设置页
              success(res) {
                console.log(res.authSetting)
              }
            });
          } else { // 用户没有点击“总是保持以上，不再询问”则每次都会调起订阅消息
            console.log(tmplIds)
            wx.requestSubscribeMessage({
              tmplIds: tmplIds,
              success(res) {
                console.log(res)
                resolve(res)
              },
              fail: (res) => {
                console.log(res)
                resject(res)
              }
            })
          }
        }
      })
    })
  },
  now(e) {
    this.setData({
      ['form.flag']: e.detail.value,
      ['form.urgent']: e.currentTarget.dataset.urgent
    })
  },
  complete3(e) {
    wx.showToast({
      title: e.detail.text,
      icon: "none"
    })
    console.log(e.detail.text)
    this.selectRoom()
    setTimeout(() => {
      this.setData({
        ['form.classroom']: e.detail.text
      })
    }, 300)
  },
  PickerChange(e) {
    console.log(e)
    console.log(this.data.qaTypes[e.detail.value])
    this.setData({
      ['form.equipmentType']: this.data.qaTypes[e.detail.value].id,
      ['form.equipment']: this.data.qaTypes[e.detail.value].title
    })
  },
  selectRoom() {
    this.setData({
      show: !this.data.show
    })
  },
  textareaAInput(e) {
    this.setData({
      currentQuestion: e.detail.value
    })
    if (this.data.currentQuestion.length > 100) {
      wx.showToast({
        title: '字数过长',
      })
    }
  },
})