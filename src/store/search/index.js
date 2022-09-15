//search模块化Vuex
import { reqGetSearchInfo } from "@/api"
const actions ={
    async getSearchList({commit},value = {}) {
        //当前这个reqGetSearchInfo函数调用获取服务器数据时候，至少传递一个参数
        let result = await reqGetSearchInfo(value)
        if(result.code==200) {
            commit('GETSEARCHLIST',result.data)
        }
    }
} //处理action，可以书写自己的业务逻辑，可以处理异步
const mutations = {
    GETSEARCHLIST(state,value) {
        state.searchList = value
    }
} //修改state的唯一手段
const state = {
    searchList:{}
} //仓库存储数据的地方
const getters = {} //理解为计算属性，用于简化仓库，让组件获得仓库的数据
export default {
    state,
    mutations,
    actions,
    getters
}