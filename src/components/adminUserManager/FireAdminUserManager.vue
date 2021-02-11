<template>
  <Content :loading="loading">
    <template #head>
      <Button class="mr-2" to="/AdminUserManager">返回列表</Button>

      <Button type="success" @click="onSubmit" v-if="kind">创建</Button>

      <Button class="mr-2" type="success" @click="update" v-if="!kind">更新</Button>
      <Button type="error" ghost @click="remove" v-if="!kind">删除</Button>
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
      <div class="mb-2">角色:</div>
      <CheckboxGroup v-model="content.roles">
        <Checkbox :label="item._id" v-for="(item, index) in allRoles" :key="index">
          {{ item.name }}
        </Checkbox>
      </CheckboxGroup>
    </div>
    <div class="pt-3">
      <div class="mb-2">等级:</div>
      <RadioGroup v-model="content.level">
        <Radio :label="item" v-for="(item, index) in level" :key="index"></Radio>
      </RadioGroup>
    </div>
    <div class="pt-3">
      <div class="mb-2">头像:</div>
      <EnterImage v-model="content.icon" :imagemax="1" />
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
      content: {},
      allRoles: [],

      kind: true, // true 发表文章 false 修改文章
      loading: 0,
    };
  },
  created() {
    this.userInit();
    this.kind = this.$route.query.id == "" || this.$route.query.id == undefined;

    !this.kind ? this.select() : "";
    this.selectAllRoles();
  },
  computed: {
    ...mapState(["userInf"]),
    level() {
      let levelNumber = [];
      for (let x = 0; x < 7; x++) {
        levelNumber.push(x);
      }
      return levelNumber;
    },
    isRight() {
      return this.content.name == "" || this.content.pass == "";
    },
  },
  methods: {
    ...mapMutations(["userLogout"]),
    userInit() {
      this.content = {
        name: "",
        pass: "",
        level: 6,
        icon: [],
        signature: "",
        allowLogin: true,
        allowTalk: true,
        genger: "其他",
      };
    },
    onSubmit() {
      if (this.isRight) {
        return this.$Message.error("信息不完整!");
      }
      let params = this.content;
      params.icon = params.icon[0];
      this.$request
        .adminUserInsert(params)
        .then((result) => {
          if (result.flag) {
            this.$Message.success("用户已创建!");
            this.userInit();
          } else {
            this.$Message.error(result.msg);
          }
        })
        .catch((err) => this.$Message.error(error));
    },
    // 查询全部角色
    selectAllRoles() {
      this.$request
        .authorityFindAllRole()
        .then((result) => {
          if (result.flag) {
            this.allRoles = result.data;
          }
        })
        .catch((err) => {});
    },
    select() {
      this.loading = 1;
      this.$request
        .adminUserFindbyid(this.$route.query.id)
        .then((result) => {
          if (result.flag) {
            this.content = result.data[0];
            this.content.icon = [this.content.icon];
            this.loading = 2;
          } else {
            this.loading = 3;
          }
        })
        .catch((err) => (this.loading = 3));
    },
    remove() {
      this.$request
        .adminUserDeleteById(this.$route.query.id)
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
        .adminUserUpdate(this.$route.query.id, {
          ...this.content,
          icon: this.content.icon[0],
        })
        .then((result) => {
          if (result.flag) {
            this.$Message.success("修改成功!");

            if (this.$route.query.id == this.userInf._id) {
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
