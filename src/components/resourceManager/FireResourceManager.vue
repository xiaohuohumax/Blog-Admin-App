<template>
  <Content :loading="loading">
    <template #head>
      <Button class="mr-2" to="/ResourceManager">返回列表</Button>

      <Button type="success" @click="onSubmit" v-if="kind">创建</Button>

      <Button class="mr-2" type="success" @click="update" v-if="!kind">更新</Button>
      <Button type="error" ghost @click="remove" v-if="!kind">删除</Button>
    </template>
    <div>
      <div class="mb-2">资源名称:</div>
      <Input v-model.trim="resource.name" />
    </div>
    <div class="pt-3">
      <div class="mb-2">资源授权码:</div>
      <Input v-model.trim="resource.code" />
    </div>

    <div class="pt-3">
      <div class="mb-2">路径:</div>
      <Input v-model.trim="resource.path" />
    </div>
    <div class="pt-3">
      <div class="mb-2">资源类型:</div>
      <Select v-model="resource.kind">
        <Option v-for="(item, index) in kindArray" :key="index" :value="item.code">
          {{ item.name }}
        </Option>
      </Select>
    </div>
    <div class="pt-3">
      <div class="mb-2">菜单父节点:</div>
      <Select v-model="resource.parentId">
        <Option value="-1">根目录</Option>
        <Option v-for="(item, index) in rootMenu" :key="index" :value="item._id">
          {{ item.name }}| {{ item.code }}
        </Option>
      </Select>
    </div>

    <div class="pt-3">
      <div class="mb-2">图标:</div>
      <Input :prefix="resource.icon" v-model.trim="resource.icon" />
    </div>

    <div class="pt-3">
      <div class="mb-2">
        菜单顺序 <span class="small text-success">数值越小菜单越靠前</span>:
      </div>
      <Input v-model.trim="resource.index" />
    </div>
  </Content>
</template>

<script>
import { mapState } from "vuex";
import authorityEnum from "../../script/authorityEnum";
export default {
  data() {
    return {
      resource: {},
      authorityEnum,

      kind: true, // true 发表文章 false 修改文章
      loading: 0,
      rootMenu: [],
    };
  },

  created() {
    this.resourceInit();
    this.kind = this.$route.query.id == "" || this.$route.query.id == undefined;
    !this.kind ? this.select() : "";
    this.findRootMenu();
  },
  computed: {
    ...mapState(["userInf"]),
    isRight() {
      return this.resource.name == "" || this.resource.code == "";
    },
    isRoot() {
      return this.resource.parentId == "-1";
    },
    isMenu() {
      return this.resource.kind == this.authorityEnum.menu.code;
    },
    kindArray() {
      let arr = [];
      for (const key in this.authorityEnum) {
        arr.push({
          kind: key,
          ...this.authorityEnum[key],
        });
      }
      return arr;
    },
  },
  methods: {
    resourceInit() {
      this.resource = {
        parentId: "-1",
        index: "",
        name: "",
        code: "",
        icon: "",
        path: "",
        kind: authorityEnum.other.code,
      };
    },
    findRootMenu() {
      this.$request
        .authorityFindRootMenu()
        .then((result) => {
          if (result.flag) {
            this.rootMenu = result.data.filter((val) => val._id != this.resource._id);
          }
        })
        .catch((err) => {});
    },
    onSubmit() {
      if (this.isRight) {
        return this.$Message.error("信息不完整!");
      }
      this.$request
        .authorityResourceInsert(this.resource)
        .then((result) => {
          if (result.flag) {
            this.$Message.success("资源已创建!");
            this.resourceInit();
            this.findRootMenu();
          } else {
            this.$Message.error(result.msg);
          }
        })
        .catch((err) => this.$Message.error(error));
    },
    select() {
      this.loading = 1;
      this.$request
        .authorityFindRresourceById(this.$route.query.id)
        .then((result) => {
          if (result.flag) {
            this.loading = 2;
            this.resource = result.data[0];
          } else {
            this.loading = 3;
          }
        })
        .catch((err) => (this.loading = 3));
    },
    remove() {
      this.$request
        .authorityResourceDeleteById(this.$route.query.id)
        .then((result) => {
          if (result.flag) {
            this.$Message.success("删除成功!");
            this.$router.push("/ResourceManager");
          } else {
            this.$Message.error(flag.msg);
          }
        })
        .catch((err) => this.$Message.error("删除失败!"));
    },
    update() {
      this.$request
        .authorityResourceUpdateById(this.$route.query.id, this.resource)
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
