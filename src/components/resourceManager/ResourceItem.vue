<template>
  <Card class="mb-3">
    <router-link
      :to="`/FireResourceManager?id=${resource._id}`"
      class="h6 font-weight-bold"
    >
      {{ resource.name }}
    </router-link>
    <span v-if="resource.path">[{{ resource.path }}]</span>
    <div>
      <div class="my-1"></div>
      <div class="my-1">授权码: {{ resource.code }}</div>
      <div class="my-1">类型: {{ getKind(resource.kind) }}({{resource.kind}})</div>
    </div>
  </Card>
</template>

<script>
import authorityEnum from "../../script/authorityEnum";
export default {
  props: {
    resource: Object,
  },
  data() {
    return {
      authorityEnum,
    };
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
  },
};
</script>
