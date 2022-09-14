//home模块化Vuex
import {reqCategoryList,reqGetBannerList} from '@/api'
const actions ={
    async categoryList({commit}) { //通过API接口发送请求获取数据
        let result = await reqCategoryList()
        if(result.code === 200) {
            commit('CATEGORYLIST',result.data)
        }
    },
    async getBannerList({commit}) {
        let result = await reqGetBannerList()  //发送获取轮播图的请求
        if(result.code == 200) {
            commit('GETBANNERLIST',result.data)
        }
    }
} //处理action，可以书写自己的业务逻辑，可以处理异步
const mutations = {
    CATEGORYLIST(state,value) {
        state.categoryList = value  //将轮播图数据存储到仓库
    },
    GETBANNERLIST(state,value) {
        state.bannerList = value
    }
} //修改state的唯一手段
const state = { //state中数据默认初始值别瞎写，服务器返回对象起始值就是对象，服务器返回数组起始值就是数组
    categoryList:[],  //全部商品分类数据
    bannerList:[] //轮播图数据
} //仓库存储数据的地方
const getters = {} //理解为计算属性，用于简化仓库，让组件获得仓库的数据
export default {
    state,
    mutations,
    actions,
    getters
}