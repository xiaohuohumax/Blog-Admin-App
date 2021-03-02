<template>
  <Content :loading="loading">
    <template #head>
      <Input
        v-show="$authres(['view_toolmanager_searchgroup'])"
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
        class="mr-2"
        v-show="$authres(['view_toolmanager_searchgroup'])"
        @click="selectChange"
      >
        搜索
      </Button>
      <Button
        class="mr-2"
        type="success"
        ghost
        to="/FireToolManager"
        v-show="$authres(['view_toolmanager_firebutton'])"
      >
        创建工具
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
    <ToolItem v-for="(item, index) in contexts" :key="index" :tool="item" />
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
        .toolFindByPage(this.page, this.pageSteep, this.selectWorld)
        .then((result) => {
          if (result.flag) {
            this.contexts = result.data.tools;
            this.contextSum = result.data.toolSum;
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
