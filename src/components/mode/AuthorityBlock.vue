<template>
  <div v-if="isShow">
    <slot></slot>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
    ...mapState({
      storeRoles: "roles",
      storeResources: "resources",
    }),
    isShow() {
      if (this.roles.length == 0 && this.resources.length == 0) {
        return false;
      }
      const resCodes = this.storeResources.map((val) => val.code);
      const rolCodes = this.storeRoles.map((val) => val.code);

      for (const item of this.roles) {
        if (rolCodes.includes(item)) {
          return true;
        }
      }
      for (const item of this.resources) {
        if (resCodes.includes(item)) {
          return true;
        }
      }
      return false;
    },
  },
};
</script>

<style></style>
