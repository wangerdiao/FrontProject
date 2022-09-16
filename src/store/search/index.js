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
const getters = {//类似于计算属性
    goodsList(state) { //形参state为当前仓库中的state
        return state.searchList.goodsList || []  //以防万一网络不给力，数据还没有获取到，至少传递个空数组
    },
    trademarkList(state) { 
        return state.searchList.trademarkList || []
    },
    attrsList(state) { 
        return state.searchList.attrsList || []
    }
} //理解为计算属性，用于简化仓库，让组件获得仓库的数据
export default {
    state,
    mutations,
    actions,
    getters
}