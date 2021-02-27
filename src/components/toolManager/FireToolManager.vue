<template>
  <Content :loading="loading">
    <template #head>
      <Button
        v-show="!kind && $authres(['view_firetoolmanager_backinf'])"
        class="mr-2"
        :to="`/ToolMore/${$route.query.id}`"
      >
        返回详细
      </Button>

      <Button
        v-show="$authres(['view_firetoolmanager_backlist'])"
        class="mr-2"
        to="/ToolManager"
      >
        返回列表
      </Button>
      <Button
        v-show="kind && $authres(['view_firetoolmanager_firebutton'])"
        type="success"
        @click="onSubmit"
      >
        创建
      </Button>
      <Button
        v-show="!kind && $authres(['view_firetoolmanager_updatebutton'])"
        class="mr-2"
        type="success"
        @click="update"
      >
        更新
      </Button>
      <Button
        v-show="!kind && $authres(['view_firetoolmanager_deletebutton'])"
        type="error"
        ghost
        @click="remove"
      >
        删除
      </Button>
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
    <FormItemBlock
      class="mt-0"
      title="上传工具源码压缩包"
      subtitle="vue项目打包源码zip压缩包"
    >
      <a slot="help" class="small" href="/tool/tool-template.zip" download="主题模板.zip">
        下载工具模板
      </a>
      <EnterTool ref="enterTool" @input="inputFile" />
    </FormItemBlock>

    <FormItemBlock title="添加标签">
      <EnterTags v-model="tags" :tagmax="tagsMax" />
    </FormItemBlock>

    <FormItemBlock title="分类">
      <EnterKind v-model="kindInf" :kindlist="kindList" />
    </FormItemBlock>

    <FormItemBlock title="添加封面">
      <EnterImage v-model="icon" :imagemax="1" />
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
      tags: [],
      kindInf: "", // 类型
      kindList: [], // 类型待选队列
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
    this.selectAllKind();
  },
  computed: {
    ...mapState(["userInf"]),
    isRight() {
      return (
        this.tags.length == 0 ||
        this.title == "" ||
        this.subTitle == "" ||
        this.kindInf == "" ||
        (this.kind && this.content == undefined) ||
        this.icon.length == 0
      );
    },
  },
  methods: {
    selectAllKind() {
      this.$request
        .toolFindKind()
        .then((result) => {
          if (result.flag) {
            this.kindList = result.data;
          }
        })
        .catch((err) => {});
    },
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
          this.kindInf,
          this.content,
          (progressEvent) => {
            this.time = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
          }
        )
        .then((result) => {
          if (result.flag) {
            this.tags = [];
            this.title = "";
            this.subTitle = "";
            this.kindInf = "";
            this.icon = [];
            this.$Message.success("工具发表成功!");
          } else {
            this.$Message.error(result.msg);
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
            this.kindInf = content.kind;
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
