<template>
  <Content :loading="loading">
    <template #head>
      <Button
        type="success"
        class="mr-2"
        v-show="kind && $authres(['view_firearticlemanager_firebutton'])"
        @click="onSubmit"
      >
        发布
      </Button>
      <Button
        v-show="!kind && $authres(['view_firearticlemanager_backinf'])"
        class="mr-2"
        :to="`/ArticleMore/${$route.query.id}`"
      >
        返回详细
      </Button>
      <Button
        v-show="$authres(['view_firearticlemanager_backlist'])"
        class="mr-2"
        to="/ArticleManager"
        >返回列表</Button
      >
      <Button
        v-show="!kind && $authres(['view_firearticlemanager_updatebutton'])"
        class="mr-2"
        type="success"
        @click="update"
      >
        更新
      </Button>
      <Button
        v-show="!kind && $authres(['view_firearticlemanager_deletebutton'])"
        type="error"
        @click="remove"
      >
        删除
      </Button>
    </template>
    <input
      v-model.trim="context.title"
      type="text"
      class="w-100 h3 py-3 border-0"
      placeholder="请输入标题(30字)"
    />
    <input
      v-model.trim="context.subTitle"
      type="text"
      class="w-100 h5 py-3 border-0"
      placeholder="请输入副标题(100字)"
    />
    <FormItemBlock class="mt-0" title="添加标签">
      <EnterTags v-model="context.tags" :tagmax="tagsMax" />
    </FormItemBlock>

    <FormItemBlock title="添加封面">
      <EnterImage v-model="context.icon" :imagemax="1" />
    </FormItemBlock>

    <FormItemBlock title="添加正文">
      <Editor v-model.trim="context.content" />
    </FormItemBlock>
  </Content>
</template>

<script>
import EnterTags from "../mode/EnterTags.vue";
import { mapState } from "vuex";
export default {
  components: { EnterTags },
  data() {
    return {
      tagsMax: 10,
      context: {
        tags: [],
        title: "",
        subTitle: "",
        icon: [],
        content: "",
      },

      kind: true, // true 发表文章 false 修改文章
      loading: 0,
    };
  },
  created() {
    this.articleInit();
    this.kind = this.$route.query.id == "" || this.$route.query.id == undefined;

    !this.kind ? this.select() : "";
  },
  computed: {
    ...mapState(["userInf"]),
    isRight() {
      return (
        this.context.tags.length == 0 ||
        this.context.title == "" ||
        this.context.subTitle == "" ||
        this.context.content == "" ||
        this.context.icon.length == 0
      );
    },
  },
  methods: {
    articleInit() {
      this.context = {
        tags: [],
        title: "",
        subTitle: "",
        icon: [],
        content: "",
      };
    },
    onSubmit() {
      if (this.isRight) {
        return this.$Message.error("文章不完整!");
      }
      this.$request
        .articleinsert({
          adminId: this.userInf._id,
          ...this.context,
          icon: this.context.icon[0],
        })
        .then((result) => {
          if (result.flag) {
            this.$Message.success("文章已发表!");
            this.articleInit();
          } else {
            this.$Message.success(result.msg);
          }
        })
        .catch((err) => console.log(err));
    },
    select() {
      this.loading = 1;
      this.$request
        .articlefindbyid(this.$route.query.id)
        .then((result) => {
          if (result.flag) {
            this.context = result.data[0];
            this.context.icon = [this.context.icon];
            this.loading = 2;
          } else {
            this.loading = 3;
          }
        })
        .catch((err) => (this.loading = 3));
    },
    remove() {
      this.$request
        .articleDeleteById(this.$route.query.id)
        .then((result) => {
          if (result.flag) {
            this.$Message.success("删除成功!");
            this.$router.push("/ArticleManager");
          } else {
            this.$Message.success(result.msg);
          }
        })
        .catch((err) => this.$Message.error("删除失败!"));
    },
    update() {
      if (this.isRight) {
        return this.$Message.error("文章不完整!");
      }
      this.$request
        .articleUpdate(this.$route.query.id, {
          ...this.context,
          icon: this.context.icon[0],
        })
        .then((result) => {
          if (result.flag) {
            this.$Message.success("文章已修改!");
            this.select();
          } else {
            this.$Message.success(result.msg);
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
