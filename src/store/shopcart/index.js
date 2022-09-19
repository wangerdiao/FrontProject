//search模块化Vuex
import { reqGetShopCarList } from "@/api"
const actions ={
   async getShopCartList({commit}) { //获取购物车列表数据
    let result = await reqGetShopCarList()
    if(result.code == 200) {
        commit('GETSHOPCARTLIST',result.data)
    }
   }
} //处理action，可以书写自己的业务逻辑，可以处理异步
const mutations = {
    GETSHOPCARTLIST(state,value) {
        state.shopCartList = value
    }
} //修改state的唯一手段
const state = {
    shopCartList:[]
} //仓库存储数据的地方
const getters = {//类似于计算属性
    cartList() {
        return state.shopCartList[0] || {}
    }
} //理解为计算属性，用于简化仓库，让组件获得仓库的数据
export default {
    state,
    mutations,
    actions,
    getters
}