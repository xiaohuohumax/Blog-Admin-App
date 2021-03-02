<template>
  <div class="home d-flex h-100">
    <div class="home-nav flex-shrink-0">
      <LeftNav />
    </div>
    <div class="home-body flex-grow-1 d-flex flex-column text-left">
      <Header class="w-100 flex-shrink-0" />
      <History class="flex-shrink-0" />
      <router-view class="home-main flex-grow-1" />
    </div>
    <div class="tools-body">
      <Tools />
    </div>
  </div>
</template>

<script>
let { remote } = window.require("electron");

import config from "../config";

let win = remote.getCurrentWindow();
export default {
  data() {
    return {
      file: "",
      homeSize: config.appSize.home,
    };
  },
  created() {
    this.changeSize();
  },
  methods: {
    changeSize() {
      win.setResizable(true);
      win.setMinimumSize(this.homeSize.minWidth, this.homeSize.minHeight);
      win.setSize(this.homeSize.width, this.homeSize.height);
      win.center();
    },
  },
};
</script>

<style lang="less">
.home {
  position: relative;
  .home-main {
    background: #fafafa;
  }
  .home-body {
    overflow: hidden;
  }
  .tools-body {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
  }
}
</style>
