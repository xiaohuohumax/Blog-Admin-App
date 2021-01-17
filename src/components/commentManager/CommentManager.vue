<template>
  <Content :loading="loading">
    <template #head>
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
      <DatePicker
        type="daterange"
        v-model="selectTime"
        @on-clear="selectChange"
        placement="bottom-start"
        placeholder="选择时间"
        class="mr-2"
        style="width: 10rem"
      ></DatePicker>
      <Button @click="selectChange">搜索</Button>
    </template>
    <Page
      :page-size="pageSteep"
      :total="contextSum"
      :current="page"
      @on-change="pageChange"
    />
    <Null v-show="contexts.length == 0" />
    <CommentItem @change="selectChange" v-for="(item, index) in contexts" :key="index" :comment="item" />
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

      selectTime: [], // 时间 范围
      kind: "", // 搜索类型
    };
  },
  mounted() {
    this.select();
  },
  methods: {
    select() {
      this.loading = 1;
      this.$request
        .commentFindByPageMore(
          this.page,
          this.pageSteep,
          this.kind,
          this.selectWorld,
          this.selectTime
        )
        .then((result) => {
          this.contexts = result.comments;
          this.contextSum = result.commentSum;
          this.loading = 2;
        })
        .catch((err) => (this.loading = 3));
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

<style></style>
