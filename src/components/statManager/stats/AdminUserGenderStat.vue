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
        .statsAdminUserGender()
        .then((result) => {
          if (result.flag) {
            this.option = {
              title: {
                text: "管理用户性别统计",
              },
              tooltip: {
                trigger: "item",
                formatter: "{a} {b}: {c} <br/>比例: ({d}%)",
              },
              legend: {
                orient: "vertical",
                left: 10,
                bottom: 10,
                data: result.data.map((val) => val._id),
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
                  data: result.data.map((val) => ({ value: val.count, name: val._id })),
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
