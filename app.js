/*
 * @Author: TinsFox
 * @Date: 2020-11-24 09:32:13
 * @LastEditors: TinsFox
 * @LastEditTime: 2020-12-15 17:16:54
 * @Description: 
 */
//app.js
import MiniRouter from './routes/routes' //路由
import Store from "./utils/store"; //全局变量
import http from "./utils/http"
import {
  CacheSet,
  CacheGet
} from "./utils/cache"
import {
  wxCode,
  login
} from "/api/auth"
App({
  async initLogin() {
    let code = await wxCode()
    login({
      code: code
    }).then(res => {
      wx.$CacheSet("token", res.token)
      let user = res
      delete user.token
      delete user.sessionKey
      switch (user.role) {
        case 1:
          user.role = "visitor"
          break
        case 4:
          user.role = "staff"
          break
        case 5:
          user.role = "leader"
          break
        case 6:
          user.role = "room";
          break
        case 7:
          user.role = "teacher"
          break
        case 9:
          user.role = "admin"
          break
      }
      wx.$store.setState({
        user: user
      });
    })
  },
  onLaunch: function () {
    wx.$router = new MiniRouter()
    // this.$http=http
    wx.$http = http
    wx.$CacheGet = CacheGet
    wx.$CacheSet = CacheSet
    wx.$store = new Store({
      state: {
        version: "2.0.0"
      },
    });
    // 登录
    this.initLogin()
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
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
  // 全局变量
  globalData: {
    userInfo: null
  },
  // 网络请求
  // http : http
})