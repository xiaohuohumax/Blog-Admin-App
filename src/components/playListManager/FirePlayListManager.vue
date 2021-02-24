<template>
  <Content :loading="loading">
    <template #head>
      <Button
        v-show="$authres(['view_fireplaylistmanager_backlist'])"
        class="mr-2"
        to="/PlayListManager"
      >
        返回列表
      </Button>

      <Button
        v-show="kind && $authres(['view_fireplaylistmanager_firebutton'])"
        type="success"
        @click="onSubmit"
      >
        创建
      </Button>
      <Button
        v-show="!kind && $authres(['view_fireplaylistmanager_updatebutton'])"
        class="mr-2"
        type="success"
        @click="update"
      >
        更新
      </Button>
      <Button
        v-show="!kind && $authres(['view_fireplaylistmanager_deletebutton'])"
        type="error"
        ghost
        @click="remove"
      >
        删除
      </Button>
    </template>
    <input
      v-model.trim="playlist.title"
      type="text"
      class="w-100 h3 py-3 border-0"
      placeholder="请输入歌单名称(30字)"
    />
    <input
      v-model.trim="playlist.subTitle"
      type="text"
      class="w-100 h5 py-3 border-0"
      placeholder="请输入歌单说明(100字)"
    />

    <FormItemBlock title="添加封面">
      <EnterImage v-model="playlist.icon" :imagemax="1" />
    </FormItemBlock>

    <FormItemBlock :title="`包含歌曲(${playlist.songs.length})`">
      <FirePlayListItem :playlist="playlist" />
    </FormItemBlock>
  </Content>
</template>

<script>
export default {
  data() {
    return {
      playlist: {},

      kind: true, // true 发表文章 false 修改文章
      loading: 0,
      rootMenu: [],
    };
  },

  created() {
    this.playlistInit();
    this.kind = this.$route.query.id == "" || this.$route.query.id == undefined;
    !this.kind ? this.select() : "";
  },
  computed: {
    isRight() {
      return (
        this.playlist.title == "" ||
        this.playlist.subTitle == "" ||
        this.playlist.icon.length == 0
      );
    },
  },
  methods: {
    playlistInit() {
      this.playlist = {
        title: "",
        subTitle: "",
        icon: [],
        songs: [],
      };
    },

    onSubmit() {
      if (this.isRight) {
        return this.$Message.error("信息不完整!");
      }
      this.$request
        .playListInsert({ ...this.playlist, icon: this.playlist.icon[0] })
        .then((result) => {
          if (result.flag) {
            this.$Message.success("歌单已创建!");
            this.playlistInit();
          } else {
            this.$Message.error(result.msg);
          }
        })
        .catch((err) => this.$Message.error(error));
    },
    select() {
      this.loading = 1;
      this.$request
        .playListFindById(this.$route.query.id)
        .then((result) => {
          if (result.flag) {
            this.loading = 2;
            const data = result.data[0];
            this.playlist = data;
            this.playlist.icon = [data.icon];
          } else {
            this.loading = 3;
          }
        })
        .catch((err) => (this.loading = 3));
    },
    remove() {
      this.$request
        .playListDeleteById(this.$route.query.id)
        .then((result) => {
          if (result.flag) {
            this.$Message.success("删除成功!");
            this.$router.push("/PlayListManager");
          } else {
            this.$Message.error(flag.msg);
          }
        })
        .catch((err) => this.$Message.error("删除失败!"));
    },
    update() {
      this.$request
        .playListUpdate(this.$route.query.id, {
          ...this.playlist,
          icon: this.playlist.icon[0],
        })
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
