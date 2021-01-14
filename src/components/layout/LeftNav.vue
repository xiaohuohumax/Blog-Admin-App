<template>
  <div class="left-nav d-flex flex-column h-100 text-center shadow-sm">
    <div class="flex-shrink-0 pt-4 px-5 pb-4 h4 left-nav-drag">
      <span class="left-nav-no-drag left-nav-top-name">后台管理</span>
    </div>
    <div class="flex-shark-0 pb-2 px-5">
      <img
        src="../../assets/userIcon.jpg"
        class="left-nav-icon mx-auto rounded-circle mb-2"
      />

      <div class="mb-1">xaiohuohu</div>
      <Button size="small" type="success" ghost icon="md-exit" to="/login">注销</Button>
    </div>
    <div class="home-nav-body flex-grow-1 mb-2">
      <Menu :open-names="['0']" class="w-100 text-left">
        <Submenu :name="listIndex" v-for="(list, listIndex) in nav" :key="listIndex">
          <template slot="title">
            <Icon :type="list.icon" />
            {{ list.name }}
          </template>
          <MenuItem
            :name="`${listIndex}-${index}`"
            v-for="(item, index) in list.items"
            :key="index"
            :to="item.path"
            >{{ item.name }}</MenuItem
          >
        </Submenu>
      </Menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav: [
        {
          name: "内容管理",
          icon: "ios-paper",
          items: [
            {
              name: "发布文章",
              path: "/FireArticleManager",
            },
            {
              name: "文章管理",
              path: "/ArticleManager",
            },
          ],
        },
        {
          name: "账号管理",
          icon: "ios-people",
          items: [
            {
              name: "网站用户",
              path: "/WebUserManager",
            },
            {
              name: "管理用户",
              path: "/AdminUserManager",
            },
          ],
        },
        {
          name: "信息管理",
          icon: "ios-paper",
          items: [
            {
              name: "站内信息",
              path: "/MessageManager",
            },
            {
              name: "发布公告",
              path: "/NoticeManager",
            },
            {
              name: "评论管理",
              path: "/CommentManager",
            },
          ],
        },
        {
          name: "娱乐影音",
          icon: "md-images",
          items: [
            {
              name: "视频音乐",
              path: "/FireMusicVideoManager",
            },
            {
              name: "图包分享",
              path: "/FireImageManager",
            },
            {
              name: "在线工具",
              path: "/FireToolManager",
            },
            {
              name: "视频音乐管理",
              path: "/MusicVideoManager",
            },
            {
              name: "图包分享管理",
              path: "/ImageManager",
            },
            {
              name: "在线工具管理",
              path: "/ToolManager",
            },
          ],
        },
        {
          name: "文件管理",
          icon: "md-folder-open",
          items: [
            {
              name: "虚拟文件",
              path: "/VirtualFileManager",
            },
          ],
        },
        {
          name: "网站设置",
          icon: "ios-cog",
          items: [
            {
              name: "样式设置",
              path: "/StyleSetManager",
            },
            {
              name: "基础设置",
              path: "/BasicSetManager",
            },
            {
              name: "其他设置",
              path: "/OtherSetManager",
            },
          ],
        },
        {
          name: "统计分析",
          icon: "ios-stats",
          items: [
            {
              name: "前端统计",
              path: "/WebStatManager",
            },
            {
              name: "网站统计",
              path: "/AdminStatManager",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="less">
.left-nav {
  min-width: 14rem;
  background-color: #f0f0f0;

  .left-nav-drag {
    -webkit-app-region: drag;
    margin: 3px 0 0 3px;
  }

  .left-nav-top-name {
    overflow: hidden;
  }
  .left-nav-no-drag {
    -webkit-app-region: no-drag;
  }

  .ivu-menu-submenu-title-icon {
    margin-right: 0 !important;
  }
  .left-nav-icon {
    width: 5rem;
  }

  .home-nav-body {
    overflow-y: auto;
    z-index: 1;
  }

  .ivu-menu-vertical.ivu-menu-light:after {
    display: none;
  }

  .ivu-menu-light {
    background-color: rgba(0, 0, 0, 0);
  }
}
</style>
