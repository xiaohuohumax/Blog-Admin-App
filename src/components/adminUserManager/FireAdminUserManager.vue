<template>
  <Content :loading="loading">
    <template #head>
      <Button
        v-show="$authres(['view_fireadminusermanager_backlistbutton'])"
        class="mr-2"
        to="/AdminUserManager"
      >
        返回列表
      </Button>
      <Button
        v-show="kind && $authres(['view_fireadminusermanager_firebutton'])"
        type="success"
        @click="onSubmit"
      >
        创建
      </Button>
      <Button
        v-show="!kind && $authres(['view_fireadminusermanager_updatebutton'])"
        class="mr-2"
        type="success"
        @click="update"
      >
        更新
      </Button>
      <Button
        v-show="!kind && $authres(['view_fireadminusermanager_deletebutton'])"
        type="error"
        ghost
        @click="remove"
      >
        删除
      </Button>
    </template>
    <FormItemBlock class="mt-0" title="昵称">
      <Input v-model="content.name" />
    </FormItemBlock>

    <FormItemBlock title="密码">
      <Input type="password" password v-model="content.pass" />
    </FormItemBlock>

    <FormItemBlock title="角色">
      <CheckboxGroup v-model="content.roles">
        <Checkbox
          :disabled="!$authres(['form_fireresourcemanager_roleundisabled'])"
          :label="item._id"
          v-for="(item, index) in allRoles"
          :key="index"
        >
          {{ item.name }}[{{ item.resources.length }}]
        </Checkbox>
      </CheckboxGroup>
    </FormItemBlock>

    <FormItemBlock title="等级">
      <RadioGroup v-model="content.level">
        <Radio
          :disabled="!$authres(['form_fireresourcemanager_levelundisabled'])"
          :label="item"
          v-for="(item, index) in level"
          :key="index"
        ></Radio>
      </RadioGroup>
    </FormItemBlock>

    <FormItemBlock title="头像">
      <EnterImage v-model="content.icon" :imagemax="1" />
    </FormItemBlock>

    <FormItemBlock title="个性签名">
      <Input v-model="content.signature" />
    </FormItemBlock>

    <FormItemBlock title="允许登陆">
      <i-switch
        :disabled="!$authres(['form_fireresourcemanager_allowloginundisabled'])"
        v-model="content.allowLogin"
        size="large"
      >
        <span slot="open">允许</span>
        <span slot="close">禁止</span>
      </i-switch>
    </FormItemBlock>

    <FormItemBlock title="允许评论">
      <i-switch
        :disabled="!$authres(['form_fireresourcemanager_allowtalkundisabled'])"
        v-model="content.allowTalk"
        size="large"
      >
        <span slot="open">允许</span>
        <span slot="close">禁止</span>
      </i-switch>
    </FormItemBlock>

    <FormItemBlock title="性别">
      <RadioGroup v-model="content.genger">
        <Radio label="男"></Radio>
        <Radio label="女"></Radio>
        <Radio label="其他"></Radio>
      </RadioGroup>
    </FormItemBlock>
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
