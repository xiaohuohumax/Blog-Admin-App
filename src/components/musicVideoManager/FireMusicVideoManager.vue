<template>
  <Content :loading="loading">
    <template #head>
      <Button
        v-show="$authres(['view_firemusicvidemanager_backinf'])"
        class="mr-2"
        :to="`/MusicVideoMore/${$route.query.id}`"
      >
        返回详细
      </Button>
      <Button
        v-show="$authres(['view_firemusicvidemanager_backlist'])"
        class="mr-2"
        to="/MusicVideoManager"
      >
        返回列表
      </Button>
      <Button
        v-show="kind && $authres(['view_firemusicvideomanager_firebutton'])"
        type="success"
        @click="onSubmit"
      >
        发布
      </Button>
      <Button
        v-show="!kind && $authres(['view_firemusicvideomanager_updatebutton'])"
        class="mr-2"
        type="success"
        @click="update"
      >
        更新
      </Button>
      <Button
        v-show="!kind && $authres(['view_firemusicvideomanager_deletebutton'])"
        type="error"
        ghost
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

    <FormItemBlock title="添加音视频">
      <EnterVideo v-model.trim="context.videoMusicUrl" />
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
        videoMusicUrl: "",
      },

      kind: true, // true 发表文章 false 修改文章
      loading: 0,
    };
  },
  created() {
    this.videoInit();
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
        this.context.videoMusicUrl == "" ||
        this.context.icon.length == 0
      );
    },
  },
  methods: {
    videoInit() {
      this.context = {
        tags: [],
        title: "",
        subTitle: "",
        icon: [],
        videoMusicUrl: "",
      };
    },
    onSubmit() {
      if (this.isRight) {
        return this.$Message.error("文章不完整!");
      }
      this.$request
        .videomusicinsert({
          adminId: this.userInf._id,
          ...this.context,
          icon: this.context.icon[0],
        })
        .then((result) => {
          if (result.flag) {
            this.$Message.success("音视频已发表!");
            this.videoInit();
          } else {
            this.$Message.error(result.msg);
          }
        })
        .catch((err) => console.log(err));
    },
    select() {
      this.loading = 1;
      this.$request
        .videomusicfindbyid(this.$route.query.id)
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
        .videoMusicDeleteById(this.$route.query.id)
        .then((result) => {
          if (result.flag) {
            this.$Message.success("删除成功!");
            this.$router.push("/ArticleManager");
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
        .videoMusicUpdate(this.$route.query.id, {
          adminId: this.userInf._id,
          ...this.context,
          icon: this.context.icon[0],
        })
        .then((result) => {
          if (result.flag) {
            this.$Message.success("视频已修改!");
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
