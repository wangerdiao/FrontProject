import Vue from 'vue'
import VueRouter  from 'vue-router'
Vue.use(VueRouter)
//引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
//重新写push/replace
//接受三个参数,第一个参数告诉原来push往哪里跳,第二个参数成功回调,第三个参数失败回调
//call || apply相同点:都可以调用函数一次,都可以篡改函数上下文一次
//不同点:call传递参数用逗号隔开,apply传递数组
let originPush = VueRouter.prototype.push
let originReplace= VueRouter.prototype.replace
VueRouter.prototype.push = function(location,resolve,reject) {
    if(resolve && reject){
        originPush.call(this,location,resolve,reject)
    }else{
        // console.log(this)//this指向组件实例
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace = function(location,resolve,reject) {
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}
//配置路由
export default new VueRouter({
    routes:[
    {
        path:'/home',
        component:Home,
        meta:{show:true} //配置元信息
    },
    {
        path:'/login',
        component:Login,
        meta:{show:false}
    },
    {
        name:'search',
        path:'/search/:keyword?', //指定params参数可传可不传
        component:Search,
        meta:{show:true},
        // props:true  布尔值,传递params参数
        // props:{keyWord:1} 对象写法
        // props($route) {  函数写法,传递query,params参数
        //     return {keyWord:$route.params}
        // }
    },
    {
        path:'/register',
        component:Register,
        meta:{show:false} 
    },
    //重定向,定向到主页面
    {
        path:'*',
        redirect:'/home'
    }
]
})