<template>
  <StatCard @reload="select" :loading="loading" :option="option" />
</template>

<script>
export default {
  data() {
    return {
      loading: 0, // 0 加载中 1 记载成功 2 加载失败
      option: {}, // 配置
    };
  },
  mounted() {
    this.select();
  },
  methods: {
    select() {
      this.loading = 0;
      this.$request
        .statsWebUserLogon()
        .then((result) => {
          if (result.flag) {
            this.option = {
              title: {
                text: "前端用户注册时间统计",
              },
              xAxis: {
                type: "category",
                data: result.data.map((val) => val._id),
              },
              yAxis: {
                type: "value",
              },
              series: [
                {
                  data: result.data.map((val) => val.count),
                  type: "line",
                },
              ],
            };
            this.loading = 1;
          } else {
            this.loading = 2;
          }
        })
        .catch((err) => (this.loading = 2));
    },
  },
};
</script>

<style>
.userAgeStat {
  overflow: hidden;
}
</style>
