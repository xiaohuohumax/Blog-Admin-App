import axios from 'axios';

import router from '../router'

import store from '../store/index'
// 超时时间
axios.defaults.timeout = 5000;
// 基础路径
axios.defaults.baseURL = 'http://localhost:8888';
// 附加请求头 
let headerAdd = {}

const http = options => {
  return new Promise((resolve, reject) => {
    const defaultOptions = {};
    const newOptions = {
      ...defaultOptions,
      ...options
    };
    // 添加附加请求头
    newOptions.headers = {
      "Content-Type": "application/json",
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
    let userLogined = store.state.userLogined; // 用户是否登录
    userLogined ? config.headers.authorization = store.state.userKey : "";
    return config;
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    // const res = response.data; // 该处可将后端数据取出，提前做一个处理
    return response
  },
  error => {
    if (error.response && error.response.status == 401) {
      return router.push("/");
    }
    return Promise.reject(error)
  }
)



export default http;