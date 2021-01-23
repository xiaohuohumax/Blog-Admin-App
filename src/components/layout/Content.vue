<template>
  <div class="content d-flex flex-column">
    <div
      :class="filterClass"
      ref="contentBody"
      class="content-body flex-grow-1 d-flex flex-column"
    >
      <div class="sticky-top py-1" v-show="$slots.head">
        <div class="content-head">
          <div
            :class="headOpen ? '' : 'content-head-body-close'"
            class="content-head-body bg-white p-2 rounded-right shadow-sm"
          >
            <div class="">
              <slot name="head" />
            </div>
            <Button
              class="content-head-body-icon bg-white"
              type="success"
              size="small"
              ghost
              shape="circle"
              icon="ios-analytics-outline"
              @click="HeadOpenChange"
            ></Button>
          </div>
        </div>
      </div>
      <Card
        class="m-2 flex-grow-1 d-flex flex-column"
        v-if="loading == 0 || loading == 2"
      >
        <slot />
      </Card>
      <div class="content-bottom w-100" v-if="$slots.bottom">
        <slot name="bottom" />
      </div>
    </div>
    <div
      v-if="loading == 1 || loading == 3"
      class="content-loading w-100 h-100 d-flex flex-column justify-content-center align-items-center"
    >
      <slot name="loading" v-if="loading == 1">
        <Icon
          type="ios-loading"
          color="tomato"
          size="68"
          class="demo-spin-icon-load"
        ></Icon>
        <div class="font-weight-bold small">加载中</div>
      </slot>
      <slot name="loaderror" v-if="loading == 3">
        <Icon type="md-close" color="tomato" size="68"></Icon>
        <div class="font-weight-bold small">加载失败</div>
      </slot>
    </div>
    <div
      class="content-center w-100 h-100 d-flex justify-content-center align-items-center"
      v-if="$slots.center && centeropen"
    >
      <div class="content-center-bg filter-blur w-100 h-100"></div>
      <slot name="center" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      // 0 未开始 1 加载中 2 加载成功 3 加载失败
      type: Number,
      default: 0,
    },
    centeropen:{ // 是否开启中间
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      headOpen: true,
    };
  },
  mounted() {
    this.scrollEndListener();
  },
  computed: {
    filterClass() {
      return this.loading == 2 || this.loading == 0 ? "" : "filter-blur";
    },
  },
  methods: {
    HeadOpenChange() {
      this.headOpen = !this.headOpen;
    },
    scrollEndListener() {
      let contentBody = this.$refs.contentBody;
      contentBody.addEventListener("scroll", () => {
        let height = contentBody.offsetHeight;
        let scrollTop = contentBody.scrollTop;
        let scrollHeight = contentBody.scrollHeight;
        if (height + scrollTop >= scrollHeight) {
          this.$emit("scrollend");
        }
        if (scrollTop == 0) {
          this.$emit("scrollstart");
        }
      });
    },
  },
};
</script>

<style lang="less">
.content {
  position: relative;
  .content-body {
    height: 0;
    max-height: 100%;
    overflow-y: scroll;
    .ivu-card-body {
      height: 100% !important;
    }
  }

  .content-center,
  .content-center-bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .content-center {
    z-index: 2000;
  }
  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .filter-blur {
    filter: blur(4px);
  }
  .content-bottom {
    position: sticky;

    bottom: 0;
    left: 0;
  }
  .content-head {
    position: relative;
    right: 100%;

    .content-head-body {
      position: relative;
      left: 100%;
      transition: all linear 1s;

      .content-head-body-icon {
        position: absolute;
        top: 50%;
        transition: all linear 1s;
        transform: translate(0, -50%);
        right: 1rem;
      }
    }

    .content-head-body-close {
      left: 0;

      .content-head-body-icon {
        transform: translate(100%, -50%);
        right: -1rem;
      }
    }
  }
  .content-loading {
    position: absolute;
    z-index: 8888;
    // background: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
  }
}
</style>
