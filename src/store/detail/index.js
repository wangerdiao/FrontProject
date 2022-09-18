//search模块化Vuex
import { reqGetGoodsInfo } from "@/api"
const actions ={
    async getGoodInfo({commit},skuId) {
        let result = await reqGetGoodsInfo(skuId)
        if(result.code == 200) {
            commit('GETGOODINFO',result.data)
        }
    }
} //处理action，可以书写自己的业务逻辑，可以处理异步
const mutations = {
    GETGOODINFO(state,value) {
        state.goodInfo = value
    }
} //修改state的唯一手段
const state = {
    goodInfo:{}
} //仓库存储数据的地方
const getters = {//类似于计算属性
    categoryView(state) {
        //state.goodInfo初始状态为空对象，空对象的categoryView属性值为undefined,所以要加上 || {}
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
} //理解为计算属性，用于简化仓库，让组件获得仓库的数据
export default {
    state,
    mutations,
    actions,
    getters
}