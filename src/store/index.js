import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    history: [],
    userKey: "", // token
    userLogined: false, // 是否登录
    userInf: {}, // 用户信息
    uploadFileList: [
      //   {
      //   path: {},
      //   file: {}
      // }
    ], // 文件上传列表
    fileRefsh: 0, // 文件刷新
  },
  mutations: {
    // 提示文件刷新
    addFileRefsh(state) {
      state.fileRefsh += 1;
    },
    // 添加文件上传
    addUploadFile(state, inf) {
      state.uploadFileList.push({
        ...inf,
        steep: 0,
        stat: 0, // 0 未处理 1 上传中 2 上传成功 3 上传失败
      })
    },
    // 取消上传
    clearAllUploadFile(state) {
      state.uploadFileList = [];
    },
    // 清除已上传
    clearUploadFile(state) {
      for (let x = state.uploadFileList.length - 1; x >= 0; x--) {
        let item = state.uploadFileList[x];
        if (item.stat != 0 && item.stat != 1) {
          state.uploadFileList.splice(x, 1);

        }
      }
    },
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
  getters: {
    unUploadFileList(state) {
      return state.uploadFileList.filter(val => val.stat == 0)
    }
  },
  actions: {},
  modules: {}
})