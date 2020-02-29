// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { parseTime} from "@/utils/mine";

Vue.use(ElementUI)
axios.defaults.withCredentials = true    //全局设置axios允许携带cookie进行访问
Vue.use(VueAxios, axios);
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.parseTime = parseTime

Vue.prototype.msgSuccess = function (msg) {
  this.$message({ showClose: true, message: msg, type: "success" });
}

Vue.prototype.msgError = function (msg) {
  this.$message({ showClose: true, message: msg, type: "error" });
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
