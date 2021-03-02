<template>
  <Content :loading="loading">
    <template #head>
      <Button
        v-show="$authres(['view_webusermore_backlist'])"
        class="mr-2"
        to="/WebUserManager"
      >
        返回列表
      </Button>
      <Button
        v-show="$authres(['view_webusermore_modifybutton'])"
        type="success"
        ghost
        class="mr-2"
        @click="update"
      >
        更新
      </Button>
      <Button
        v-show="$authres(['view_webusermore_deletebutton'])"
        type="error"
        ghost
        class="mr-2"
        @click="remove"
      >
        删除
      </Button>
    </template>
    <div class="d-flex">
      <img
        :src="content.icon"
        class="card-icon rounded-circle mr-2 shadow-sm flex-shrink-0"
      />
      <div class="flex-grow-1 h6 font-weight-bold">
        {{ content.name }}
        <span class="ml-2 small font-weight-bold">
          {{ content.genger }}
        </span>
        <div class="small my-1">{{ content.signature }}</div>
      </div>
    </div>

    <FormItemBlock title="等级">
      <RadioGroup v-model="content.level">
        <Radio :label="item" v-for="(item, index) in level" :key="index"></Radio>
      </RadioGroup>
    </FormItemBlock>

    <FormItemBlock title="角色" subtitle="可多选">
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

    <FormItemBlock title="登录IP">
      {{ content.loginIp }}
    </FormItemBlock>

    <FormItemBlock title="登录时间">
      <Time :time="content.loginTime" type="datetime" />
    </FormItemBlock>

    <FormItemBlock title="允许登录">
      <i-switch v-model="content.allowLogin" size="small" />
    </FormItemBlock>
    <FormItemBlock title="允许评论">
      <i-switch v-model="content.allowTalk" size="small" />
    </FormItemBlock>
  </Content>
</template>

<script>
export default {
  data() {
    return {
      loading: 1,
      content: {},
      allRoles: [],
    };
  },
  mounted() {
    this.select();
    this.selectAllWebRoles();
  },
  computed: {
    level() {
      let levelNumber = [];
      for (let x = 0; x < 7; x++) {
        levelNumber.push(x);
      }
      return levelNumber;
    },
  },
  methods: {
    select() {
      this.loading = 1;
      this.$request
        .webUserFindbyid(this.$route.params.id)
        .then((result) => {
          if (result.flag) {
            this.loading = 2;
            this.content = result.data[0];
          } else {
            this.loading = 3;
          }
        })
        .catch(() => (this.loading = 3));
    },
    remove() {
      this.$request
        .webUserDeleteById(this.$route.params.id)
        .then((result) => {
          if (result.flag) {
            this.$Message.success("删除成功!");
            this.$router.push("/WebUserManager");
          } else {
            this.$Message.error(flag.msg);
          }
        })
        .catch(() => this.$Message.error("删除失败!"));
    },
    update() {
      this.$request
        .WebUserUpdateById(this.$route.params.id, this.content)
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
    // 查询全部角色
    selectAllWebRoles() {
      this.$request
        .webRoleFindAll()
        .then((result) => {
          if (result.flag) {
            this.allRoles = result.data;
          }
        })
        .catch(() => {});
    },
  },
};
</script>
