/*
 * @Author: TinsFox
 * @Date: 2020-12-15 10:43:16
 * @LastEditors: TinsFox
 * @LastEditTime: 2020-12-15 11:07:40
 * @Description: 
 */
const app = getApp();
import {
  config
} from "./config"
const prefixKey = `${config.key}-${config.version}-`
export const CacheSet = (key, value) => {
  if (key && value) {
    wx.setStorageSync(prefixKey + key, value)
  } else {
    wx.showToast({
      title: 'api参数错误',
      icon: "none"
    })
  }
}
export const CacheGet = (key) => {
  if (key) {
    const value = wx.getStorageSync(prefixKey + key)
    return value
  } else {
    wx.showToast({
      title: 'api参数错误',
      icon: "none"
    })
  }
}