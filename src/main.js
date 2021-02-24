import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// iview
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);

// fontawsome
import '@fortawesome/fontawesome-free/css/all.css'

// bootstrap-24
import './assets/bootstrap-24-4.4.1-dist/css/bootstrap.css'

// 全局样式
import './assets/style/allStyle.less'

// 组件注册
import allCom from './script/allCom'
for (const key in allCom) {
  Vue.component(key, allCom[key]);
}

Vue.config.productionTip = false

// 工具类
import tools from './script/tools';
Vue.prototype.$tools = tools;

// axios 封装请求
import request from './script/request';
Vue.prototype.$request = request;

// 权限检查
import authority from './script/authority';
for (const key in authority) {
  Vue.prototype[`$${key}`] = authority[key];
}

router.beforeEach((to, from, next) => {
  // 登录检查
  if (to.path != "/") {
    let userLogined = store.state.userLogined;
    if (!userLogined) {
      return next("/");
    }
  };
  // 添加历史
  !to.meta.unHistory ? store.commit('addHistory', to) : "";
  // 检查权限
  // 检查资源
  if (to.meta.resources && to.meta.resources.length > 0) {
    return authority.authres(to.meta.resources) ? next() : next("/Error403");
  }
  // 检查角色
  if (to.meta.roles && to.meta.roles.length > 0) {
    return authority.authrol(to.meta.roles) ? next() : next("/Error403");
  }
  next();
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')