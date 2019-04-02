import axios from 'axios'

export default ({ Vue }) => {
  Vue.prototype.$axios = axios.create({
    baseURL: process.env.API
  })
  Vue.prototype.$NodePackage = require('../../package.json')
}
