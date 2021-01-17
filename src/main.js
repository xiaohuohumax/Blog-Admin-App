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
import './mode/bootstrap-24-4.4.1-dist/css/bootstrap.css'

// 全局样式
import './style/allStyle.less'

// 组件注册
import allCom from './script/allCom'
for (const key in allCom) {
  Vue.component(key, allCom[key]);
}

Vue.config.productionTip = false

import tools from './script/tools';

Vue.prototype.$tools = tools;

import request from './script/request';

Vue.prototype.$request = request;

router.beforeEach((to, from, next) => {
  // if (to.path != "/") {
  //   let userLogined = store.state.userLogined;
  //   if (!userLogined) {
  //     return next("/");
  //   }
  // };
  !to.meta.unHistory ? store.commit('addHistory', to) : "";
  next();
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')