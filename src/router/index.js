import Vue from 'vue'
import VueRouter from 'vue-router'

import allCom from '../script/allCom'

Vue.use(VueRouter)

// meta: {
//   unHistory: true, // 不添加历史记录
//   roles: [], // 角色权限
//   resources: [] // 资源权限
// }

const routes = [{
    path: '/',
    name: '登录',
    component: allCom.Login,
    meta: {
      unHistory: true, // 不添加历史记录
    }
  }, {
    path: '/',
    component: allCom.Home,
    children: [{
      path: 'Welcome',
      name: '欢迎',
      component: allCom.Welcome,
      // meta: {
      //   resources: ["router_welcome"]
      // }
    }, {
      path: 'FireArticleManager',
      name: '发布/修改文章',
      component: allCom.FireArticleManager,
      meta: {
        resources: ["router_firearticlemanager"]
      }
    }, {
      path: 'ArticleManager',
      name: '文章管理',
      component: allCom.ArticleManager,
      meta: {
        resources: ["router_articlemanager"]
      }
    }, {
      path: 'ArticleMore/:id',
      name: '文章详细',
      component: allCom.ArticleMore,
      meta: {
        resources: ["router_articlemore"]
      }
    }, {
      path: 'CommentManager',
      name: '评论管理',
      component: allCom.CommentManager,
      meta: {
        resources: ["router_commentmanager"]
      }
    }, {
      path: 'WebUserManager',
      name: '网站用户',
      component: allCom.WebUserManager,
      meta: {
        resources: ["router_webusermanager"]
      }
    }, {
      path: 'WebUserMore/:id',
      name: '网站用户详细',
      component: allCom.WebUserMore,
      meta: {
        resources: ["router_webusermore"]
      }
    }, {
      path: 'AdminUserManager',
      name: '管理用户',
      component: allCom.AdminUserManager,
      meta: {
        resources: ["router_adminusermanager"]
      }
    }, {
      path: 'FireAdminUserManager',
      name: '新建/修改管理用户',
      component: allCom.FireAdminUserManager,
      meta: {
        resources: ["router_fireadminusermanager"]
      }
    }, {
      path: 'FireMusicVideoManager',
      name: '视频音乐',
      component: allCom.FireMusicVideoManager,
      meta: {
        resources: ["router_firemusicvideomanager"]
      }
    }, {
      path: 'FireImageManager',
      name: '图包分享',
      component: allCom.FireImageManager,
      meta: {
        resources: ["router_fireimagemanager"]
      }
    }, {
      path: 'FireToolManager',
      name: '在线工具',
      component: allCom.FireToolManager,
      meta: {
        resources: ["router_firetoolmanager"]
      }
    }, {
      path: 'MusicVideoManager',
      name: '视频音乐管理',
      component: allCom.MusicVideoManager,
      meta: {
        resources: ["router_musicvideomanager"]
      }
    }, {
      path: 'MusicVideoMore/:id',
      name: '视频音乐详细',
      component: allCom.MusicVideoMore,
      meta: {
        resources: ["router_musicvideomore"]
      }
    }, {
      path: 'ImageManager',
      name: '图包分享管理',
      component: allCom.ImageManager,
      meta: {
        resources: ["router_imagemanager"]
      }
    }, {
      path: 'ImageMore/:id',
      name: '图包分享详细',
      component: allCom.ImageMore,
      meta: {
        resources: ["router_imagemore"]
      }
    }, {
      path: 'ToolManager',
      name: '在线工具管理',
      component: allCom.ToolManager,
      meta: {
        resources: ["router_toolmanager"]
      }
    }, {
      path: 'ToolMore/:id',
      name: '在线工具详细',
      component: allCom.ToolMore,
      meta: {
        resources: ["router_toolmore"]
      }
    }, {
      path: 'VirtualFileManager',
      name: '虚拟文件',
      component: allCom.VirtualFileManager,
      meta: {
        resources: ["router_virtualfilemanager"]
      }
    }, {
      path: 'StyleSetManager',
      name: '样式设置',
      component: allCom.StyleSetManager,
      meta: {
        resources: ["router_stylesetmanager"]
      }
    }, {
      path: 'BasicSetManager',
      name: '基础设置',
      component: allCom.BasicSetManager,
      meta: {
        resources: ["router_basicsetmanager"]
      }
    }, {
      path: 'OtherSetManager',
      name: '其他设置',
      component: allCom.OtherSetManager,
      meta: {
        resources: ["router_othersetmanager"]
      }
    }, {
      path: 'WebStatManager',
      name: '用户统计',
      component: allCom.WebStatManager,
      meta: {
        resources: ["router_webstatmanager"]
      }
    }, {
      path: 'AdminStatManager',
      name: '网站统计',
      component: allCom.AdminStatManager,
      meta: {
        resources: ["router_adminstatmanager"]
      }
    }, {
      path: 'MessageManager',
      name: '站内信息',
      component: allCom.MessageManager,
      meta: {
        resources: ["router_messagemanager"]
      }
    }, {
      path: 'NoticeManager',
      name: '发布公告',
      component: allCom.NoticeManager,
      meta: {
        resources: ["router_noticemanager"]
      }
    }, {
      path: 'RoleManager',
      name: '角色管理',
      component: allCom.RoleManager,
      meta: {
        resources: ["router_rolemanager"]
      }
    }, {
      path: 'ResourceManager',
      name: '资源管理',
      component: allCom.ResourceManager,
      meta: {
        resources: ["router_resourcemanager"]
      }
    }, {
      path: 'FireRoleManager',
      name: '添加/修改角色',
      component: allCom.FireRoleManager,
      meta: {
        resources: ["router_firerolemanager"]
      }
    }, {
      path: 'FireResourceManager',
      name: '创建/管理资源',
      component: allCom.FireResourceManager,
      meta: {
        resources: ["router_fireresourcemanager"]
      }
    }, {
      path: 'SongManager',
      name: '歌曲管理',
      component: allCom.SongManager,
      meta: {
        resources: ["router_songmanager"]
      }
    }, {
      path: 'FireSongManager',
      name: '创建/修改歌曲',
      component: allCom.FireSongManager,
      meta: {
        resources: ["router_firesongmanager"]
      }
    }, {
      path: 'PlayListManager',
      name: '歌单管理',
      component: allCom.PlayListManager,
      meta: {
        resources: ["router_playlistmanager"]
      }
    }, {
      path: 'FirePlayListManager',
      name: '创建/修改歌单',
      component: allCom.FirePlayListManager,
      meta: {
        resources: ["router_fireplaylistmanager"]
      }
    },{
      path: 'FireInformManager',
      name: '发送通知',
      component: allCom.FireInformManager,
      meta: {
        resources: ["router_fireinformmanager"]
      }
    }, {
      path: '/Error404',
      name: '错误 404',
      component: allCom.Error404,
      meta: {
        unHistory: true,
      }
    }, {
      path: '/Error403',
      name: '错误 403',
      component: allCom.Error403,
      meta: {
        unHistory: true,
      }
    }, {
      path: '/Error500',
      name: '错误 500',
      component: allCom.Error500,
      meta: {
        unHistory: true,
      }
    }]
  },

  {
    path: '*',
    redirect: "/Error404",
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}



export default router