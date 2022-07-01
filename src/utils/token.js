// 此文件封装三个方法来专门操作token
const key = 'SGU'
// 设置token
export const setToken = (token) => {
  localStorage.setItem(key, token)
}
// 获取token
export const getToken = () => {
  return localStorage.getItem(key)
}
// 删除token
export const removeToken = (key) => {
  localStorage.removeItem(key)
}
