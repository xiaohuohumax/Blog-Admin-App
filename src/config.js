module.exports = {
    axios: { // axios 配置
        // 附加请求头
        headerAdd: {},
        defaults: {
            withCredentials: true, // 携带cookies 信息
            timeout: 10000, // 10秒
            baseURL: "http://localhost:8888", // 基准路径
        }
    },
    // app的尺寸
    appSize: {
        // 登录
        login: {
            width: 300,
            height: 360,
            minWidth: 300,
            minHeight: 360,
        },
        // 主界面
        home: {
            width: 1000,
            height: 600,
            minWidth: 800,
            minHeight: 500,
        }
    }
}