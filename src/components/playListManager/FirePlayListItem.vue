<template>
  <div>
    <div class="fire-playlist-item d-flex align-items-center mb-2">
      <Input
        @keydown.enter.native="selectChange"
        @on-clear="selectChange"
        v-model.trim="selectWorld"
        suffix="ios-search"
        placeholder="搜索"
        style="width: 10rem"
        class="mr-2"
        clearable
      />
      <Button class="mr-2" @click="selectChange">搜索</Button>
      <Checkbox class="mb-0" v-model="selectYourself">只搜索已选资源</Checkbox>
    </div>

    <Page
      :page-size="pageSteep"
      :total="contextSum"
      :current="page"
      @on-change="pageChange"
      show-total
    />
    <div class="playlist-table d-flex font-weight-bold pb-2">
      <div class="playlist-table-checkbox">
        <input type="checkbox" v-model="checkAll" />
      </div>
      <div class="playlist-table-name">歌名</div>
      <div class="playlist-table-subTitle">说明</div>
    </div>

    <div
      class="playlist-table d-flex py-2 border-top"
      v-for="(item, index) in contexts"
      :key="index"
    >
      <div class="playlist-table-checkbox">
        <input
          type="checkbox"
          v-model="playlist.songs"
          name="songs"
          :value="item._id"
        />
      </div>
      <div class="playlist-table-name">
        <router-link :to="`FireSongManager?id=${item._id}`">
          {{ item.name }}
        </router-link>
      </div>
      <div class="playlist-table-subTitle">{{ item.subTitle }}</div>
    </div>

    <Null v-show="contexts.length == 0" />
  </div>
</template>

<script>
import authorityEnum from "../../script/authorityEnum";
export default {
  props: {
    playlist: Object,
  },
  data() {
    return {
      checkAll: false, // 全选
      contextSum: 0, // 总数
      contexts: [], // 记录
      pageSteep: 10, // 每页条数
      selectWorld: "", // 搜索关键词
      page: 1,
      authorityEnum,

      selectYourself: false, // 只查看自己的资源
    };
  },
  watch: {
    checkAll: "checkAllChange",
    selectYourself: "selectChange",
    contexts() {
      this.checkAll = this.isAllInRoleResources;
    },
  },

  created() {
    this.selectSongByPage();
  },
  computed: {
    // 是否全在队列中
    isAllInRoleResources() {
      const playlistIds = this.contexts.map((val) => val._id);
      for (const item of playlistIds) {
        if (!this.playlist.songs.includes(item)) {
          return false;
        }
      }
      return true;
    },
  },
  methods: {
    // 获取类型
    getKind(kind) {
      for (const key in this.authorityEnum) {
        if (kind == this.authorityEnum[key].code) {
          return this.authorityEnum[key].name;
        }
      }
      return "";
    },
    // 全选与全部选切换
    checkAllChange() {
      let checkAll = this.checkAll;
      const playlistIds = this.contexts.map((val) => val._id);
      // 全选
      if (checkAll) {
        let newResources = this.playlist.songs.concat(playlistIds);
        this.playlist.songs = Array.from(new Set(newResources));
      } else if (this.isAllInRoleResources) {
        // 全不选
        for (const item of playlistIds) {
          let index = this.playlist.songs.lastIndexOf(item);
          if (index != -1) {
            this.playlist.songs.splice(index, 1);
          }
        }
      }
    },
    selectSongByPage() {
      this.$request
        .songFindPage(this.page, this.pageSteep, this.selectWorld)
        .then((result) => {
          if (result.flag) {
            this.contexts = result.data.songs;
            this.contextSum = result.data.songSum;
          }
        })
        .catch((err) => {});
    },
    selectSongByPageAndIds() {
      this.$request
        .songFindByPageAndIds(
          this.page,
          this.pageSteep,
          this.selectWorld,
          this.playlist.songs
        )
        .then((result) => {
          if (result.flag) {
            this.contexts = result.data.songs;
            this.contextSum = result.data.songSum;
          }
        })
        .catch((err) => {});
    },
    pageChange(num) {
      this.page = num;
      this.selectYourself ? this.selectSongByPageAndIds() : this.selectSongByPage();
    },
    selectChange() {
      this.pageChange(1);
    },
  },
};
</script>

<style lang="less">
.playlist-table {
  & > * {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .playlist-table-checkbox {
    width: 5%;
  }
  .playlist-table-name {
    width: 35%;
  }
  .playlist-table-subTitle {
    width: 60%;
  }
}
</style>
