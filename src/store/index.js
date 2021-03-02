import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    history: [],

    userLogined: false, // 是否登录
    userKey: "", // token
    userInf: {}, // 用户信息

    roles: [], // 角色
    resources: [], // 资源

    rolesChecked: [], // 角色已经验证过
    resourcessChecked: [], // 资源已经验证过

    menu: [], // 菜单
    uploadFileList: [
      //   {
      //   path: {},
      //   file: {}
      // }
    ], // 文件上传列表
    fileRefsh: 0, // 文件刷新

    informArr: [], // 通知
  },
  mutations: {
    // 添加通知
    addInform(state, inform) {
      state.informArr.unshift(inform)
    },
    // 添加角色已校验队列
    addRolesChecked(state, item) {
      state.rolesChecked.push(item);
    },
    // 添加资源已校验队列
    addResourcesChecked(state, item) {
      state.resourcessChecked.push(item);
    },
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
      if (data.inf && !data.inf.allowLogin) {
        return state.userLogined = false;
      }
      state.userKey = data.key;
      state.userInf = data.inf;
      state.roles = data.roles;
      state.menu = data.menu;
      state.resources = data.resources;
      state.userLogined = true;
      state.rolesChecked = [];
      state.resourcessChecked = [];
    },
    // 用户注销
    userLogout(state) {
      state.userLogined = false;
      state.rolesChecked = []; // 清除已检验队列
      state.resourcessChecked = []; // 清除已检验队列
      state.history = []; // 清除历史记录
    },
    // 添加路由记录
    addHistory(state, item) {
      // 不加入历史记录
      if (item.meta && item.meta.unHistory) return;

      let nameArray = state.history.map(val => val.name);
      let index = nameArray.lastIndexOf(item.name);

      if (index == -1) { // 首次浏览
        state.history.unshift(item)
      } else { // 再次浏览
        state.history.splice(index, 1)
        state.history.unshift(item)
      }
    },
    // 删除记录
    removeHistory(state, index) {
      state.history.splice(index, 1);
    },
    // 删除所有记录
    removeAllHistory(state) {
      state.history = []
    }
  },
  getters: {
    // 获取左侧菜单
    getLeftNav(state) {
      let rootMenu = state.resources.filter(val => val.kind);
      return {}
    },
    unUploadFileList(state) {
      return state.uploadFileList.filter(val => val.stat == 0)
    },
    // 获取资源授权码
    resCodes(state) {
      return state.resources.filter(val => val.code != "").map((val) => val.code.trim());
    },
    // 获取角色授权码
    rolCodes(state) {
      return state.roles.filter(val => val.code != "").map((val) => val.code.trim());
    }
  },
})