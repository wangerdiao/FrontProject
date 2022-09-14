import Vue from 'vue'
import App from './App.vue'
//三级联动----注册全局组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name,TypeNav)
Vue.config.productionTip = false
//引入路由
import router  from '@/router'
import store  from '@/store'  // 引入Vuex.store
import '@/mock/mockServer' //引入mock数据
new Vue({
  render: h => h(App),
  //注册路由信息,所有组件都有了$route,$router属性
  router,
  store //注册store，每个组件上与$store方法
}).$mount('#app')
