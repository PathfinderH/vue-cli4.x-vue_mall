//入口文件
import 'amfe-flexible';

//导入 Vue 
import Vue from 'vue'
//导入 App 根组件
import app from './App.vue'

import VueRouter from 'vue-router'
//导入路由配置文件
import router from './router'
//导入vuex文件
import store from './store'



// import 'vant/lib/index.css';
// import 'vant/lib/icon/local.css';


//按需引入vant
import './plugins/vant'

import NProgress from 'nprogress'


import axios from 'axios'

//axios全局配置公共请求地址
axios.defaults.baseURL = 'http://39.99.195.220/'



axios.interceptors.request.use(config => {
    NProgress.start()
    return config
})
axios.interceptors.response.use(config => {
    NProgress.done()
    return config
})



Vue.prototype.$axios = axios

Vue.config.productionTip = false

Vue.use(VueRouter)

new Vue({
    el: '#app',
    render: h => h(app),
    router,
    store,
})

window.addEventListener('storage', function() {
    localStorage.clear();
    location.reload();
});