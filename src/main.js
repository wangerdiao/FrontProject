import Vue from 'vue'
import App from './App.vue'
//三级联动----注册全局组件
import TypeNav from '@/pages/Home/TypeNav'
Vue.component(TypeNav.name,TypeNav)
Vue.config.productionTip = false
//引入路由
import router  from '@/router'
new Vue({
  render: h => h(App),
  //注册路由信息,所有组件都有了$route,$router属性
  router
}).$mount('#app')
