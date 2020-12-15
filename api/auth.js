/*
 * @Author: TinsFox
 * @Date: 2020-11-24 09:32:13
 * @LastEditors: TinsFox
 * @LastEditTime: 2020-12-15 11:08:58
 * @Description: 
 */
export const wxCode = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        resolve(res.code)
      },
      fail(err) {
        console.log(err);
        reject(new Error('登录失败'))
      }
    })
  })
}
export const login = (data) => {
  return wx.$http._fetch({
    url: '/public/wx/login',
    data: data,
    method: "POST"
  })
}