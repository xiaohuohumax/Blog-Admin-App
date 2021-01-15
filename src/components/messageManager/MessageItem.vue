<template>
  <div class="d-flex message-card mt-3" :class="cardClass">
    <div
      class="card-icon rounded-circle shadow-sm border flex-shrink-0"
      :style="cardIconStyle"
    ></div>
    <div class="message-space mx-2"></div>
    <Card class="message-body flex-grow-1 small font-weight-bold">
      <div class="h6">{{ message.admin.name }}</div>
      <div class="my-1">{{ message.message }}</div>
      <Time :time="message.uploadTime" type="datetime" />
    </Card>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      yourself: false, //  是否是你自己
    };
  },
  computed: {
    cardClass() {
      return this.yourself ? "message-card-left" : "message-card-right";
    },
    cardIconStyle() {
      return `backgrond:url('${
        this.message.admin && this.message.admin.icon
      }') center / cover;`;
    },
  },
};
</script>

<style lang="less">
.message-card {
  .card-icon {
    width: 4rem;
    height: 4rem;
  }
}
.message-card-right .card-icon {
  order: 3;
}
.message-card-right .message-space {
  order: 2;
}
.message-card-right .message-body {
  text-align: right;
}
</style>
