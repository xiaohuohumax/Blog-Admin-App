<template>
  <Content :loading="loading">
    <template #head>
      <Button
        v-show="$authres(['view_firesongmanager_backlist'])"
        class="mr-2"
        to="/SongManager"
      >
        返回列表
      </Button>

      <Button
        v-show="kind && $authres(['view_firesongmanager_firebutton'])"
        type="success"
        @click="onSubmit"
      >
        创建
      </Button>
      <Button
        v-show="!kind && $authres(['view_firesongmanager_updatebutton'])"
        class="mr-2"
        type="success"
        @click="update"
      >
        更新
      </Button>
      <Button
        v-show="!kind && $authres(['view_firesongmanager_deletebutton'])"
        type="error"
        ghost
        @click="remove"
      >
        删除
      </Button>
    </template>
    <input
      v-model.trim="song.name"
      type="text"
      class="w-100 h3 py-3 border-0"
      placeholder="请输入歌名(30字)"
    />
    <input
      v-model.trim="song.subTitle"
      type="text"
      class="w-100 h5 py-3 border-0"
      placeholder="请输入说明(100字)"
    />

    <FormItemBlock title="添加封面">
      <EnterImage v-model="song.icon" :imagemax="1" />
    </FormItemBlock>

    <FormItemBlock title="歌曲路径">
      <EnterVideo v-model.trim="song.url" kind="audio" />
    </FormItemBlock>

    <FormItemBlock title="歌词路径">
      <Input v-model.trim="song.lrc" />
    </FormItemBlock>
  </Content>
</template>

<script>
export default {
  data() {
    return {
      song: {},

      kind: true, // true 发表文章 false 修改文章
      loading: 0,
      rootMenu: [],
    };
  },

  created() {
    this.songInit();
    this.kind = this.$route.query.id == "" || this.$route.query.id == undefined;
    !this.kind ? this.select() : "";
  },
  computed: {
    isRight() {
      return (
        this.song.name == "" ||
        this.song.url == "" ||
        this.song.lrc == "" ||
        this.song.subTitle == "" ||
        this.song.icon.length == 0
      );
    },
  },
  methods: {
    songInit() {
      this.song = {
        name: "",
        icon: [],
        url: "",
        lrc: "",
      };
    },
    onSubmit() {
      if (this.isRight) {
        return this.$Message.error("信息不完整!");
      }
      this.$request
        .songInsert({ ...this.song, icon: this.song.icon[0] })
        .then((result) => {
          if (result.flag) {
            this.$Message.success("歌曲已创建!");
            this.songInit();
          } else {
            this.$Message.error(result.msg);
          }
        })
        .catch(() => this.$Message.error("创建失败!"));
    },
    select() {
      this.loading = 1;
      this.$request
        .songFindById(this.$route.query.id)
        .then((result) => {
          if (result.flag) {
            this.loading = 2;
            const data = result.data[0];
            this.song = data;
            this.song.icon = [data.icon];
          } else {
            this.loading = 3;
          }
        })
        .catch(() => (this.loading = 3));
    },
    remove() {
      this.$request
        .songDeleteById(this.$route.query.id)
        .then((result) => {
          if (result.flag) {
            this.$Message.success("删除成功!");
            this.$router.push("/SongManager");
          } else {
            this.$Message.error(flag.msg);
          }
        })
        .catch(() => this.$Message.error("删除失败!"));
    },
    update() {
      this.$request
        .songUpdate(this.$route.query.id, { ...this.song, icon: this.song.icon[0] })
        .then((result) => {
          if (result.flag) {
            this.$Message.success("修改成功!");
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
