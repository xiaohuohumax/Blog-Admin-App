<template>
  <Content :loading="loading">
    <template #head>
      <Button
        v-show="$authres(['view_firerolemanager_backlist'])"
        class="mr-2"
        to="/RoleManager"
      >
        返回列表
      </Button>
      <Button
        v-show="kind && $authres(['view_firerolemanager_firebutton'])"
        type="success"
        @click="onSubmit"
      >
        创建
      </Button>
      <Button
        v-show="!kind && $authres(['view_firerolemanager_updatebutton'])"
        class="mr-2"
        type="success"
        @click="update"
      >
        更新
      </Button>
      <Button
        v-show="!kind && $authres(['view_firerolemanager_deletebutton'])"
        type="error"
        ghost
        @click="remove"
      >
        删除
      </Button>
    </template>
    <FormItemBlock title="角色名称">
      <Input placeholder="标签" v-model.trim="role.name" />
    </FormItemBlock>

    <FormItemBlock title="角色授权码">
      <Input placeholder="标签" v-model.trim="role.code" />
    </FormItemBlock>

    <FormItemBlock :title="`拥有资源(${role.resources.length})`">
      <FireRoleItem :role="role" />
    </FormItemBlock>
  </Content>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      role: {
        resources: [],
        name: "",
        code: "",
      },

      kind: true, // true 发表文章 false 修改文章
      loading: 0,
    };
  },

  created() {
    this.kind = this.$route.query.id == "" || this.$route.query.id == undefined;
    !this.kind ? this.select() : "";
  },
  computed: {
    ...mapState(["userInf", "roles"]),
    isRight() {
      return this.role.name == "" || this.role.code == "";
    },
  },
  methods: {
    ...mapMutations(["userLogout", "userLogin"]),
    onSubmit() {
      if (this.isRight) {
        return this.$Message.error("信息不完整!");
      }
      this.$request
        .roleInsert(this.role)
        .then((result) => {
          if (result.flag) {
            this.$Message.success("角色已创建!");
            this.role = {
              resources: [],
              name: "",
              code: "",
            };
          } else {
            this.$Message.error(result.msg);
          }
        })
        .catch(() => this.$Message.error("创建失败!"));
    },
    select() {
      this.loading = 1;
      this.$request
        .roleFindById(this.$route.query.id)
        .then((result) => {
          if (result.flag) {
            this.loading = 2;
            this.role = result.data[0];
          } else {
            this.loading = 3;
          }
        })
        .catch(() => (this.loading = 3));
    },
    remove() {
      this.$request
        .roleDeleteById(this.$route.query.id)
        .then((result) => {
          if (result.flag) {
            this.$Message.success("删除成功!");
            this.$router.push("/RoleManager");
          } else {
            this.$Message.error(flag.msg);
          }
        })
        .catch(() => this.$Message.error("删除失败!"));
    },
    update() {
      this.$request
        .roleUpdateById(this.$route.query.id, this.role)
        .then((result) => {
          if (result.flag) {
            // 修改有关登陆者的角色
            if (this.roles.map((val) => val._id).includes(this.role._id)) {
              this.selectYourself();
            }
            this.$Message.success("修改成功!");
            this.select();
          } else {
            this.$Message.error(result.msg);
          }
        })
        .catch(() => this.$Message.error("修改失败!"));
    },

    selectYourself() {
      this.$request
        .adminUserFindBySession()
        .then((result) => {
          if (result.flag) {
            this.userLogin(result.data);
          } else {
            this.$Message.error(result.msg);
            this.userLogout();
            return this.$router.push("/");
          }
        })
        .catch(() => {});
    },
  },
};
</script>
