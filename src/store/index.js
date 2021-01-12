import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    history: []
  },
  mutations: {
    // 添加路由记录
    addHistory(state, data) {
      !state.history.some(val => {
        return val.path == data.path && val.name == data.name;
      }) ? state.history.push({
        ...data
      }) : "";
    },
    // 删除记录
    removeHistory(state, index) {
      state.history.splice(index, 1);
    }
  },
  actions: {},
  modules: {}
})