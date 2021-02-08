<template>
  <Content :loading="loading">
    <template #head>
      <Button type="success" @click="updated">保存设置</Button>
    </template>

    <div class="pt-3">
      <div class="mb-2">用户头像:</div>
      <EnterImage v-model="content.userDefIcon" :imagemax="imageIconMax" />
    </div>
    <div class="pt-3">
      <div class="mb-2">网站横幅:</div>
      <EnterImage v-model="content.bannerIcon" :imagemax="imageBannerMax" />
    </div>
  </Content>
</template>

<script>
export default {
  data() {
    return {
      loading: 1,
      imageIconMax: 100,
      imageBannerMax: 10,
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
      return this.content.userDefIcon.length == 0;
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
            this.$Meserrorerror(result.msg);
          }
        })
        .catch((err) => this.$Message.error("修改失败!"));
    },
  },
};
</script>

<style></style>
