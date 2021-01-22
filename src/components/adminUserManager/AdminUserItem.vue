<template>
  <Card class="mb-3">
    <div class="d-flex">
      <div
        class="card-icon rounded-circle mr-2 shadow-sm flex-shrink-0"
        :style="cardIconStyle"
      ></div>
      <div class="flex-grow-1">
        <div>
          <router-link :to="`/AdminUserMore/${user._id}`" class="h6 font-weight-bold">
            {{ user.name }}
          </router-link>
          <span class="ml-2 small font-weight-bold">
            lv{{ user.level }} {{ user.genger }}
          </span>
        </div>
        <div class="small my-1">{{ user.signature }}</div>
        <div class="small mt-2">
          <Row>
            <Col class="mb-1" :xs="{ span: 12 }" :lg="{ span: 6 }"
              >登录IP:{{ user.loginIp }}</Col
            >
            <Col class="mb-1" :xs="{ span: 12 }" :lg="{ span: 6 }">
              登录时间:<Time :time="user.loginTime" type="datetime" />
            </Col>
            <Col class="mb-1" :xs="{ span: 12 }" :lg="{ span: 6 }">
              允许登录: <i-switch :value="user.allowLogin" disabled size="small" />
            </Col>
            <Col class="mb-1" :xs="{ span: 12 }" :lg="{ span: 6 }">
              允许评论: <i-switch :value="user.allowTalk" disabled size="small"
            /></Col>
          </Row>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
export default {
  props: {
    user: Object,
  },
  computed: {
    cardIconStyle() {
      return `backgrond:url('${this.user.icon}') center / cover;`;
    },
  },
};
</script>

<style>
.card-icon {
  width: 4.5rem;
  height: 4.5rem;
}
</style>
