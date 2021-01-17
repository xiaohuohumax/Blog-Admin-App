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


    articleinsert: (adminId, title, subTitle, content, icon, tags) => {
        return https({
            method: "post",
            url: '/admin/api/articleinsert',
            data: {
                adminId,
                title,
                subTitle,
                content,
                icon,
                tags
            }
        })
    },

    articlefindbyid: (id) => {
        return https({
            method: "post",
            url: '/admin/api/articlefindbyid',
            data: {
                id
            }
        })
    },
    articleDeleteById: (id) => {
        return https({
            method: "post",
            url: '/admin/api/articleDeleteById',
            data: {
                id
            }
        })
    },

    articleUpdate: (id, newdata) => {
        return https({
            method: "post",
            url: '/admin/api/articleUpdate',
            data: {
                id,
                newdata
            }
        })
    },
    adminuserlogin: (name, pass) => {
        return https({
            method: "post",
            url: '/admin/adminuserlogin',
            data: {
                name,
                pass
            }
        })
    },
    noticeInsert: (adminId, notice, icon) => {
        return https({
            method: "post",
            url: '/admin/api/noticeInsert',
            data: {
                adminId,
                notice,
                icon
            }
        })
    },
    noticeDeleteById: (id) => {
        return https({
            method: "post",
            url: '/admin/api/noticeDeleteById',
            data: {
                id
            }
        })
    },
    commentFindById: (id) => {
        return https({
            method: "post",
            url: '/admin/api/commentFindById',
            data: {
                id
            }
        })
    },
    commentGetArticleByIdKind: (id, kind) => {
        return https({
            method: "post",
            url: '/admin/api/commentGetArticleByIdKind',
            data: {
                id,
                kind
            }
        })
    },
    commentDeleteById: (id) => {
        return https({
            method: "post",
            url: '/admin/api/commentDeleteById',
            data: {
                id
            }
        })
    },

    videomusicinsert: (adminId, title, subTitle, videoMusicUrl, icon, tags) => {
        return https({
            method: "post",
            url: '/admin/api/videomusicinsert',
            data: {
                adminId,
                title,
                subTitle,
                videoMusicUrl,
                icon,
                tags
            }
        })
    },
    videomusicfindbyid: (id) => {
        return https({
            method: "post",
            url: '/admin/api/videomusicfindbyid',
            data: {
                id
            }
        })
    },
    videoMusicDeleteById: (id) => {
        return https({
            method: "post",
            url: '/admin/api/videoMusicDeleteById',
            data: {
                id
            }
        })
    },
    videoMusicUpdate: (id, newdata) => {
        return https({
            method: "post",
            url: '/admin/api/videoMusicUpdate',
            data: {
                id,
                newdata
            }
        })
    },

    adminByNameFindIcon: (name) => {
        return https({
            method: "post",
            url: '/admin/adminByNameFindIcon',
            data: {
                name
            }
        })
    },

    webSetUpdate: (params) => {
        return https({
            method: "post",
            url: '/admin/api/webSetUpdate',
            data: {
                params
            }
        })
    },


    webSetFindOnly: () => {
        return https({
            method: "post",
            url: '/webset/webSetFindOnly',
        })
    },
    toolFindbyid: (id) => {
        return https({
            method: "post",
            url: '/admin/api/toolFindbyid',
            data: {
                id
            }
        })
    },
    toolDeleteById: (id) => {
        return https({
            method: "post",
            url: '/admin/api/toolDeleteById',
            data: {
                id
            }
        })
    },
    imageFindbyid: (id) => {
        return https({
            method: "post",
            url: '/admin/api/imageFindbyid',
            data: {
                id
            }
        })
    },
    imageDeleteById: (id) => {
        return https({
            method: "post",
            url: '/admin/api/imageDeleteById',
            data: {
                id
            }
        })
    },
    imageUpdate: (id, newdata) => {
        return https({
            method: "post",
            url: '/admin/api/imageUpdate',
            data: {
                id,
                newdata
            }
        })
    },

    imageinsert: (adminId, title, subTitle, icons, icon, tags) => {
        return https({
            method: "post",
            url: '/admin/api/imageinsert',
            data: {
                adminId,
                title,
                subTitle,
                icons,
                icon,
                tags
            }
        })
    },
    toolFindbyid: (id) => {
        return https({
            method: "post",
            url: '/admin/api/toolFindbyid',
            data: {
                id
            }
        })
    },
    toolDeleteById: (id) => {
        return https({
            method: "post",
            url: '/admin/api/toolDeleteById',
            data: {
                id
            }
        })
    },

    uploadTool: (adminId, title, subTitle, icon, tags, file, onUploadProgress = () => {}) => {

        let data = new FormData();
        data.append("adminId", adminId);
        data.append("title", title);
        data.append("subTitle", subTitle);
        data.append("icon", icon);
        tags.forEach(val => data.append("tags[]", val));
        data.append("file", file);
        return https({
            method: "post",
            url: '/admin/api/uploadTool',
            timeout: 1000 * 60 * 60 * 24,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onUploadProgress,
            data
        })
    },

    toolUpdate: (id, title, subTitle, icon, tags, file, onUploadProgress = () => {}) => {

        let data = new FormData();
        data.append("id", id);
        data.append("title", title);
        data.append("subTitle", subTitle);
        data.append("icon", icon);
        tags.forEach(val => data.append("tags[]", val));
        file ? data.append("file", file) : "";
        return https({
            method: "post",
            url: '/admin/api/toolUpdate',
            timeout: 1000 * 60 * 60 * 24,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onUploadProgress,
            data
        })
    },
}