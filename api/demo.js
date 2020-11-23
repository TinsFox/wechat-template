const app = getApp()
export const login = (data) => {
  console.log(app)
  return app.$http._refetch({
    url: '/list',
    data: data,
  })
}