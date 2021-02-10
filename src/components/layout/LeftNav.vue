<template>
  <div class="left-nav d-flex flex-column h-100 text-center shadow-sm">
    <div class="flex-shrink-0 pt-4 px-5 pb-4 h4 left-nav-drag">
      <span class="left-nav-no-drag left-nav-top-name">后台管理</span>
    </div>
    <div class="flex-shark-0 pb-2 px-5">
      <img :src="userInf.icon" class="left-nav-icon shadow mx-auto rounded-circle mb-2" />
      <div class="mb-1">{{ userInf.name }}</div>
      <Button size="small" type="success" @click="logout" ghost icon="md-exit">
        注销
      </Button>
    </div>
    <div class="home-nav-body flex-grow-1 mb-2">
      <Menu :open-names="['0']" class="w-100 text-left">
        <Submenu :name="listIndex" v-for="(list, listIndex) in menu" :key="listIndex">
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
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      // 菜单模板
      // nav: [{ name: "根目录", icon: "icon", items: [{ name: "子菜单", path: "/url" }] }],
    };
  },
  computed: {
    ...mapState(["userInf", "roles", "resources", "menu"]),
    ...mapGetters(["getLeftNav"]),
  },
  methods: {
    ...mapMutations(["userLogout"]),
    logout() {
      this.userLogout();
      this.$router.push("/");
    },
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
    object-fit: cover;
    width: 5rem;
    height: 5rem;
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
