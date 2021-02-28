<template>
  <div v-if="weatherInf" class="mt-5">
    <LoadingCard :loading="loading" @reload="select">
      <div class="d-flex align-items-center justify-content-between">
        <div>
          当前城市:
          <span class="font-weight-bold">
            {{ forecasts.province }}-{{ forecasts.city }}
          </span>
          <span class="small">{{ forecasts.reporttime }}</span>
        </div>
        <Button type="primary" size="small" ghost @click="select">刷新</Button>
      </div>

      <div class="small d-flex align-items-center flex-wrap">
        <div
          class="weather-item d-flex align-items-center border rounded p-2 mt-2"
          v-for="(item, index) in forecasts.casts"
          :key="index"
        >
          <div class="mr-2">
            <div class="font-weight-bold">
              {{ weekMap[item.week] }}
            </div>
            <div class="font-weight-bold text-center">{{ item.daywind }}风</div>
          </div>
          <div class="text-center mr-1">
            <img
              class="weather-icon border rounded"
              :src="getWeatherIcon(item.dayweather)"
              v-if="isRight(item.dayweather)"
            />
            <div class="font-weight-bold">
              <span>{{ item.dayweather }}</span>
              <span>{{ item.daytemp }}℃</span>
            </div>
          </div>
          <div class="text-center">
            <img
              class="weather-icon bg-dark rounded"
              :src="getWeatherIcon(item.nightweather)"
              v-if="isRight(item.nightweather)"
            />
            <div class="font-weight-bold">
              <span>{{ item.nightweather }}</span>
              <span>{{ item.nighttemp }}℃</span>
            </div>
          </div>
        </div>
      </div>
    </LoadingCard>
  </div>
</template>

<script>
export default {
  data() {
    return {
      extensions: "all", // all 全部实时加预测天气 base 今天的实时天气
      weatherInf: {},
      forecasts: {},
      iconBaseUrl: "/image/weatherIcon/",
      loading: 0,
      weekMap: {
        1: "星期一",
        2: "星期二",
        3: "星期三",
        4: "星期四",
        5: "星期五",
        6: "星期六",
        7: "星期天",
      },
      weatherMap: [
        "严重霾",
        "中度霾",
        "中雨",
        "中雪",
        "叹号",
        "多云",
        "多云夜",
        "大暴雨",
        "大雨",
        "大雪",
        "小雨",
        "小雪",
        "强沙尘暴",
        "扬沙",
        "日出",
        "日落",
        "晴",
        "晴夜",
        "暴雨",
        "暴雪",
        "沙尘暴",
        "浮尘",
        "特大暴雨",
        "重度霾",
        "铃铛",
        "阴",
        "阵雨",
        "阵雨夜",
        "阵雪",
        "阵雪夜",
        "雨夹雪",
        "雷阵雨",
        "雷阵雨伴冰雹",
        "雾",
        "霾",
      ],
    };
  },
  created() {
    this.select();
  },
  methods: {
    isRight(name) {
      return this.weatherMap.includes(name);
    },
    getWeatherIcon(name) {
      return `${this.iconBaseUrl}${name}.svg`;
    },
    select() {
      this.loading = 0;
      this.$request
        .weather(this.extensions)
        .then((result) => {
          if (result.flag) {
            this.weatherInf = result.data;
            this.forecasts = this.weatherInf.forecasts[0];
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

<style lang="less">
.weather-icon {
  object-fit: cover;
  width: 3rem;
  height: 3rem;
}
.weather-item:not(:last-child) {
  margin-right: 0.5rem;
}
</style>
