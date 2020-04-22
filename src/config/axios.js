import axios from 'axios'

var myaixos = {}
myaixos.install = function (Vue) {
  axios.defaults.baseURL = 'http://cangdu.org:8001/'
  axios.defaults.withCredentials = true // 请求后带上cookie
  axios.interceptors.request.use(function (config) {
    return config
  })

  Vue.prototype.$http = axios
}
export default myaixos
