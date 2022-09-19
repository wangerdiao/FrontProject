//search模块化Vuex
import { reqGetShopCarList } from "@/api"
const actions ={
   async getShopCartList({commit}) { //获取购物车列表数据
    let result = await reqGetShopCarList()
    console.log(result)
   }
} //处理action，可以书写自己的业务逻辑，可以处理异步
const mutations = {
   
} //修改state的唯一手段
const state = {
    
} //仓库存储数据的地方
const getters = {//类似于计算属性
    
} //理解为计算属性，用于简化仓库，让组件获得仓库的数据
export default {
    state,
    mutations,
    actions,
    getters
}