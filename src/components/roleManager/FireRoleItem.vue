<template>
  <div>
    <div class="d-flex">
      <Input
        @keydown.enter.native="selectChange"
        @on-clear="selectChange"
        v-model.trim="selectWorld"
        suffix="ios-search"
        placeholder="搜索"
        style="width: 10rem"
        class="mr-2"
        clearable
      />
      <Button class="mr-2" @click="selectChange">搜索</Button>
      <Page
        :page-size="pageSteep"
        :total="contextSum"
        :current="page"
        @on-change="pageChange"
        show-total
      />
    </div>

    <Null v-show="contexts.length == 0" />

    <div class="role-table d-flex font-weight-bold pb-2">
      <div class="role-table-checkbox">
        <input type="checkbox" v-model="checkAll" />
      </div>
      <div class="role-table-icon">图标</div>
      <div class="role-table-name">名称</div>
      <div class="role-table-code">授权码</div>
      <div class="role-table-kind">类型</div>
      <div class="role-table-path">路径</div>
    </div>

    <div
      class="role-table d-flex py-2 border-top"
      v-for="(item, index) in contexts"
      :key="index"
    >
      <div class="role-table-checkbox">
        <input
          type="checkbox"
          v-model="role.resources"
          name="resources"
          :value="item._id"
        />
      </div>
      <div class="role-table-icon">
        <Icon size="20" :type="item.icon" v-if="item.icon" />
      </div>
      <div class="role-table-name" :title="item.name">{{ item.name }}</div>
      <div class="role-table-code" :title="item.code">{{ item.code }}</div>
      <div class="role-table-kind">{{ getKind(item.kind) }}</div>
      <div class="role-table-path">{{ item.path }}</div>
    </div>
  </div>
</template>

<script>
import authorityEnum from "../../script/authorityEnum";
export default {
  props: {
    role: Object,
  },
  data() {
    return {
      checkAll: false, // 全选
      contextSum: 0, // 总数
      contexts: [], // 记录
      pageSteep: 10, // 每页条数
      selectWorld: "", // 搜索关键词
      page: 1,
      authorityEnum,
    };
  },
  watch: {
    checkAll: "checkAllChange",
    contexts() {
      this.checkAll = this.isAllInRoleResources;
    },
  },

  created() {
    this.selectResourceByPage();
  },
  computed: {
    // 是否全在队列中
    isAllInRoleResources() {
      const resourcesIds = this.contexts.map((val) => val._id);
      for (const item of resourcesIds) {
        if (!this.role.resources.includes(item)) {
          return false;
        }
      }
      return true;
    },
  },
  methods: {
    // 获取类型
    getKind(kind) {
      for (const key in this.authorityEnum) {
        if (kind == this.authorityEnum[key].code) {
          return this.authorityEnum[key].name;
        }
      }
      return "";
    },
    // 全选与全部选切换
    checkAllChange() {
      let checkAll = this.checkAll;
      const resourcesIds = this.contexts.map((val) => val._id);
      // 全选
      if (checkAll) {
        let newResources = this.role.resources.concat(resourcesIds);
        this.role.resources = Array.from(new Set(newResources));
      } else if (this.isAllInRoleResources) {
        // 全不选
        for (const item of resourcesIds) {
          let index = this.role.resources.lastIndexOf(item);
          if (index != -1) {
            this.role.resources.splice(index, 1);
          }
        }
      }
    },
    selectResourceByPage() {
      this.$request
        .authorityFindRresourceByPage(this.page, this.pageSteep, this.selectWorld)
        .then((result) => {
          if (result.flag) {
            this.contexts = result.data.resources;
            this.contextSum = result.data.resourceSum;
          }
        })
        .catch((err) => {});
    },
    pageChange(num) {
      this.page = num;
      this.selectResourceByPage();
    },
    selectChange() {
      this.pageChange(1);
    },
  },
};
</script>

<style lang="less">
.role-table {
  & > * {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .role-table-checkbox {
    width: 5%;
  }
  .role-table-code {
    width: 35%;
  }
  .role-table-kind {
    width: 10%;
  }
  .role-table-path {
    width: 10%;
  }
  .role-table-icon {
    width: 5%;
  }
  .role-table-name {
    width: 35%;
  }
}
</style>
