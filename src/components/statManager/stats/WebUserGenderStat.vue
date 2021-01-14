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
        .statsWebUserGender()
        .then((result) => {
          this.option = {
            title: {
              text: "前端用户性别统计",
            },
            tooltip: {
              trigger: "item",
              formatter: "{a} {b}: {c} <br/>比例: ({d}%)",
            },
            legend: {
              orient: "vertical",
              left: 10,
              bottom: 10,
              data: result.map((val) => val._id),
            },
            series: [
              {
                name: "性别",
                type: "pie",
                radius: ["50%", "70%"],
                avoidLabelOverlap: false,
                label: {
                  show: false,
                  position: "center",
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: "30",
                    fontWeight: "bold",
                  },
                },
                labelLine: {
                  show: false,
                },
                data: result.map((val) => ({ value: val.count, name: val._id })),
              },
            ],
          };
          this.loading = 1;
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
