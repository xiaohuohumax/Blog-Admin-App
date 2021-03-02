<template>
  <StatCard @reload="select" :loading="loading" :option="option" />
</template>

<script>
export default {
  props: {
    delay: {
      // 延时
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      loading: 0, // 0 加载中 1 记载成功 2 加载失败
      option: {}, // 配置
    };
  },
  mounted() {
    setTimeout(() => this.select(), this.delay);
  },
  methods: {
    select() {
      this.loading = 0;
      this.$request
        .statsAdminUserLevel()
        .then((result) => {
          if (result.flag) {
            this.option = {
              title: {
                text: "管理用户等级统计",
              },
              tooltip: {},
              xAxis: {
                data: result.data.map((val) => val._id),
              },
              yAxis: {},
              series: [
                {
                  name: "等级",
                  type: "bar",
                  data: result.data.map((val) => val.count),
                },
              ],
            };
            this.loading = 1;
          } else {
            this.loading = 2;
          }
        })
        .catch(() => (this.loading = 2));
    },
  },
};
</script>
