//search模块化Vuex
import {reqGetCode,reqUserRegister,reqUserLogin,reqGetUserInfo,loginOut} from "@/api"
import {getToken,setToken,removeToken} from '@/utils/token'
const actions ={
   async getCode({commit},phone) { //获取验证码
    let result = await reqGetCode(phone)
    if(result.code == 200) {
        commit('GETCODE',result.data)
        return 'ok'
    }else {
        return Promise.reject(new Error('fail'))
    }
   },
   async userRegister({commit},data) { //获取验证码
    let result = await reqUserRegister(data)
    console.log(result)
    if(result.code == 200) {
        return 'ok'
    }else {
        return Promise.reject(new Error('fail'))
    }},
    async userLogin({commit},data) { //用户登录
        let result = await reqUserLogin(data)
        if(result.code==200) {
            commit('USERLOGIN',result.data.token)  //token用户唯一标识
            setToken(result.data.token)
            return 'ok'
        }else {
            return Promise.reject(new Error('fail'))
        }
    },
    async getUserInfo({commit}) { //获取用户信息
        let result = await reqGetUserInfo()
        if(result.code == 200) {
            commit('GETUSERINFO',result.data)
            return 'ok'
        }else {
            return Promise.reject(new Error('fail'))
        }
    },
    async userLoginOut({commit}) { //退出登录
        let result = await loginOut()
        if(result.code==200) {
            commit('CLEAR')
            return 'ok'
        }else {
            return Promise.reject(new Error('fail'))
        }
    }
} //处理action，可以书写自己的业务逻辑，可以处理异步
const mutations = {
    GETCODE(state,value){
        state.code = value
    },
    USERLOGIN(state,token) {
        state.token = token
    },
    GETUSERINFO(state,value) {
        state.userInfo = value 
    },
    CLEAR(state) { //清除数据
        state.token = '',
        state.userInfo = {},
        removeToken()
    }
} //修改state的唯一手段
const state = {
    code:'',
    token:getToken(),
    userInfo:{}
} //仓库存储数据的地方
const getters = {//类似于计算属性
    
} //理解为计算属性，用于简化仓库，让组件获得仓库的数据
export default {
    state,
    mutations,
    actions,
    getters
}