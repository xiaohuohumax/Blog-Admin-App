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
    adminUserInsert: (params) => {
        return https({
            method: "post",
            url: '/admin/api/adminUserInsert',
            data: {
                params
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
    adminMessageInsert: (params) => {
        return https({
            method: "post",
            url: '/admin/api/adminMessageInsert',
            data: {
                params
            }
        })
    },
    articleinsert: (params) => {
        return https({
            method: "post",
            url: '/admin/api/articleinsert',
            data: {
                params
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
    noticeInsert: (adminId, notice, icon, color) => {
        return https({
            method: "post",
            url: '/admin/api/noticeInsert',
            data: {
                adminId,
                notice,
                icon,
                color
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
    videomusicinsert: (params) => {
        return https({
            method: "post",
            url: '/admin/api/videomusicinsert',
            data: {
                params
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
    imageinsert: (params) => {
        return https({
            method: "post",
            url: '/admin/api/imageinsert',
            data: {
                params
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
    adminUserFindbyid: (id) => {
        return https({
            method: "post",
            url: '/admin/api/adminUserFindbyid',
            data: {
                id
            }
        })
    },
    adminUserDeleteById: (id) => {
        return https({
            method: "post",
            url: '/admin/api/adminUserDeleteById',
            data: {
                id
            }
        })
    },
    adminUserUpdate: (id, params) => {
        return https({
            method: "post",
            url: '/admin/api/adminUserUpdate',
            data: {
                id,
                params
            }
        })
    },
    uploadTool: (adminId, title, subTitle, icon, tags, kind, file, onUploadProgress = () => {}) => {

        let data = new FormData();
        data.append("adminId", adminId);
        data.append("title", title);
        data.append("subTitle", subTitle);
        data.append("kind", kind);
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
    virtualFileFindByPage: (page, pageSteep, parentId, selectWord) => {
        return https({
            method: "post",
            url: '/admin/api/virtualFileFindByPage',
            data: {
                page,
                pageSteep,
                parentId,
                selectWord
            }
        })
    },
    virtualFileInsertDir: (name, parentId) => {
        return https({
            method: "post",
            url: '/admin/api/virtualFileInsertDir',
            data: {
                name,
                parentId
            }
        })
    },
    virtualFileUpdateName: (id, name) => {
        return https({
            method: "post",
            url: '/admin/api/virtualFileUpdateName',
            data: {
                id,
                name
            }
        })
    },
    virtualFileDeleteById: (id) => {
        return https({
            method: "post",
            url: '/admin/api/virtualFileDeleteById',
            data: {
                id
            }
        })
    },
    virtualFileInsert: (adminId, parentId, file, onUploadProgress = () => {}) => {
        let data = new FormData();
        data.append("adminId", adminId);
        data.append("parentId", parentId);
        data.append("file", file);
        return https({
            method: "post",
            url: '/admin/api/virtualFileInsert',
            timeout: 1000 * 60 * 60 * 24,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onUploadProgress,
            data
        })
    },
    virtualFileMove: (ids, parentId) => {
        return https({
            method: "post",
            url: '/admin/api/virtualFileMove',
            data: {
                ids,
                parentId
            }
        })
    },
    webUserFindbyid: (id) => {
        return https({
            method: "post",
            url: '/admin/api/webUserFindbyid',
            data: {
                id
            }
        })
    },
    webUserDeleteById: (id) => {
        return https({
            method: "post",
            url: '/admin/api/webUserDeleteById',
            data: {
                id
            }
        })
    },
    WebUserUpdateById: (id, params) => {
        return https({
            method: "post",
            url: '/admin/api/WebUserUpdateById',
            data: {
                id,
                params
            }
        })
    },
    roleFindAll: () => {
        return https({
            method: "post",
            url: '/admin/api/roleFindAll',
        })
    },
    roleFindByPage: (page, pageSteep, select) => {
        return https({
            method: "post",
            url: '/admin/api/roleFindByPage',
            data: {
                page,
                pageSteep,
                select
            }
        })
    },
    roleFindById: (id) => {
        return https({
            method: "post",
            url: '/admin/api/roleFindById',
            data: {
                id
            }
        })
    },
    resourceFindByIds: (ids) => {
        return https({
            method: "post",
            url: '/admin/api/resourceFindByIds',
            data: {
                ids
            }
        })
    },
    resourceFindByPage: (page, pageSteep, select) => {
        return https({
            method: "post",
            url: '/admin/api/resourceFindByPage',
            data: {
                page,
                pageSteep,
                select
            }
        })
    },
    resourceFindByPageAndIds: (page, pageSteep, select, ids) => {
        return https({
            method: "post",
            url: '/admin/api/resourceFindByPageAndIds',
            data: {
                page,
                pageSteep,
                select,
                ids
            }
        })
    },
    roleUpdateById: (id, params) => {
        return https({
            method: "post",
            url: '/admin/api/roleUpdateById',
            data: {
                id,
                params
            }
        })
    },
    roleInsert: (params) => {
        return https({
            method: "post",
            url: '/admin/api/roleInsert',
            data: {
                params
            }
        })
    },
    roleDeleteById: (id) => {
        return https({
            method: "post",
            url: '/admin/api/roleDeleteById',
            data: {
                id
            }
        })
    },
    resourceFindById: (id) => {
        return https({
            method: "post",
            url: '/admin/api/resourceFindById',
            data: {
                id
            }
        })
    },
    resourceFindRootMenu: () => {
        return https({
            method: "post",
            url: '/admin/api/resourceFindRootMenu',
        })
    },
    resourceInsert: (params) => {
        return https({
            method: "post",
            url: '/admin/api/resourceInsert',
            data: {
                params
            }
        })
    },
    resourceDeleteById: (id) => {
        return https({
            method: "post",
            url: '/admin/api/resourceDeleteById',
            data: {
                id
            }
        })
    },
    resourceUpdateById: (id, params) => {
        return https({
            method: "post",
            url: '/admin/api/resourceUpdateById',
            data: {
                id,
                params
            }
        })
    },
    toolFindKind: () => {
        return https({
            method: "post",
            url: '/admin/api/toolFindKind',
        })
    },

    songInsert: (params) => {
        return https({
            method: "post",
            url: '/admin/api/songInsert',
            data: {
                params
            }
        })
    },
    songFindPage: (page, pageSteep, select) => {
        return https({
            method: "post",
            url: '/admin/api/songFindPage',
            data: {
                page,
                pageSteep,
                select
            }
        })
    },
    songFindById: (id) => {
        return https({
            method: "post",
            url: '/admin/api/songFindById',
            data: {
                id
            }
        })
    },
    songUpdate: (id, newdata) => {
        return https({
            method: "post",
            url: '/admin/api/songUpdate',
            data: {
                id,
                newdata
            }
        })
    },
    songDeleteById: (id) => {
        return https({
            method: "post",
            url: '/admin/api/songDeleteById',
            data: {
                id
            }
        })
    },

    songFindByPageAndIds: (page, pageSteep, select, ids) => {
        return https({
            method: "post",
            url: '/admin/api/songFindByPageAndIds',
            data: {
                page,
                pageSteep,
                select,
                ids
            }
        })
    },

    playListInsert: (params) => {
        return https({
            method: "post",
            url: '/admin/api/playListInsert',
            data: {
                params
            }
        })
    },
    playListFindPage: (page, pageSteep, select) => {
        return https({
            method: "post",
            url: '/admin/api/playListFindPage',
            data: {
                page,
                pageSteep,
                select
            }
        })
    },
    playListFindById: (id) => {
        return https({
            method: "post",
            url: '/admin/api/playListFindById',
            data: {
                id
            }
        })
    },
    playListUpdate: (id, newdata) => {
        return https({
            method: "post",
            url: '/admin/api/playListUpdate',
            data: {
                id,
                newdata
            }
        })
    },
    playListDeleteById: (id) => {
        return https({
            method: "post",
            url: '/admin/api/playListDeleteById',
            data: {
                id
            }
        })
    },
    informSendMessage: (params) => {
        return https({
            method: "post",
            url: '/admin/api/informSendMessage',
            data: {
                params
            }
        })
    },
    adminUserFindBySession: () => {
        return https({
            method: "post",
            url: '/admin/api/adminUserFindBySession',
        })
    },

    weather: (extensions) => {
        return https({
            method: "post",
            url: '/admin/api/weather',
            data: {
                extensions
            }
        })
    },



}