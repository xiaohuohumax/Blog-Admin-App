<template>
  <Content :loading="loading">
    <template #head>
      <Button type="success" @click="updated">保存设置</Button>
    </template>
    <div class="pt-3">
      <div class="mb-2">博客名称:</div>
      <Input placeholder="标签" v-model.trim="content.webName" />
    </div>
    <div class="pt-3">
      <div class="mb-2">设置网站说明:</div>
      <Input placeholder="标签" v-model.trim="content.webDescription" />
    </div>
    <div class="pt-3">
      <div class="mb-2">网站状态:</div>

      <i-switch v-model="content.webState" size="large">
        <span slot="open">开启</span>
        <span slot="close">维修</span>
      </i-switch>

      <div class="mt-2" v-if="!content.webState">
        <DatePicker
          type="datetime"
          :options="options3"
          placeholder="选择时间"
          v-model="content.opentime"
         
        ></DatePicker>
      </div>
    </div>
    <div class="pt-3">
      <div class="mb-2">设置关键字:</div>
      <EnterTags v-model="content.webKeyWords" :tagmax="tagsMax" />
    </div>
    <div class="pt-3">
      <div class="mb-2">版权信息:</div>
      <Input placeholder="标签" v-model.trim="content.copyRight" />
    </div>
  </Content>
</template>

<script>
export default {
  data() {
    return {
      loading: 1,
      tagsMax: 10,
      content: {},

      options3: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now();
        },
      },
    };
  },
  mounted() {
    this.select();
  },
  computed: {
    isRight() {
      return (
        this.content.webName == "" ||
        this.content.copyRight == "" ||
        this.content.webDescription == "" ||
        this.content.webKeyWords.length == 0 ||
        (!this.content.webState && this.content.opentime == "")
      );
    },
  },
  methods: {
    select() {
      this.loading = 1;
      this.$request
        .webSetFindOnly()
        .then((result) => {
          if (result.flag) {
            this.loading = 2;
            this.content = result.data;
          } else {
            this.loading = 3;
          }
        })
        .catch((err) => (this.loading = 3));
    },
    updated() {
      if (this.isRight) {
        return this.$Message.error("信息不完整!");
      }
      this.$request
        .webSetUpdate(this.content)
        .then((result) => {
          if (result.flag) {
            this.$Message.success("修改成功!");
            this.select();
          } else {
            this.$Message.error(result.msg);
          }
        })
        .catch((err) => this.$Message.error("修改失败!"));
    },
  },
};
</script>

<style></style>
