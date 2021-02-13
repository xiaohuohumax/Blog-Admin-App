import axios from 'axios';

import router from '../router'

import store from '../store/index'

import config from '../config'

const defaults = config.axios.defaults;
for (const key in defaults) {
  axios.defaults[key] = defaults[key];
}
// 附加请求头 
const headerAdd = config.axios.headerAdd;

const http = options => {
  return new Promise((resolve, reject) => {
    const defaultOptions = {};
    const newOptions = {
      ...defaultOptions,
      ...options
    };
    // 添加附加请求头
    newOptions.headers = {
      ...headerAdd,
      ...newOptions.headers,
    };
    axios({
      ...newOptions
    }).then(res => {
      if (res.status == 200) {
        resolve(res.data);
      } else {
        reject(res);
      }
    }).catch(err => {
      reject(err);
    })
  })
};


axios.interceptors.request.use(
  config => {
    // 携带 token
    // let userLogined = store.state.userLogined; // 用户是否登录
    // userLogined ? config.headers.authorization = store.state.userKey : "";
    return config;
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    const code = error.response && error.response.status;

    const codeFunc = {
      401() { // 未登录
        router.push("/");
      },
      403() { // 未授权
        router.push("/Error403");
      },
      500() { // 服务器抽风
        router.push("/Error500");
      }
    }

    let resFunc = codeFunc[code];
    resFunc ? resFunc() : "";
    return Promise.reject(error)
  }
)

export default http;