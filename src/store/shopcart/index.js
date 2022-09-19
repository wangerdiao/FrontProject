//search模块化Vuex
import { reqGetShopCarList,reqDeleteCart,reqIsChecked } from "@/api"
const actions ={
   async getShopCartList({commit}) { //获取购物车列表数据
    let result = await reqGetShopCarList()
    if(result.code == 200) {
        commit('GETSHOPCARTLIST',result.data)
    }
   },
   async deleteCartList({commit},skuId) { //删除购物车某一产品
    let result =await reqDeleteCart(skuId)
    if(result.code ==200) {
        return 'ok'
    }else {
        return Promise.reject(new Error('fail'))
    }
   },
   async isChecked({commit},{skuId,isChecked}) { //勾选购物车的复选框
    let result = await reqIsChecked(skuId,isChecked)
    if(result.code ==200) {
        return 'ok'
    }else {
        return Promise.reject(new Error('fail'))
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