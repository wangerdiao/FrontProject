//search模块化Vuex
import {reqGetCode,reqUserRegister,reqUserLogin} from "@/api"
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
    async userLogin({commit},data) {
        let result = await reqUserLogin(data)
        if(result.code==200) {
            commit('USERLOGIN',result.data.token)  //token用户唯一标识
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
    }
} //修改state的唯一手段
const state = {
    code:'',
    token:''
} //仓库存储数据的地方
const getters = {//类似于计算属性
    
} //理解为计算属性，用于简化仓库，让组件获得仓库的数据
export default {
    state,
    mutations,
    actions,
    getters
}