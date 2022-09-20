//对axios进行二次封装，使用请求拦截器和响应拦截器
import axios from 'axios'
import store from '@/store' 
//利用axios对象的方法create，去创建一个axios实例
//request就是一个axios，要稍微配置一些
import nprogress from 'nprogress'  //引入进度条  里面有start（进度条开始）,done（进度条结束）样式
import 'nprogress/nprogress.css' //引入进度条样式
const requests = axios.create({
    baseURL:"/api", //基础路径，发送请求的时候路径中会出现api
    timeout:5000 //请求超时的时间
})
//请求拦截器，在发送请求之前，请求拦截器可以监测到，在发送请求前做一些业务逻辑
requests.interceptors.request.use((config) => {
    if(store.state.detail.uuid) {
        //请求头添加字段：和后台商量好
        config.headers.userTempId = store.state.detail.uuid
    }
    if(store.state.user.token) { // 携带token
        config.headers.token = store.state.user.token
    }
    nprogress.start() //进度条开始
    //config配置对象,对象里headers属性很重要
    return config
})
requests.interceptors.response.use( //响应拦截器
    (res) => { //响应成功的回调，服务器响应数据回来以后，响应拦截器监测到，可以做些业务逻辑
        nprogress.done() //进度条结束
        return res.data
},
    (error) => { //响应失败的回调函数
        return Promise.reject(new Error('fail'))
})
export default requests