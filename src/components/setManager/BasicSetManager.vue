<template>
  <Content :loading="loading">
    <template #head>
      <Button
        v-show="$authres(['view_basesetmanager_savebutton'])"
        type="success"
        @click="updated"
      >
        保存设置
      </Button>
    </template>
    <FormItemBlock class="mt-0" title="博客名称" subtitle="页眉显示文字">
      <Input placeholder="标签" v-model.trim="content.webName" />
    </FormItemBlock>

    <FormItemBlock title="设置网站说明">
      <Input placeholder="标签" v-model.trim="content.webDescription" />
    </FormItemBlock>

    <FormItemBlock title="设置关键字">
      <EnterTags v-model="content.webKeyWords" :tagmax="tagsMax" />
    </FormItemBlock>

    <FormItemBlock title="网站状态" subtitle="维修时需选择维修时间">
      <i-switch v-model="content.webState" size="large">
        <span slot="open">开启</span>
        <span slot="close">维修</span>
      </i-switch>
      <DatePicker
        class="d-block mt-3"
        v-if="!content.webState"
        type="datetime"
        :options="opentimeOptions"
        placeholder="选择时间"
        v-model="content.opentime"
      ></DatePicker>
    </FormItemBlock>

    <FormItemBlock title="游客默认角色" subtitle="可多选">
      <CheckboxGroup v-model="content.touristDefRoles">
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

    <FormItemBlock title="版权信息">
      <Input placeholder="标签" v-model.trim="content.copyRight" />
    </FormItemBlock>
  </Content>
</template>

<script>
export default {
  data() {
    return {
      loading: 1,
      tagsMax: 10,
      content: {},
      allRoles: [],

      opentimeOptions: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now();
        },
      },
    };
  },
  mounted() {
    this.select();
    this.selectAllWebRoles();
  },
  computed: {
    isRight() {
      return (
        this.content.webName == "" ||
        this.content.copyRight == "" ||
        this.content.webDescription == "" ||
        this.content.webKeyWords.length == 0 ||
        (!this.content.webState && this.content.opentime == "")
      );
    },
  },
  methods: {
    select() {
      this.loading = 1;
      this.$request
        .webSetFindOnly()
        .then((result) => {
          if (result.flag) {
            this.loading = 2;
            this.content = result.data;
          } else {
            this.loading = 3;
          }
        })
        .catch(() => (this.loading = 3));
    },
    updated() {
      if (this.isRight) {
        return this.$Message.error("信息不完整!");
      }
      this.$request
        .webSetUpdate(this.content)
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
