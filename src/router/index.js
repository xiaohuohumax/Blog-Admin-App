import Vue from 'vue'
import VueRouter from 'vue-router'

import allCom from '../script/allCom'

Vue.use(VueRouter)

// meta: {
//   unHistory: true, // 不添加历史记录
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
        component: allCom.Welcome
      }, {
        path: 'FireArticleManager',
        name: '发布/修改文章',
        component: allCom.FireArticleManager
      }, {
        path: 'ArticleManager',
        name: '文章管理',
        component: allCom.ArticleManager
      }, {
        path: 'ArticleMore/:id',
        name: '文章详细',
        component: allCom.ArticleMore
      }, {
        path: 'CommentManager',
        name: '评论管理',
        component: allCom.CommentManager
      }, {
        path: 'WebUserManager',
        name: '网站用户',
        component: allCom.WebUserManager
      }, {
        path: 'WebUserMore/:id',
        name: '网站用户详细',
        component: allCom.WebUserMore
      }, {
        path: 'AdminUserManager',
        name: '管理用户',
        component: allCom.AdminUserManager
      }, {
        path: 'AdminUserMore/:id',
        name: '管理用户详细',
        component: allCom.AdminUserMore
      }, {
        path: 'FireMusicVideoManager',
        name: '视频音乐',
        component: allCom.FireMusicVideoManager
      }, {
        path: 'FireImageManager',
        name: '图包分享',
        component: allCom.FireImageManager
      }, {
        path: 'FireToolManager',
        name: '在线工具',
        component: allCom.FireToolManager
      }, {
        path: 'MusicVideoManager',
        name: '视频音乐管理',
        component: allCom.MusicVideoManager
      }, {
        path: 'MusicVideoMore/:id',
        name: '视频音乐详细',
        component: allCom.MusicVideoMore
      }, {
        path: 'ImageManager',
        name: '图包分享管理',
        component: allCom.ImageManager
      }, {
        path: 'ImageMore/:id',
        name: '图包分享详细',
        component: allCom.ImageMore
      }, {
        path: 'ToolManager',
        name: '在线工具管理',
        component: allCom.ToolManager
      }, {
        path: 'ToolMore/:id',
        name: '在线工具详细',
        component: allCom.ToolMore
      }, {
        path: 'VirtualFileManager',
        name: '虚拟文件',
        component: allCom.VirtualFileManager
      }, {
        path: 'StyleSetManager',
        name: '样式设置',
        component: allCom.StyleSetManager
      }, {
        path: 'BasicSetManager',
        name: '基础设置',
        component: allCom.BasicSetManager
      }, {
        path: 'OtherSetManager',
        name: '其他设置',
        component: allCom.OtherSetManager
      }, {
        path: 'WebStatManager',
        name: '用户统计',
        component: allCom.WebStatManager
      }, {
        path: 'AdminStatManager',
        name: '网站统计',
        component: allCom.AdminStatManager
      }, {
        path: 'MessageManager',
        name: '站内信息',
        component: allCom.MessageManager
      }, {
        path: 'NoticeManager',
        name: '发布公告',
        component: allCom.NoticeManager
      }, {
        path: 'AuthorityManager',
        name: '用户授权',
        component: allCom.AuthorityManager
      }, {
        path: 'RoleManager',
        name: '角色管理',
        component: allCom.RoleManager
      },  {
        path: 'ResourceManager',
        name: '资源管理',
        component: allCom.ResourceManager
      }, {
        path: '/Error404',
        name: '错误 404',
        component: allCom.Error404,
        meta: {
          unHistory: true,
        }
      }
    ]
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


export default router