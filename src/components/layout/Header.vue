<template>
  <div class="header p-2 d-flex justify-content-between align-items-center">
    <div class="header-drag"></div>
    <div class="header-path header-no-drag d-flex align-items-center">
      <Icon type="md-paper-plane" class="mr-2" />
    </div>
    <div class="header-control header-no-drag d-flex align-items-center text-success">
      <Icon
        @click="controlSmall"
        title="最小化"
        size="20"
        class="mr-3"
        type="md-remove"
      />
      <Icon
        @click="controlFullScreen"
        :title="isMaximized ? '取消全屏' : '全屏'"
        size="17"
        class="mr-3"
        :type="isMaximized ? 'md-qr-scanner' : 'md-contract'"
      />
      <Icon @click="controlQuit" title="退出" size="20" type="md-close" />
    </div>
  </div>
</template>
<script>
let { remote } = window.require("electron");
let win = remote.getCurrentWindow();

import { mapState } from "vuex";

export default {
  data() {
    return {
      isMaximized: false,
      historyShowMax: 5,
    };
  },
  methods: {
    // 缩小
    controlSmall() {
      win.minimize();
    },
    // 全屏
    controlFullScreen() {
      this.isMaximized ? win.unmaximize() : win.maximize();
      this.isMaximized = !this.isMaximized;
    },
    // 退出
    controlQuit() {
      win.close();
    },
  },
  computed: {
    ...mapState(["history", "roles", "resources"]),
  },
};
</script>
<style lang="less">
.header {
  position: relative;
  padding: 3px;
  z-index: 9999;
  .header-drag {
    position: absolute;
    height: calc(100% - 3px);
    width: calc(100% - 3px);
    left: 0;
    top: 3px;
    z-index: -1;
    -webkit-app-region: drag;
  }
  .header-no-drag {
    -webkit-app-region: no-drag;
  }
  .header-path {
    overflow: hidden;
    word-wrap: none;
  }
  .header-control {
    i {
      cursor: pointer;
    }
  }
}
</style>
