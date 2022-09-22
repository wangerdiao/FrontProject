import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routes from './routes'
import store from '@/store'
//重新写push/replace
//接受三个参数,第一个参数告诉原来push往哪里跳,第二个参数成功回调,第三个参数失败回调
//call || apply相同点:都可以调用函数一次,都可以篡改函数上下文一次
//不同点:call传递参数用逗号隔开,apply传递数组
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        // console.log(this)//this指向组件实例
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}
//配置路由
const router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
      },
})
//路由全局守卫
router.beforeEach(async (to,from,next) => {
    next()
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    if(token) { //用户登录了，获取到了token
        if(to.path=='/login') { //登录后想要去登录页面
            next('/') //不允许
        }else {
            if(name) {  //用户信息存在
                next() //允许跳转
            }else {  //没有用户信息就派发action获取用户信息
                try {
                    await store.dispatch('getUserInfo') //获取用户信息成功
                    next()
                } catch (error) { //获取token失效了，需要重新登录
                    await store.dispatch('userLoginOut')
                    next('/login')
                }
            }
        }
    }else { //未登录状态，不能访问交易相关，支付相关，不能去个人中心
        let toPath = to.path
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1|| toPath.indexOf('/center')!=-1) { 
            next('/login?redirect='+toPath) //把未登录时想去的路径放到query参数里，登陆后跳转到query参数的路径
        }
    }
}) 
export default router