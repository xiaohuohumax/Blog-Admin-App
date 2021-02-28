<template>
  <Card class="loading-card rounded" :style="cardHeightStyle">
    <slot v-if="loading == 1"></slot>
    <div
      v-if="loading != 1"
      class="loading-card-loading w-100 h-100 d-flex justify-content-center align-items-center text-center"
    >
      <div v-if="loading == 0">
        <Icon
          type="ios-loading"
          color="tomato"
          size="68"
          class="demo-spin-icon-load"
        ></Icon>
        <div class="font-weight-bold small">加载中</div>
      </div>
      <div v-if="loading == 2">
        <Icon type="md-close" color="tomato" size="68"></Icon>
        <div class="font-weight-bold small">
          加载失败
          <span class="loading-card-reload text-danger" @click="$emit('reload')"
            >重试</span
          >
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
export default {
  props: {
    loading: {
      type: Number,
      default: 0, // 0 加载中 1 记载成功 2 加载失败
    },
    height: {
      type: String,
      default: "8rem", // 无内容时默认高度
    },
  },
  computed: {
    cardHeightStyle() {
      return { height: this.loading == 1 ? "auto" : this.height };
    },
  },
};
</script>

<style lang="less">
.loading-card {
  position: relative;
  overflow: hidden;
  .loading-card-loading {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    background: rgba(0, 0, 0, 0.1);
  }
  .loading-card-reload {
    cursor: pointer;
  }
}
</style>
