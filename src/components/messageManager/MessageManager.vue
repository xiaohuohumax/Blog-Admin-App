<template>
  <Content>
    <template #head>
      <DatePicker
        v-show="$authres(['view_messagemanager_searchgroup'])"
        clearable
        class="mr-2"
        @on-clear="selectChange"
        v-model.trim="selectTime"
        type="daterange"
        split-panels
        placeholder="日期"
        style="width: 10rem"
      ></DatePicker>
      <Button v-show="$authres(['view_messagemanager_searchgroup'])" @click="selectChange">
        搜索
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
    <MessageItem v-for="(item, index) in contexts" :key="index" :message="item" />

    <template #bottom>
      <div class="text-center shadow-lg p-3 bg-white">
        <Input
          v-show="$authres(['view_messagemanager_firebutton'])"
          class="w-50 mr-2 shadow-sm"
          placeholder="说点啥..."
          clearable
          v-model.trim="message"
          @keydown.enter.native="fireMessage"
        />
        <Button
          v-show="$authres(['view_messagemanager_firebutton'])"
          type="success"
          class="shadow-sm"
          ghost
          @click="fireMessage"
        >
          发送
        </Button>
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
      this.$request
        .adminMessageFindByPage(this.page, this.pageSteep, this.selectTime)
        .then((result) => {
          if (result.flag) {
            this.contexts = result.data.webMessages.reverse();
            this.contextSum = result.data.webMessageSum;
          }
        })
        .catch((err) => {});
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
        .adminMessageInsert({adminId:this.userInf._id, message:this.message})
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
