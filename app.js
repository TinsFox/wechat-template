//app.js
import MiniRouter from './routes/routes'
import Store from "./utils/store";
let store = new Store({
  state: {
    msg: "这是一个全局状态",
    user: {
      name: "李四",
    },
    app:null
  },
});
console.log(store.getState().msg); //这是一个全局状态 1.2.6+
console.log(store.$state.msg); //这是一个全局状态 （不推荐）
console.log(store); //这是一个全局状态 （不推荐）
App({
  onLaunch: function () {
    console.log('_fetch',wx)
    console.log("app", this)
    this.$router = new MiniRouter()
    console.log("appAffter", this)
    store: store
    const that = this
    store.setState({
      app: that
    });
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})