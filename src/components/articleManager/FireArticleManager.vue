<template>
  <Content>
    <template #head>
      <Button type="success" @click="onSubmit">提交</Button>
    </template>

    <input
      v-model.trim="title"
      type="text"
      class="w-100 h3 py-3 border-0"
      placeholder="请输入标题(30字)"
    />
    <input
      v-model.trim="subTitle"
      type="text"
      class="w-100 h5 py-3 border-0"
      placeholder="请输入副标题(100字)"
    />
    <Editor v-model.trim="content" />
    <div class="py-3">
      <p class="small mr-2">添加标签<span class="text-success">回车Enter添加</span></p>
      <TagsList v-model="tags" :tagsMax="tagsMax" />
    </div>
    <div class="pb-3">
      <p class="small mr-2">添加封面<span class="text-success">回车Enter添加</span></p>
      <EnterImage v-model="icon" :imageMax="1" />
    </div>
  </Content>
</template>

<script>
export default {
  data() {
    return {
      tags: [],
      tagsMax: 10,
      title: "",
      subTitle: "",
      icon: ["http://localhost:8888/userIcon.jpg"],
      content: "",
    };
  },
  methods: {
    onSubmit() {
      if (
        this.tags.length == 0 ||
        this.title == "" ||
        this.subTitle == "" ||
        this.content == "" ||
        this.icon.length == 0
      ) {
        return this.$Message.error("文章不完整!");
      }

      this.$request
        .articleInsert({
          tags: this.tags,
          title: this.title,
          subTitle: this.subTitle,
          content: this.content,
          icon: this.icon[0],
        })
        .then((res) => {
          this.$Message.success("文章已发表!");
          this.tags = [];
          this.title = "";
          this.subTitle = "";
          this.content = "";
          this.icon = [];
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="less">
.writeUpdataArticle-image-list {
  min-height: 8rem;
  min-width: 8rem;
  padding: 5px;

  .writeUpdataArticle-image-remove {
    visibility: hidden;
  }

  &:hover .writeUpdataArticle-image-remove {
    visibility: visible;
  }
}
</style>
