<template>
  <Card class="mb-3">
    <router-link
      :to="`/FireWebResourceManager?id=${resource._id}`"
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
import authorityWebEnum from "../../script/authorityWebEnum";
export default {
  props: {
    resource: Object,
  },
  data() {
    return {
      authorityWebEnum,
    };
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
  },
};
</script>
