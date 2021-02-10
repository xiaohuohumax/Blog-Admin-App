<template>
  <Content :loading="loading">
    <template #head>
      <Button class="mr-2" to="/ArticleManager">返回列表</Button>
      <Button type="success" ghost class="mr-2" @click="update">保存信息</Button>
      <Button type="error" ghost class="mr-2" @click="remove">删除账号</Button>
    </template>
    <div class="d-flex">
      <div
        class="card-icon rounded-circle mr-2 shadow-sm flex-shrink-0"
        :style="cardIconStyle"
      ></div>
      <div class="flex-grow-1 h6 font-weight-bold">
        {{ content.name }}
        <span class="ml-2 small font-weight-bold">
          lv{{ content.level }} {{ content.genger }}
        </span>
        <div class="small my-1">{{ content.signature }}</div>
      </div>
    </div>
    <div class="small mt-2">
      <Row>
        <Col class="mb-1" :xs="{ span: 12 }" :lg="{ span: 6 }"
          >登录IP:{{ content.loginIp }}</Col
        >
        <Col class="mb-1" :xs="{ span: 12 }" :lg="{ span: 6 }">
          登录时间:<Time :time="content.loginTime" type="datetime" />
        </Col>
        <Col class="mb-1" :xs="{ span: 12 }" :lg="{ span: 6 }">
          允许登录: <i-switch v-model="content.allowLogin" size="small" />
        </Col>
        <Col class="mb-1" :xs="{ span: 12 }" :lg="{ span: 6 }">
          允许评论: <i-switch v-model="content.allowTalk" size="small"
        /></Col>
      </Row>
    </div>
  </Content>
</template>

<script>
export default {
  data() {
    return {
      loading: 1,

      content: {},
    };
  },
  mounted() {
    this.select();
  },
  computed: {
    cardIconStyle() {
      return `backgrond:url('${this.content.icon}') center / cover;`;
    },
  },
  methods: {
    select() {
      this.loading = 1;
      this.$request
        .webUserFindbyid(this.$route.params.id)
        .then((result) => {
          if (result.flag) {
            this.loading = 2;
            this.content = result.data[0];
          } else {
            this.loading = 3;
          }
        })
        .catch((err) => (this.loading = 3));
    },
    remove() {
      this.$request
        .webUserDeleteById(this.$route.params.id)
        .then((result) => {
          if (result.flag) {
            this.$Message.success("删除成功!");
            this.$router.push("/WebUserManager");
          } else {
            this.$Message.error(flag.msg);
          }
        })
        .catch((err) => this.$Message.error("删除失败!"));
    },
    update() {
      this.$request
        .WebUserUpdateById(this.$route.params.id, this.content)
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

<style></style>
