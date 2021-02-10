<template>
  <Content :loading="loading">
    <template #head>
      <Button type="success" @click="updated">保存设置</Button>
    </template>
    <div class="pt-3">
      <div class="mb-2">设置字体:</div>
      <Input placeholder="标签" v-model.trim="content.webFontFamily" />
    </div>

    <div class="pt-3">
      <div class="mb-2">网站主题:</div>
      <EnterStyle v-model="content" />
    </div>
  </Content>
</template>

<script>
export default {
  data() {
    return {
      loading: 1,
      content: {},
      webThemeList: [
        {
          name: "明亮",
          theme: "light",
          url: "",
        },
        {
          name: "明亮",
          theme: "light",
          url: "",
        },
        {
          name: "明亮",
          theme: "light",
          url: "",
        },
        {
          name: "明亮",
          theme: "light",
          url: "",
        },
      ],
    };
  },
  mounted() {
    this.select();
  },
  computed: {
    isRight() {
      return this.content.webFontFamily == "";
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
