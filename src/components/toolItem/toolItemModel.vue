<template>
  <Poptip trigger="hover" placement="left-end">
    <Button class="mt-1" :icon="icon" shape="circle"></Button>
    <div style="overflow-y:auto" slot="content" ref="toolItemModelBody"><slot></slot></div>
  </Poptip>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "",
    },
  },
  mounted() {
    this.scrollEndListener();
  },
  methods: {
    scrollEndListener() {
      let toolItemModelBody = this.$refs.toolItemModelBody;
      toolItemModelBody.addEventListener("scroll", () => {
        let height = toolItemModelBody.offsetHeight;
        let scrollTop = toolItemModelBody.scrollTop;
        let scrollHeight = toolItemModelBody.scrollHeight;
        if (height + scrollTop >= scrollHeight) {
          this.$emit("scrollend");
        }
      });
    },
  },
};
</script>

<style></style>
