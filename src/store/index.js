import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import home from './home'
import search from './search'

export default new Vuex.Store({
    modules:{  //Vuex模块化
        home,
        search
    }
})