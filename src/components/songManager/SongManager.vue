<template>
  <Content :loading="loading">
    <template #head>
      <Input
        v-show="$authres(['view_songmanager_searchgroup'])"
        @keydown.enter.native="selectChange"
        @on-clear="selectChange"
        v-model.trim="selectWorld"
        suffix="ios-search"
        placeholder="搜索"
        style="width: 10rem"
        class="mr-2"
        clearable
      />
      <Button
        v-show="$authres(['view_songmanager_searchgroup'])"
        class="mr-2"
        @click="selectChange"
      >
        搜索
      </Button>

      <Button
        v-show="$authres(['view_songmanager_firebutton'])"
        type="success"
        ghost
        to="/FireSongManager"
      >
        新建歌曲
      </Button>
    </template>
    <Page
      :page-size="pageSteep"
      :total="contextSum"
      :current="page"
      @on-change="pageChange"
      show-total
      show-elevator
    />
    <Null v-show="contexts.length == 0" />
    <SongItem v-for="(item, index) in contexts" :key="index" :song="item" />
  </Content>
</template>

<script>
export default {
  data() {
    return {
      contextSum: 0, // 总数
      contexts: [], // 记录
      pageSteep: 10, // 每页条数
      selectWorld: "", // 搜索关键词

      page: 1,
      loading: 1, // 1 加载中 2 成功 3 失败
    };
  },
  mounted() {
    this.select();
  },
  methods: {
    select() {
      this.loading = 1;
      this.$request
        .songFindPage(this.page, this.pageSteep, this.selectWorld)
        .then((result) => {
          if (result.flag) {
            this.contexts = result.data.songs;
            this.contextSum = result.data.songSum;
            this.loading = 2;
          } else {
            this.loading = 3;
          }
        })
        .catch(() => (this.loading = 3));
    },
    pageChange(num) {
      this.page = num;
      this.select();
    },
    selectChange() {
      this.pageChange(1);
    },
  },
};
</script>
