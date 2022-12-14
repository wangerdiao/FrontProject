import Vue from 'vue'
import App from './App.vue'
//三级联动----注册全局组件
import TypeNav from '@/components/TypeNav'  //注册全局组件
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import * as API from '@/api' //统一引入API文件夹里的全部请求函数
import {MessageBox} from 'element-ui'; //引入element 组件
Vue.prototype.$msgbox = MessageBox; //挂载到原型上
Vue.prototype.$alert = MessageBox.alert;
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
Vue.config.productionTip = false
//引入路由
import router  from '@/router'
import store  from '@/store'  // 引入Vuex.store
import '@/mock/mockServer' //引入mock数据
import 'swiper/css/swiper.css' //引入swiper样式
import VueLazyload from 'vue-lazyload' //引入懒加载
import mdz from '@/assets/1.png'
Vue.use(VueLazyload, {
  loading: mdz//懒加载默认的图片
})
import '@/plugins/validate'
new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线
    Vue.prototype.$API = API //使全局组件都能使用API
  },
  render: h => h(App),
  //注册路由信息,所有组件都有了$route,$router属性
  router,
  store //注册store，每个组件上与$store方法
}).$mount('#app')
