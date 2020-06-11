// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui'
import BaiduMap from 'vue-baidu-map'
import vueJsonp from 'vue-jsonp'
import 'element-ui/lib/theme-chalk/index.css'

import '@/assets/styles/main.scss'

Vue.use(ElementUI)
Vue.use(vueJsonp)
Vue.use(BaiduMap, {
  ak: "R4CDxvXyrec"
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, //使用store
  components: {
    App
  },
  template: '<App/>'
})
