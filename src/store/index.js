import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    history: [],
    userKey: "", // token
    userLogined: false, // 是否登录
    userInf: {}, // 用户信息
  },
  mutations: {
    // 添加用户登录信息
    userLogin(state, data) {
      state.userKey = data.key;
      state.userInf = data.inf;
      state.userLogined = true;
    },
    // 用户注销
    userLogout(state) {
      state.userLogined = false;
    },
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