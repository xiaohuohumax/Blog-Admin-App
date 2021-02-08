<template>
  <Content :loading="loading">
    <template #head>
      <Button class="mr-2" :to="`/ArticleMore/${$route.query.id}`">返回详细</Button>
      <Button class="mr-2" to="/ArticleManager">返回列表</Button>
      <Button type="success" @click="onSubmit" v-if="kind">发布</Button>

      <Button class="mr-2" type="success" @click="update" v-if="!kind">更新</Button>
      <Button type="error" ghost @click="remove" v-if="!kind">删除</Button>
    </template>

    <template #loading>
      <Icon
        type="ios-loading"
        color="tomato"
        size="68"
        class="demo-spin-icon-load"
      ></Icon>
      <div class="font-weight-bold small">上传中{{ time }}%</div>
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
    <EnterTool ref="enterTool" @input="inputFile" />
    <div class="py-3">
      <p class="small mr-2">添加标签:</p>
      <EnterTags v-model="tags" :tagmax="tagsMax" />
    </div>
    <div class="pb-3">
      <p class="small mr-2">添加封面:</p>
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
      content: undefined,
      time: 0, // 上传进度

      kind: true, // true 发表信息 false 修改信息
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
        (this.kind && this.content == undefined) ||
        this.icon.length == 0
      );
    },
  },
  methods: {
    inputFile(file) {
      this.content = file;
    },
    clearFile() {
      this.$refs.enterTool && this.$refs.enterTool.clearFile();
    },
    onSubmit() {
      if (this.isRight) {
        return this.$Message.error("信息不完整!");
      }
      this.loading = 1;
      this.$request
        .uploadTool(
          this.userInf._id,
          this.title,
          this.subTitle,
          this.icon[0],
          this.tags,
          this.content,
          (progressEvent) => {
            this.time = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
          }
        )
        .then((res) => {
          if (res.flag) {
            this.tags = [];
            this.title = "";
            this.subTitle = "";
            this.icon = [];
            this.$Message.success("工具发表成功!");
          } else {
            this.$Message.error(res.msg);
          }
          this.clearFile();
          this.loading = 2;
        })
        .catch((err) => {
          console.log(err);
          this.$Message.error("工具发表失败!");
          this.loading = 3;
        });
    },
    select() {
      this.loading = 1;
      this.$request
        .toolFindbyid(this.$route.query.id)
        .then((result) => {
          if (result.flag) {
            this.loading = 2;
            let content = result.data[0];

            this.tags = content.tags;
            this.title = content.title;
            this.subTitle = content.subTitle;
            this.icon = [content.icon];
          } else {
            this.loading = 3;
          }
        })
        .catch((err) => (this.loading = 3));
    },
    remove() {
      this.$request
        .toolDeleteById(this.$route.query.id)
        .then((result) => {
          if (result.flag) {
            this.$Message.success("删除成功!");
            this.$router.push("/ToolManager");
          } else {
            this.$Message.error(result.msg);
          }
        })
        .catch((err) => this.$Message.error("删除失败!"));
    },
    update() {
      if (this.isRight) {
        return this.$Message.error("信息不完整!");
      }
      this.$request
        .toolUpdate(
          this.$route.query.id,
          this.title,
          this.subTitle,
          this.icon[0],
          this.tags,
          this.content,
          (progressEvent) => {
            this.time = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
          }
        )
        .then((result) => {
          if (result.flag) {
            this.select();
            this.$Message.success("工具更新成功!");
          } else {
            this.$Message.error(result.msg);
          }
        })
        .catch((err) => this.$Message.error("工具更新失败!"));
    },
  },
};
</script>

<style lang="less"></style>
