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
    statsWebUserLevel: () => {
        return https({
            method: "post",
            url: '/admin/api/statsWebUserLevel',
        })

    },
    statsWebUserGender: () => {
        return https({
            method: "post",
            url: '/admin/api/statsWebUserGender',
        })
    },
    statsWebUserLogon: () => {
        return https({
            method: "post",
            url: '/admin/api/statsWebUserLogon',
        })
    },
    // === 

    statsAdminUserGender: () => {
        return https({
            method: "post",
            url: '/admin/api/statsAdminUserGender',
        })
    },
    statsAdminUserLevel: () => {
        return https({
            method: "post",
            url: '/admin/api/statsAdminUserLevel',
        })
    },
    commentFindByPageMore: (page,
        pageSteep,
        kind,
        select,
        selectTime) => {
        return https({
            method: "post",
            url: '/admin/api/commentFindByPageMore',
            data: {
                page,
                pageSteep,
                kind,
                select,
                selectTime
            }
        })
    },
    videomusicFindByPage: (page, pageSteep, select) => {
        return https({
            method: "post",
            url: '/admin/api/videomusicFindByPage',
            data: {
                page,
                pageSteep,
                select
            }
        })
    },
    imageFindPage: (page, pageSteep, select) => {
        return https({
            method: "post",
            url: '/admin/api/imageFindPage',
            data: {
                page,
                pageSteep,
                select
            }
        })
    },
    toolFindByPage: (page, pageSteep, select) => {
        return https({
            method: "post",
            url: '/admin/api/toolFindByPage',
            data: {
                page,
                pageSteep,
                select
            }
        })
    },
    noticeFindByPage: (page, pageSteep, select) => {
        return https({
            method: "post",
            url: '/admin/api/noticeFindByPage',
            data: {
                page,
                pageSteep,
                select
            }
        })
    },
    adminMessageFindByPage: (page, pageSteep, select) => {
        return https({
            method: "post",
            url: '/admin/api/adminMessageFindByPage',
            data: {
                page,
                pageSteep,
                select
            }
        })
    },
    adminMessageInsert: (adminId, message) => {
        return https({
            method: "post",
            url: '/admin/api/adminMessageInsert',
            data: {
                adminId,
                message
            }
        })
    },
}