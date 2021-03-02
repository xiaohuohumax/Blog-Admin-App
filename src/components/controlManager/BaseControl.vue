<template>
  <Content>
    <template #head></template>
    <FormItemBlock class="mt-0" title="刷新所有用户信息权限等">
      <Button type="success" ghost @click="sendFlushYourself">刷新用户信息</Button>
    </FormItemBlock>

    <FormItemBlock title="刷新所有用户的网站设置">
      <Button type="success" ghost @click="sendFlushWebset">刷新网站设置</Button>
    </FormItemBlock>
  </Content>
</template>

<script>
import websocketCode from "../../script/websocketCode";
export default {
  methods: {
    async sendCode(code, params = {}) {
      return this.$request.baseControl(code, params);
    },
    sendFlushYourself() {
      this.sendCode(websocketCode.FLUSH_YOURSELF)
        .then((result) => {
          if (result.flag) {
            this.$Message.success(`成功操控${result.data}名在线用户`);
          }
        })
        .catch(() => this.$Message.error("操控失败!"));
    },
    sendFlushWebset() {
      this.sendCode(websocketCode.FLUSH_WEBSET)
        .then((result) => {
          if (result.flag) {
            this.$Message.success(`成功操控${result.data}名在线用户`);
          }
        })
        .catch(() => this.$Message.error("操控失败!"));
    },
  },
};
</script>
