import axios from 'axios';

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

export default http;