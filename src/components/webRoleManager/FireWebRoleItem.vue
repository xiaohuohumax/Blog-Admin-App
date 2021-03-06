<template>
  <div>
    <div class="fire-role-item d-flex align-items-center mb-2">
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
      <Checkbox class="mb-0" v-model="selectYourself">只搜索已选资源</Checkbox>
    </div>

    <Page
      :page-size="pageSteep"
      :total="contextSum"
      :current="page"
      @on-change="pageChange"
      show-total
    />

    <div class="role-table d-flex font-weight-bold pb-2">
      <div class="role-table-checkbox">
        <input type="checkbox" v-model="checkAll" />
      </div>
      <div class="role-table-icon">图标</div>
      <div class="role-table-name">名称</div>
      <div class="role-table-code">授权码</div>
      <div class="role-table-kind">类型</div>
      <div class="role-table-index">菜单顺序</div>
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
      <div class="role-table-name" :title="item.name">
        <router-link :to="`FireWebResourceManager?id=${item._id}`">
          {{ item.name }}
        </router-link>
      </div>
      <div class="role-table-code" :title="item.code">{{ item.code }}</div>
      <div class="role-table-kind" :title="item.kind">{{ getKind(item.kind) }}({{item.kind}})</div>
      <div class="role-table-index">{{ item.index }}</div>
      <div class="role-table-path" :title="item.path">{{ item.path }}</div>
    </div>

    <Null v-show="contexts.length == 0" />
  </div>
</template>

<script>
import authorityWebEnum from "../../script/authorityWebEnum";
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
      authorityWebEnum,

      selectYourself: false, // 只查看自己的资源
    };
  },
  watch: {
    checkAll: "checkAllChange",
    selectYourself: "selectChange",
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
      for (const key in this.authorityWebEnum) {
        if (kind == this.authorityWebEnum[key].code) {
          return this.authorityWebEnum[key].name;
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
        .webResourceFindByPage(this.page, this.pageSteep, this.selectWorld)
        .then((result) => {
          if (result.flag) {
            this.contexts = result.data.resources;
            this.contextSum = result.data.resourceSum;
          }
        })
        .catch(() => {});
    },
    selectResourceByPageAndIds() {
      this.$request
        .webResourceFindByPageAndIds(
          this.page,
          this.pageSteep,
          this.selectWorld,
          this.role.resources
        )
        .then((result) => {
          if (result.flag) {
            this.contexts = result.data.resources;
            this.contextSum = result.data.resourceSum;
          }
        })
        .catch(() => {});
    },
    pageChange(num) {
      this.page = num;
      this.selectYourself
        ? this.selectResourceByPageAndIds()
        : this.selectResourceByPage();
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
    width: 25%;
  }
  .role-table-kind {
    width: 10%;
  }
  .role-table-index {
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
