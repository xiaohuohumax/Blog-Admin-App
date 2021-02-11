<template>
  <Content :loading="loading">
    <template #head>
      <Button class="mr-2" to="/RoleManager">返回列表</Button>

      <Button type="success" @click="onSubmit" v-if="kind">创建</Button>

      <Button class="mr-2" type="success" @click="update" v-if="!kind">更新</Button>
      <Button type="error" ghost @click="remove" v-if="!kind">删除</Button>
    </template>
    <div>
      <div class="mb-2">角色名称:</div>
      <Input placeholder="标签" v-model.trim="role.name" />
    </div>
    <div class="pt-3">
      <div class="mb-2">角色授权码:</div>
      <Input placeholder="标签" v-model.trim="role.code" />
    </div>
    <div class="pt-3">
      <div class="mb-2">角色拥有资源({{ role.resources.length }}):</div>
      <FireRoleItem :role="role" />
    </div>
  </Content>
</template>

<script>
import { mapState } from "vuex";
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
    ...mapState(["userInf"]),
    isRight() {
      return this.role.name == "" || this.role.code == "";
    },
  },
  methods: {
    onSubmit() {
      if (this.isRight) {
        return this.$Message.error("信息不完整!");
      }
      this.$request
        .authorityRoleInsert(this.role)
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
        .catch((err) => this.$Message.error(error));
    },
    select() {
      this.loading = 1;
      this.$request
        .authorityFindRoleById(this.$route.query.id)
        .then((result) => {
          if (result.flag) {
            this.loading = 2;
            this.role = result.data[0];
          } else {
            this.loading = 3;
          }
        })
        .catch((err) => (this.loading = 3));
    },
    remove() {
      this.$request
        .authorityRoleDeleteById(this.$route.query.id)
        .then((result) => {
          if (result.flag) {
            this.$Message.success("删除成功!");
            this.$router.push("/RoleManager");
          } else {
            this.$Message.error(flag.msg);
          }
        })
        .catch((err) => this.$Message.error("删除失败!"));
    },
    update() {
      this.$request
        .authorityRoleUpdateById(this.$route.query.id, this.role)
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
