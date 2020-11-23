const api = require('../utils/api.js')

export const login = () => {
  return api._fetch({
    url: '/list',
    data: data,
  })
}
api._fetch({
  url: '/list',
  data: data,
}).then(function (res) {
  console.info(res)
}).catch(function (error) {
  console.log(error);
});
api._fetch({
  url: '/list',
  data: data,
  method: 'post'
}).then(function (res) {
  console.info(res)
}).catch(function (error) {
  console.log(error);
});

// 单个请求
api.get('list').then(res => {
  console.log(res)
}).catch(e => {
  console.log(e)
})

// 一个页面多个请求
Promise.all([
  api.get('list'),
  api.get('list2')
]).then(result => {
  console.log(result)
}).catch(e => {
  console.log(e)
})