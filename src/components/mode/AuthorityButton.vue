<template>
  <Button v-bind="$attrs" v-on="$listeners" v-if="isShow">
    <slot></slot>
  </Button>
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
