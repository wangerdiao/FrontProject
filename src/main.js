import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
//引入路由
import router  from '@/router'
new Vue({
  render: h => h(App),
  //注册路由信息,所有组件都有了$route,$router属性
  router
}).$mount('#app')
