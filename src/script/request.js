import https from './https.js'

export default {
    // 检验url是否存在
    isUrlRight(url) {
        return https({
            method: "get",
            url
        })
    },
    articleFindByPage: (page, pageSteep, select) => {
        return https({
            method: "post",
            url: '/admin/api/articleFindByPage',
            data: {
                page,
                pageSteep,
                select
            }
        })
    },
    adminUserFindByPage: (page, pageSteep, select) => {
        return https({
            method: "post",
            url: '/admin/api/adminUserFindByPage',
            data: {
                page,
                pageSteep,
                select
            }
        })
    },
    webUserFindByPage: (page, pageSteep, select) => {
        return https({
            method: "post",
            url: '/admin/api/webUserFindByPage',
            data: {
                page,
                pageSteep,
                select
            }
        })
    },
}