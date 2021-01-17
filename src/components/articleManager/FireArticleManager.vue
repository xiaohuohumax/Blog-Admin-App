<template>
  <Content :loading="loading">
    <template #head>
      <Button class="mr-2" :to="`/ArticleMore/${$route.query.id}`">返回详细</Button>
      <Button class="mr-2" to="/ArticleManager">返回列表</Button>
      <Button type="success" @click="onSubmit" v-if="kind">发布</Button>

      <Button class="mr-2" type="success" @click="update" v-if="!kind">更新</Button>
      <Button type="error" ghost @click="remove" v-if="!kind">删除</Button>
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
      <EnterTags v-model="tags" :tagmax="tagsMax" />
    </div>
    <div class="pb-3">
      <p class="small mr-2">添加封面<span class="text-success">回车Enter添加</span></p>
      <EnterImage v-model="icon" :imagemax="1" />
    </div>
  </Content>
</template>

<script>
import EnterTags from "../mode/EnterTags.vue";
import { mapState } from "vuex";
export default {
  components: { EnterTags },
  data() {
    return {
      tags: [],
      tagsMax: 10,
      title: "",
      subTitle: "",
      icon: [],
      content: "",

      kind: true, // true 发表文章 false 修改文章
      loading: 0,
    };
  },
  created() {
    this.kind = this.$route.query.id == "" || this.$route.query.id == undefined;

    !this.kind ? this.select() : "";
  },
  computed: {
    ...mapState(["userInf"]),
    isRight() {
      return (
        this.tags.length == 0 ||
        this.title == "" ||
        this.subTitle == "" ||
        this.content == "" ||
        this.icon.length == 0
      );
    },
  },
  methods: {
    onSubmit() {
      if (this.isRight) {
        return this.$Message.error("文章不完整!");
      }
      this.$request
        .articleinsert(
          this.userInf._id,
          this.title,
          this.subTitle,
          this.content,
          this.icon[0],
          this.tags
        )
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
    select() {
      this.loading = 1;
      this.$request
        .articlefindbyid(this.$route.query.id)
        .then((result) => {
          this.loading = 2;
          let content = result[0];

          this.tags = content.tags;
          this.title = content.title;
          this.subTitle = content.subTitle;
          this.content = content.content;
          this.icon = [content.icon];
        })
        .catch((err) => (this.loading = 3));
    },
    remove() {
      this.$request
        .articleDeleteById(this.$route.query.id)
        .then((result) => {
          this.$Message.success("删除成功!");
          this.$router.push("/ArticleManager");
        })
        .catch((err) => this.$Message.error("删除失败!"));
    },
    update() {
      if (this.isRight) {
        return this.$Message.error("文章不完整!");
      }
      this.$request
        .articleUpdate(this.$route.query.id, {
          title: this.title,
          subTitle: this.subTitle,
          content: this.content,
          icon: this.icon[0],
          tags: this.tags,
        })
        .then((res) => {
          this.$Message.success("文章已修改!");
          this.select();
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="less"></style>
