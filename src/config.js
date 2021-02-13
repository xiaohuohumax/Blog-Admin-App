module.exports = {
    axios: { // axios 配置
        // 附加请求头
        headerAdd: {},
        defaults: {
            withCredentials: true, // 携带cookies 信息
            timeout: 10000, // 10秒
            baseURL: "http://localhost:8888", // 基准路径
        }
    }
}