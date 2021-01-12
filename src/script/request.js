import https from './https.js'

export default {
    // 检验url是否存在
    isUrlRight(url) {
        return https({
            method: "get",
            url
        })
    },
    // 文章发表
    articleInsert: (data) => {
        return https({
            method: "post",
            url: '/articleinsert',
            data
        })
    },
    // 文章查询
    articleFind: () => {
        return https({
            method: "post",
            url: '/articlefind',
        })
    }
}