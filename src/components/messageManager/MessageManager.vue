<template>
  <Content>
    <template #head>
      <DatePicker
        clearable
        class="mr-2"
        @on-clear="selectChange"
        v-model.trim="selectTime"
        type="daterange"
        split-panels
        placeholder="日期"
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
    <MessageItem v-for="(item, index) in contexts" :key="index" :message="item" />

    <template #bottom>
      <div class="text-center shadow-lg p-3 bg-white">
        <Input
          class="w-50 mr-2 shadow-sm"
          placeholder="说点啥..."
          clearable
          v-model.trim="message"
          @keydown.enter.native="fireMessage"
        />
        <Button type="success" class="shadow-sm" ghost @click="fireMessage">提交</Button>
      </div>
    </template>
  </Content>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      contextSum: 0, // 总数
      contexts: [], // 记录
      pageSteep: 10, // 每页条数
      selectTime: [], // 搜索关键词

      page: 1,

      // loading: 1, // 1 加载中 2 成功 3 失败

      message: "", // 发送的消息
    };
  },
  mounted() {
    this.select();
  },
  computed: {
    ...mapState(["userInf"]),
  },
  methods: {
    select() {
      // this.loading = 1;
      this.$request
        .adminMessageFindByPage(this.page, this.pageSteep, this.selectTime)
        .then((result) => {
          if (result.flag) {
            this.contexts = result.data.webMessages.reverse();
            this.contextSum = result.data.webMessageSum;
          }
          // this.loading = 2;
        })
        .catch((err) => {
          /*(this.loading = 3)*/
        });
    },
    pageChange(num) {
      this.page = num;
      this.select();
    },
    selectChange() {
      this.pageChange(1);
    },
    fireMessage() {
      if (this.message == "") {
        return this.$Message.error("消息不能为空!");
      }
      this.$request
        .adminMessageInsert(this.userInf._id, this.message)
        .then((result) => {
          if (result.flag) {
            this.selectChange();
            this.$Message.success("发送成功!");
            this.message = "";
          } else {
            this.$Message.success(result.msg);
          }
        })
        .catch((err) => {
          this.$Message.error("发送失败!");
        });
    },
  },
};
</script>

<style>
.card-icon {
  width: 4.5rem;
  height: 4.5rem;
}
</style>
