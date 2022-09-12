//对axios进行二次封装，使用请求拦截器和响应拦截器
import axios from 'axios'
//利用axios对象的方法create，去创建一个axios实例
//request就是一个axios，要稍微配置一些
const requests = axios.create({
    baseURL:"/api", //基础路径，发送请求的时候路径中会出现api
    timeout:5000 //请求超时的时间
})
//请求拦截器，在发送请求之前，请求拦截器可以监测到，在发送请求前做一些业务逻辑
requests.interceptors.request.use((config) => {
    //config配置对象,对象里headers属性很重要
    return config
})
requests.interceptors.response.use( //响应拦截器
    (res) => { //响应成功的回调，服务器响应数据回来以后，响应拦截器监测到，可以做些业务逻辑
        return res.data
},
    (error) => { //响应失败的回调函数
        return Promise.reject(new Error('fail'))
})
export default requests