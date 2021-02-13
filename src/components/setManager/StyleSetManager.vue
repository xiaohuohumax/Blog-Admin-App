<template>
  <Content :loading="loading">
    <template #head>
      <Button
        v-show="$authres(['view_stylesetmanager_savebutton'])"
        type="success"
        @click="updated"
      >
        保存设置
      </Button>
    </template>
    <FormItemBlock class="mt-0" title="设置字体">
      <Input placeholder="标签" v-model.trim="content.webFontFamily" />
    </FormItemBlock>

    <FormItemBlock title="网站主题">
      <a slot="help" class="small" href="/webtheme/theme.less" download="主题模板.less">
        下载主题模板(LESS)
      </a>
      <EnterStyle v-model="content" />
    </FormItemBlock>
  </Content>
</template>

<script>
export default {
  data() {
    return {
      loading: 1,
      content: {},
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
