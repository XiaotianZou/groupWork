// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import VueMaterial from 'vue-material'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'vue-material/dist/vue-material.min.css'
import 'muse-ui/dist/muse-ui.css'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import store from './vuex/store'
import 'lib-flexible'

Vue.use(Vuex);
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(MuseUI)
Vue.use(VueMaterial)
Vue.use(VueResource)

Vue.prototype.$ajax = axios



/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  created() {
    if (localStorage.getItem('isLogin') === null) {
      localStorage.setItem('isLogin', '');
    }
    this.$store.state.isLogin = localStorage.getItem('isLogin');
  },
  template: '<App/>',
})
