import Vue from 'vue'
import VueRouter from 'vue-router'

import allCom from '../script/allCom'

Vue.use(VueRouter)

// meta: {
//   unHistory: true, // 不添加历史记录
// }

const routes = [{
    path: '/',
    component: allCom.Home,
    children: [{
      path: '/',
      name: '欢迎',
      component: allCom.Welcome
    }, {
      path: 'FireArticleManager',
      name: '发布/修改文章',
      component: allCom.FireArticleManager
    },  {
      path: 'ArticleManager',
      name: '文章管理',
      component: allCom.ArticleManager
    }, {
      path: 'CommentManager',
      name: '评论管理',
      component: allCom.CommentManager
    }, {
      path: 'WebUserManager',
      name: '网站用户',
      component: allCom.WebUserManager
    }, {
      path: 'AdminUserManager',
      name: '管理用户',
      component: allCom.AdminUserManager
    }, {
      path: 'MusicVideoManager',
      name: '视频音乐',
      component: allCom.MusicVideoManager
    }, {
      path: 'ImagesManager',
      name: '图包分享',
      component: allCom.ImagesManager
    }, {
      path: 'GamesManager',
      name: '在线游戏',
      component: allCom.GamesManager
    }, {
      path: 'ToolsManager',
      name: '在线工具',
      component: allCom.ToolsManager
    }, {
      path: 'VirtualFileManager',
      name: '虚拟文件',
      component: allCom.VirtualFileManager
    }, {
      path: 'StyleSetManager',
      name: '样式设置',
      component: allCom.StyleSetManager
    },{
      path: 'BasicSetManager',
      name: '基础设置',
      component: allCom.BasicSetManager
    }, {
      path: 'UserStatManager',
      name: '用户统计',
      component: allCom.UserStatManager
    }, {
      path: 'WebStatManager',
      name: '网站统计',
      component: allCom.WebStatManager
    }, ]
  },
  {
    path: '/Login',
    name: '登录',
    component: allCom.Login,
    meta: {
      unHistory: true, // 不添加历史记录
    }
  },
  {
    path: '/Error404',
    name: '错误 404',
    component: allCom.Error404,
    meta: {
      unHistory: true,
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})


export default router