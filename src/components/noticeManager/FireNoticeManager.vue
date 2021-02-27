<template>
  <TimelineItem class="notice-manager" :color="color">
    <Card>
      <Input
        type="textarea"
        :rows="4"
        v-model.trim="notice"
        placeholder="请输入公告"
        clearable
      />
      <EnterImage placeholder="输入图片" class="mt-3 mb-2" v-model="icon" :imagemax="1" />

      <div class="d-flex justify-content-between align-items-center">
        <EnterColor v-model="color" :definearray="defineArray" />
        <Button
          v-show="$authres(['view_firenoticemanager_firebutton'])"
          type="primary"
          ghost
          @click="insert"
        >
          发布
        </Button>
      </div>
    </Card>
  </TimelineItem>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      notice: "",
      defineArray: [
        { color: "#6B9AC4", name: "一般" },
        { color: "#FCD0A1", name: "警告" },
        { color: "#40F99B", name: "成功" },
        { color: "#DE3C4B", name: "失败" },
      ],
      color: "#6B9AC4",
      icon: [],
    };
  },
  computed: {
    ...mapState(["userInf"]),
  },
  methods: {
    insert() {
      if (this.notice == "") {
        return this.$Message.error("信息不能为空!");
      }
      let icon = this.icon.length > 0 ? this.icon[0] : "";
      this.$request
        .noticeInsert(this.userInf._id, this.notice, icon, this.color)
        .then((result) => {
          if (result.flag) {
            this.$Message.success("发布成功!");
            this.$emit("change");
            this.notice = "";
            this.icon = [];
          } else {
            this.$Message.error(result.msg);
          }
        })
        .catch((err) => this.$Message.error("发布失败!"));
    },
  },
};
</script>

<style lang="less">
.notice-manager {
  .ivu-radio-group-item {
    margin-bottom: 0 !important;
  }
}
</style>
