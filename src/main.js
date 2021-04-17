import Vue from 'vue'
import App from './App.vue'
import "./core/lazy_lib/element"
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
