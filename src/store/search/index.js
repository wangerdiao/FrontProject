//search模块化Vuex
const state = {} //仓库存储数据的地方
const mutations = {} //修改state的唯一手段
const actions ={} //处理action，可以书写自己的业务逻辑，可以处理异步
const getters = {} //理解为计算属性，用于简化仓库，让组件获得仓库的数据
export default {
    state,
    mutations,
    actions,
    getters
}