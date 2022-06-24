// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/gloable.css'
import axios from "axios";
import jqueryFrom from "jquery-form"
import VueAxios from 'vue-axios'
// 引入echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts



import $ from 'jquery'
axios.defaults.baseURL='http://localhost:8080/'
axios.defaults.withCredentials = true
axios.interceptors.request.use(config=>{
  //为请求头对象，添加token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem("token");
  return config
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
// 对响应数据做点什么
  var res=response.data
  if(res==='') {window.sessionStorage.setItem("login",'false');  console.log("相应错误");
  const login=window.sessionStorage.getItem("login");
  if(login=="false") {window.sessionStorage.clear();}}
  return response;
}, function (error) {
// 对响应错误做点什么
  return Promise.reject(error);
})
Vue.prototype.http=axios
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(jqueryFrom)
Vue.use(VueAxios,axios)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


//https://lianghj.top:8888/api/private/v1/
//http://192.168.88.238:8080/
