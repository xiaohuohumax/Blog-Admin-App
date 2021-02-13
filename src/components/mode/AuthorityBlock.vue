<template>
  <div class="d-inline-block" v-if="isShow">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    roles: {
      type: Array,
      default: () => [],
    },
    resources: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    isShow() {
      return this.$author(this.roles, this.resources);
    },
  },
};
</script>
