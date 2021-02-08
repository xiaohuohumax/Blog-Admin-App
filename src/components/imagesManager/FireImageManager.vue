<template>
  <Content :loading="loading">
    <template #head>
      <Button class="mr-2" :to="`/ImageMore/${$route.query.id}`">返回详细</Button>
      <Button class="mr-2" to="/ImageManager">返回列表</Button>
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
    <div class="pt-3">
      <div class="mb-2">添加标签:</div>
      <EnterTags v-model="tags" :tagmax="tagsMax" />
    </div>
    <div class="pt-3">
      <div class="mb-2">添加图包:</div>
      <EnterImage v-model="icons" :imagemax="imagemax" />
    </div>
    <div class="pt-3">
      <div class="mb-2">添加封面:</div>
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
      title: "",
      subTitle: "",
      icon: [],
      icons: [],

      tagsMax: 10,
      imagemax: 100,

      kind: true, // true 发表 false 修改
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
        this.icons.length == 0 ||
        this.icon.length == 0
      );
    },
  },
  methods: {
    onSubmit() {
      if (this.isRight) {
        return this.$Message.error("图包不完整!");
      }
      this.$request
        .imageinsert(
          this.userInf._id,
          this.title,
          this.subTitle,
          this.icons,
          this.icon[0],
          this.tags
        )
        .then((result) => {
          if (result.flag) {
            this.$Message.success("图包已发表!");
            this.tags = [];
            this.title = "";
            this.subTitle = "";
            this.icons = [];
            this.icon = [];
          } else {
            this.$Message.error(result.msg);
          }
        })
        .catch((err) => console.log(err));
    },
    select() {
      this.loading = 1;
      this.$request
        .imageFindbyid(this.$route.query.id)
        .then((result) => {
          if (result.flag) {
            this.loading = 2;
            let content = result.data[0];

            this.tags = content.tags;
            this.title = content.title;
            this.subTitle = content.subTitle;
            this.icons = content.icons;
            this.icon = [content.icon];
          } else {
            this.loading = 3;
          }
        })
        .catch((err) => (this.loading = 3));
    },
    remove() {
      this.$request
        .imageDeleteById(this.$route.query.id)
        .then((result) => {
          if (result.flag) {
            this.$Message.success("删除成功!");
            this.$router.push("/ImageManager");
          } else {
            this.$Message.error(result.msg);
          }
        })
        .catch((err) => this.$Message.error("删除失败!"));
    },
    update() {
      if (this.isRight) {
        return this.$Message.error("图包不完整!");
      }
      this.$request
        .imageUpdate(this.$route.query.id, {
          title: this.title,
          subTitle: this.subTitle,
          icons: this.icons,
          icon: this.icon[0],
          tags: this.tags,
        })
        .then((result) => {
          if (result.flag) {
            this.$Message.success("图包已修改!");
            this.select();
          } else {
            this.$Message.error(result.msg);
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="less"></style>
