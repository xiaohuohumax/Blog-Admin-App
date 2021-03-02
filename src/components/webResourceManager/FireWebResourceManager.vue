<template>
  <Content :loading="loading">
    <template #head>
      <Button
        v-show="$authres(['view_firewebresourcemanager_backbutton'])"
        class="mr-2"
        to="/WebResourceManager"
      >
        返回列表
      </Button>

      <Button
        v-show="kind && $authres(['view_firewebresourcemanager_firebutton'])"
        type="success"
        @click="onSubmit"
      >
        创建
      </Button>
      <Button
        v-show="!kind && $authres(['view_firewebresourcemanager_updatebutton'])"
        class="mr-2"
        type="success"
        @click="update"
      >
        更新
      </Button>
      <Button
        v-show="!kind && $authres(['view_firewebresourcemanager_deletebutton'])"
        type="error"
        ghost
        @click="remove"
      >
        删除
      </Button>
    </template>
    <FormItemBlock class="mt-0" title="资源名称">
      <Input v-model.trim="resource.name" />
    </FormItemBlock>

    <FormItemBlock title="资源授权码">
      <Input v-model.trim="resource.code" />
    </FormItemBlock>

    <FormItemBlock title="路径" subtitle="菜单时表示路由路径">
      <Input v-model.trim="resource.path" />
    </FormItemBlock>

    <FormItemBlock title="资源类型">
      <Select v-model="resource.kind">
        <Option v-for="(item, index) in kindArray" :key="index" :value="item.code">
          {{ item.name }}[{{ item.help }}]
        </Option>
      </Select>
    </FormItemBlock>
    <FormItemBlock title="菜单父节点">
      <Select v-model.trim="resource.parentId" clearable>
        <Option value="-1">根目录</Option>
        <Option v-for="(item, index) in rootMenu" :key="index" :value="item._id">
          {{ item.name }}| {{ item.code }}
        </Option>
      </Select>
    </FormItemBlock>

    <FormItemBlock title="菜单图标" subtitle="菜单时显示图标">
      <Input :prefix="resource.icon" v-model.trim="resource.icon" />
    </FormItemBlock>

    <FormItemBlock title="菜单顺序" subtitle="数值越小菜单越靠前">
      <Input v-model.trim="resource.index" />
    </FormItemBlock>
  </Content>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import authorityWebEnum from "../../script/authorityWebEnum";
export default {
  data() {
    return {
      resource: {},
      authorityWebEnum,

      kind: true, // true 发表文章 false 修改文章
      loading: 0,
      rootMenu: [],
    };
  },
  watch: {
    "resource.parentId"() {
      this.resource.parentId == undefined ? (this.resource.parentId = "") : "";
    },
  },

  created() {
    this.resourceInit();
    this.kind = this.$route.query.id == "" || this.$route.query.id == undefined;
    !this.kind ? this.select() : "";
    this.findRootMenu();
  },
  computed: {
    ...mapState(["userInf", "resources"]),
    isRight() {
      return this.resource.name == "" || this.resource.code == "";
    },
    isRoot() {
      return this.resource.parentId == "-1";
    },
    isMenu() {
      return this.resource.kind == this.authorityWebEnum.menu.code;
    },
    kindArray() {
      let arr = [];
      for (const key in this.authorityWebEnum) {
        arr.push({
          kind: key,
          ...this.authorityWebEnum[key],
        });
      }
      return arr;
    },
  },
  methods: {
    ...mapMutations(["userLogout", "userLogin"]),
    resourceInit() {
      this.resource = {
        parentId: "",
        index: "",
        name: "",
        code: "",
        icon: "",
        path: "",
        kind: authorityWebEnum.api.code,
      };
    },
    findRootMenu() {
      this.$request
        .webResourceFindRootMenu()
        .then((result) => {
          if (result.flag) {
            this.rootMenu = result.data.filter((val) => val._id != this.resource._id);
          }
        })
        .catch(() => {});
    },
    onSubmit() {
      if (this.isRight) {
        return this.$Message.error("信息不完整!");
      }
      this.$request
        .webResourceInsert(this.resource)
        .then((result) => {
          if (result.flag) {
            this.$Message.success("资源已创建!");
            this.resourceInit();
            this.findRootMenu();
          } else {
            this.$Message.error(result.msg);
          }
        })
        .catch(() => this.$Message.error("创建失败!"));
    },
    select() {
      this.loading = 1;
      this.$request
        .webResourceFindById(this.$route.query.id)
        .then((result) => {
          if (result.flag) {
            this.loading = 2;
            this.resource = result.data[0];
          } else {
            this.loading = 3;
          }
        })
        .catch(() => (this.loading = 3));
    },
    remove() {
      this.$request
        .webResourceDeleteById(this.$route.query.id)
        .then((result) => {
          if (result.flag) {
            this.$Message.success("删除成功!");
            this.$router.push("/WebResourceManager");
          } else {
            this.$Message.error(flag.msg);
          }
        })
        .catch(() => this.$Message.error("删除失败!"));
    },
    update() {
      this.$request
        .webResourceUpdateById(this.$route.query.id, this.resource)
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
