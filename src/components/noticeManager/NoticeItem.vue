<template>
  <TimelineItem :color="notice.color" class="notice-item">
    <Card>
      <Button
        class="notice-item-icon"
        size="small"
        type="error"
        shape="circle"
        icon="md-close"
        @click="deleteNotice"
      ></Button>
      <div class="h6 my-1 font-weight-bold">{{ notice.notice }}</div>
      <div class="small my-2">
        <Icon class="mr-1" type="ios-clock-outline" />
        <Time :time="notice.uploadTime" type="datetime" />
      </div>
      <img v-if="imgRight" :src="notice.icon[0]" class="w-50 border rounded" />
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
  methods: {
    deleteNotice() {
      this.$request
        .noticeDeleteById(this.notice._id)
        .then((result) => {
          if (result.flag) {
            this.$Message.success("删除成功!");
            this.$emit("change");
          } else {
            this.$Message.error(result.msg);
          }
        })
        .catch((err) => this.$Message.error("删除失败!"));
    },
  },
};
</script>

<style lang="less">
.notice-item {
  position: relative;
  .notice-item-icon {
    position: absolute;
    top: 1rem;
    right: 1rem;
    visibility: hidden;
  }
  &:hover .notice-item-icon {
    visibility: visible;
  }
}
</style>
