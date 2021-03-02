<template>
  <Content :loading="loading">
    <template #head>
      <Button
        v-show="$authres(['view_firewebrolemanager_backlist'])"
        class="mr-2"
        to="/WebRoleManager"
      >
        返回列表
      </Button>
      <Button
        v-show="kind && $authres(['view_firewebrolemanager_firebutton'])"
        type="success"
        @click="onSubmit"
      >
        创建
      </Button>
      <Button
        v-show="!kind && $authres(['view_firewebrolemanager_updatebutton'])"
        class="mr-2"
        type="success"
        @click="update"
      >
        更新
      </Button>
      <Button
        v-show="!kind && $authres(['view_firewebrolemanager_deletebutton'])"
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
      <FireWebRoleItem :role="role" />
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
        .webRoleInsert(this.role)
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
        .webRoleFindById(this.$route.query.id)
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
        .webRoleDeleteById(this.$route.query.id)
        .then((result) => {
          if (result.flag) {
            this.$Message.success("删除成功!");
            this.$router.push("/WebRoleManager");
          } else {
            this.$Message.error(flag.msg);
          }
        })
        .catch(() => this.$Message.error("删除失败!"));
    },
    update() {
      this.$request
        .webRoleUpdateById(this.$route.query.id, this.role)
        .then((result) => {
          if (result.flag) {
            this.$Message.success("修改成功!");
            this.select();
          } else {
            this.$Message.error(result.msg);
          }
        })
        .catch(() => this.$Message.error("修改失败!"));
    },
  },
};
</script>
