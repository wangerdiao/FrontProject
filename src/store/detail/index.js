//search模块化Vuex
import { reqGetGoodsInfo,reqGetOrUpdateShopCar } from "@/api"
const actions ={
    async getGoodInfo({commit},skuId) { //获取产品详细信息
        let result = await reqGetGoodsInfo(skuId)
        if(result.code == 200) {
            commit('GETGOODINFO',result.data)
        }
    },
    async addOrUpdateShopCar({commit},{skuId,skuNum}) { //将产品添加至购物车
        //加入购物车后（发送请求），前台将参数带给服务器，服务器录入数据后返回code=200，不返回其他数据
        let result = await reqGetOrUpdateShopCar(skuId,skuNum)
        if(result.code == 200) {
            return 'ok'  //添加购物车成功，返回给Detail组件
        }else {
            return Promise.reject(new Error('fail'))//添加购物车失败，返回给Detail组件
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