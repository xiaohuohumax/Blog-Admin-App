<template>
  <Content>
    <template #head> </template>
    <Card class="sticky-top">
      <Input v-model="content.title" placeholder="通知标题"></Input>
      <Input
        class="mt-2"
        v-model="content.desc"
        type="textarea"
        :rows="5"
        placeholder="通知内容(向前端用户发送实时信息)"
      ></Input>
      <div class="d-flex justify-content-between align-items-center mt-2">
        <div class="d-flex justify-content-between align-items-center">
          <span class="mr-2">通知类型:</span>
          <RadioGroup v-model="content.kind">
            <Radio
              class="mb-0"
              :label="item.value"
              v-for="(item, index) in informKind"
              :key="index"
            >
              {{ item.name }}
            </Radio>
          </RadioGroup>
        </div>
        <Button type="primary" @click="onSubmit">发送</Button>
      </div>
    </Card>

    <div class="mt-2">
      <Card v-show="informArr.length != 0" class="mt-2 font-weight-bold"
        >注意: 通知不保存,下线立即销毁.</Card
      >
      <FireInformItem v-for="(item, index) in informArr" :key="index" :inform="item" />
      <Null v-show="informArr.length == 0" />
    </div>
  </Content>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      content: {},
      informKind: [
        { name: "消息", value: "info" },
        { name: "成功", value: "success" },
        { name: "警告", value: "warning" },
        { name: "错误", value: "error" },
      ],
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    ...mapState(["userInf", "informArr"]),
    isRight() {
      return this.content.desc == "";
    },
  },
  methods: {
    ...mapMutations(["addInform"]),
    init() {
      this.content = {
        title: "来自管理员的通知",
        desc: "",
        duration: 10,
        kind: "info",
        time: "",
      };
    },
    onSubmit() {
      if (this.isRight) {
        return this.$Message.error("信息不完整!");
      }
      this.content.time = Date.now();
      this.$request
        .informSendMessage(this.content)
        .then((result) => {
          if (result.flag) {
            this.$Message.success("通知已发表!");
            this.addInform(this.content);
            this.init();
          } else {
            this.$Message.error(result.msg);
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
