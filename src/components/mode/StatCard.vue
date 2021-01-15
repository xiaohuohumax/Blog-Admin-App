<template>
  <Card class="stat-card rounded">
    <div
      :id="chartId"
      class="userAgeStat w-100 mb-3 rounded"
      :style="{ height: `${height}rem` }"
    ></div>

    <div
      v-if="loading != 1"
      class="stat-card-loading w-100 h-100 d-flex justify-content-center align-items-center text-center"
    >
      <div name="loading" v-if="loading == 0">
        <Icon
          type="ios-loading"
          color="tomato"
          size="68"
          class="demo-spin-icon-load"
        ></Icon>
        <div class="font-weight-bold small">加载中</div>
      </div>
      <div name="loaderror" v-if="loading == 2">
        <Icon type="md-close" color="tomato" size="68"></Icon>
        <div class="font-weight-bold small">
          加载失败 <span class="stat-card-reload text-danger" @click="reload">重试</span>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import createChart from "@/script/chartDatas";

import enumData from "@/script/enumData";

let { ipcRenderer } = window.require("electron");

export default {
  props: {
    loading: {
      type: Number,
      default: 0, // 0 加载中 1 记载成功 2 加载失败
    },
    height: {
      type: Number,
      default: 20,
    },
    option: {
      // 参数
      type: Object,
      default: {},
    },
  },
  watch: {
    loading() {
      this.loading == 1 ? this.setOption() : "";
    },
  },
  mounted() {
    this.drawChart();
  },
  data() {
    return {
      chart: null,
      chartId: `chartid-${Date.now()}`, // 随机id 防重复
      defineOption: {
        // 默认配置 开启工具栏
        toolbox: {
          show: true,
          feature: {
            mark: {
              show: true,
            },
            dataView: {
              show: true,
              readOnly: false,
            },
            magicType: {
              show: true,
              type: ["pie", "funnel"],
            },
            restore: {
              show: true,
            },
            saveAsImage: {
              show: true,
            },
          },
        },
        color: [
          "#4c5454",
          "#ff715b",
          "#ffffff",
          "#1ea896",
          "#523f38",
          "#f3a712",
          "#6cae75",
          "#23b5d3",
          "#279af1",
        ], // 颜色配置
      },
    };
  },
  methods: {
    drawChart() {
      this.chart = createChart(document.getElementById(this.chartId), this.resultOption);
      // 窗口大小改变
      ipcRenderer.on(enumData.WindowResize, () => {
        this.chart && this.chart.resize();
      });
    },
    setOption() {
      this.chart && this.chart.setOption(this.resultOption, true);
    },
    reload() {
      this.$emit("reload");
    },
  },
  computed: {
    resultOption() {
      // 混合设置
      return { ...this.defineOption, ...this.option };
    },
  },
};
</script>

<style lang="less">
.stat-card {
  position: relative;
  overflow: hidden;
  .userAgeStat {
    overflow: hidden;
  }
  .stat-card-loading {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    background: rgba(0, 0, 0, 0.1);
  }
  .stat-card-reload {
    cursor: pointer;
  }
}
</style>
