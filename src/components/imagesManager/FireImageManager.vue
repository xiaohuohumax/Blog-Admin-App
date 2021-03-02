<template>
  <Content :loading="loading">
    <template #head>
      <Button
        v-show="!kind && $authres(['view_fireimagemanager_backinf'])"
        class="mr-2"
        :to="`/ImageMore/${$route.query.id}`"
      >
        返回详细
      </Button>

      <Button
        v-show="$authres(['view_fireimagemanager_backlist'])"
        class="mr-2"
        to="/ImageManager"
      >
        返回列表
      </Button>
      <Button
        v-show="kind && $authres(['view_fireimagemanager_firebutton'])"
        type="success"
        @click="onSubmit"
      >
        发布
      </Button>
      <Button
        v-show="!kind && $authres(['view_fireimagemanager_updatebutton'])"
        class="mr-2"
        type="success"
        @click="update"
      >
        更新
      </Button>
      <Button
        v-show="!kind && $authres(['view_fireimagemanager_deletebutton'])"
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

    <FormItemBlock title="添加图包">
      <EnterImage v-model="context.icons" :imagemax="imagemax" />
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
      context: {
        tags: [],
        title: "",
        subTitle: "",
        icon: [],
        icons: [],
      },
      tagsMax: 10,
      imagemax: 100,

      kind: true, // true 发表 false 修改
      loading: 0,
    };
  },
  created() {
    this.imageInit();
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
        this.context.icons.length == 0 ||
        this.context.icon.length == 0
      );
    },
  },
  methods: {
    imageInit() {
      this.context = {
        tags: [],
        title: "",
        subTitle: "",
        icon: [],
        icons: [],
      };
    },
    onSubmit() {
      if (this.isRight) {
        return this.$Message.error("图包不完整!");
      }
      this.$request
        .imageinsert({
          adminId: this.userInf._id,
          ...this.context,
          icon: this.context.icon[0],
        })
        .then((result) => {
          if (result.flag) {
            this.$Message.success("图包已发表!");
            this.imageInit();
          } else {
            this.$Message.error(result.msg);
          }
        })
        .catch(() => this.$Message.error("发布失败!"));
    },
    select() {
      this.loading = 1;
      this.$request
        .imageFindbyid(this.$route.query.id)
        .then((result) => {
          if (result.flag) {
            this.context = result.data[0];
            this.context.icon = [this.context.icon];
            this.loading = 2;
          } else {
            this.loading = 3;
          }
        })
        .catch(() => (this.loading = 3));
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
        .catch(() => this.$Message.error("删除失败!"));
    },
    update() {
      if (this.isRight) {
        return this.$Message.error("图包不完整!");
      }
      this.$request
        .imageUpdate(this.$route.query.id, {
          ...this.context,
          icon: this.context.icon[0],
        })
        .then((result) => {
          if (result.flag) {
            this.$Message.success("图包已修改!");
            this.select();
          } else {
            this.$Message.error(result.msg);
          }
        })
        .catch(() => this.$Message.error("修改失败!"));
    },
  },
};
</script>
