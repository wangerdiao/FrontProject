import Vue from 'vue'
import VueRouter  from 'vue-router'
Vue.use(VueRouter)
//引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
//配置路由
export default new VueRouter({
    routes:[
    {
        path:'/home',
        component:Home
    },
    {
        path:'/login',
        component:Login
    },
    {
        path:'/search',
        component:Search
    },
    {
        path:'/register',
        component:Register
    },
    //重定向,定向到主页面
    {
        path:'*',
        redirect:'/home'
    }
]
})