<template>
  <div class="d-flex message-card mt-3" :class="cardClass">
    <div
      class="card-icon rounded-circle shadow-sm border flex-shrink-0"
      :style="cardIconStyle"
    ></div>
    <Card class="mx-4 message-body flex-grow-1 small font-weight-bold">
      <div class="h6">{{ message.admin.name }}</div>
      <div class="my-1">{{ message.message }}</div>
      <Time :time="message.uploadTime" type="datetime" />
    </Card>
    <div class="card-null flex-shrink-0"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    message: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      // yourself: false, //  是否是你自己
    };
  },
  computed: {
    ...mapState(["userInf"]),
    yourself() {
      return this.userInf._id == this.message.adminId;
    },
    cardClass() {
      return this.yourself ? "message-card-right" : "message-card-left";
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
  .card-icon,
  .card-null {
    width: 4rem;
    height: 4rem;
  }
}
.message-card-right .card-icon {
  order: 3;
}
.message-card-right .card-null {
  order: 1;
}
.message-card-right .message-body {
  order: 2;
  text-align: right;
}
</style>
