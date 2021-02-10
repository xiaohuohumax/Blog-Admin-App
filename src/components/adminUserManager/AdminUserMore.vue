<template>
  <Content :loading="loading">
    <template #head>
      <Button class="mr-2" to="/AdminUserManager">返回列表</Button>
      <Button type="success" ghost class="mr-2" @click="update">保存信息</Button>
      <Button type="error" ghost class="mr-2" @click="remove">删除账号</Button>
    </template>
    <div class="pt-3">
      <div class="mb-2">昵称:</div>
      <Input v-model="content.name" />
    </div>
    <div class="pt-3">
      <div class="mb-2">密码:</div>
      <Input v-model="content.pass" />
    </div>
    <div class="pt-3">
      <div class="mb-2">等级:</div>
      <RadioGroup v-model="content.level">
        <Radio :label="item" v-for="(item, index) in level" :key="index"></Radio>
      </RadioGroup>
    </div>
    <div class="pt-3">
      <div class="mb-2">头像:</div>
      <EnterImage v-model="icon" :imagemax="1" />
    </div>
    <div class="pt-3">
      <div class="mb-2">个性签名:</div>
      <Input v-model="content.signature" />
    </div>
    <div class="pt-3">
      <div class="mb-2">允许登录:</div>
      <i-switch v-model="content.allowLogin" size="large">
        <span slot="open">允许</span>
        <span slot="close">禁止</span>
      </i-switch>
    </div>
    <div class="pt-3">
      <div class="mb-2">允许评论:</div>
      <i-switch v-model="content.allowTalk" size="large">
        <span slot="open">允许</span>
        <span slot="close">禁止</span>
      </i-switch>
    </div>
    <div class="pt-3">
      <div class="mb-2">性别:</div>
      <RadioGroup v-model="content.genger">
        <Radio label="男"></Radio>
        <Radio label="女"></Radio>
        <Radio label="其他"></Radio>
      </RadioGroup>
    </div>
  </Content>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      loading: 1,
      icon: "",
      content: {},
    };
  },
  watch: {
    icon() {
      this.icon[0] && (this.content.icon = this.icon[0]);
    },
  },
  mounted() {
    this.select();
  },
  computed: {
    ...mapState(["userInf"]),
    cardIconStyle() {
      return `backgrond:url('${this.content.icon}') center / cover;`;
    },
    level() {
      let levelNumber = [];
      for (let x = 0; x < 7; x++) {
        levelNumber.push(x);
      }
      return levelNumber;
    },
  },
  methods: {
    ...mapMutations(["userLogout"]),
    select() {
      this.loading = 1;
      this.$request
        .adminUserFindbyid(this.$route.params.id)
        .then((result) => {
          if (result.flag) {
            this.loading = 2;
            this.content = result.data[0];
            this.icon = [this.content.icon];
          } else {
            this.loading = 3;
          }
        })
        .catch((err) => (this.loading = 3));
    },
    remove() {
      this.$request
        .adminUserDeleteById(this.$route.params.id)
        .then((result) => {
          if (result.flag) {
            this.$Message.success("删除成功!");
            this.$router.push("/AdminUserManager");
          } else {
            this.$Message.error(flag.msg);
          }
        })
        .catch((err) => this.$Message.error("删除失败!"));
    },
    update() {
      this.$request
        .adminUserUpdate(this.$route.params.id, this.content)
        .then((result) => {
          if (result.flag) {
            this.$Message.success("修改成功!");

            if (this.$route.params.id == this.userInf._id) {
              this.userLogout();
              return this.$router.push("/");
            }

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
