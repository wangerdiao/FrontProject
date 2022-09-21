//search模块化Vuex
import {reqGetUserAddress,reqGetOrderInfo} from "@/api"
const actions ={
   async getUserAdress({commit}) { //获取用户地址
    let result = await reqGetUserAddress()
    if(result.code == 200) {
        commit('GETUSERADDRESS',result.data)
    }
   },
   async getUserOrder({commit}) { //获取用户地址
    let result = await reqGetOrderInfo()
    if(result.code == 200) {
        commit('GETUSERORDER',result.data)
    }
   }
} //处理action，可以书写自己的业务逻辑，可以处理异步
const mutations = {
    GETUSERADDRESS(state,value) {
        state.address = value
    },
    GETUSERORDER(state,value) {
        state.orderInfo = value
    }
} //修改state的唯一手段
const state = {
    address:[],
    orderInfo:{}
} //仓库存储数据的地方
const getters = {//类似于计算属性
  
} //理解为计算属性，用于简化仓库，让组件获得仓库的数据
export default {
    state,
    mutations,
    actions,
    getters
}