<template>
  <TimelineItem :color="notice.color">
    <Card>
      <div class="h6 my-1 font-weight-bold">{{ notice.notice }}</div>
      <div class="small mt-2">
        <Icon class="mr-1" type="ios-clock-outline" />
        <Time :time="notice.uploadTime" type="datetime" />
      </div>
      <img v-if="imgRight" :src="notice.icon[0]" class="w-75 border border-danger" />
    </Card>
  </TimelineItem>
</template>

<script>
export default {
  props: {
    notice: Object,
  },
  computed: {
    cardIconStyle() {
      return `backgrond:url('${this.notice.icon}') center / cover;`;
    },
    imgRight() {
      return this.notice.icon && this.notice.icon.length > 0;
    },
  },
};
</script>

<style>
.card-icon {
  width: 4.5rem;
  height: 4.5rem;
}
</style>
