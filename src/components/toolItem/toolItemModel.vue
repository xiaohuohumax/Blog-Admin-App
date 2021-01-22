<template>
  <Poptip trigger="click" placement="left-end">
    <Button class="mt-1" :icon="icon" shape="circle" size="large"></Button>
    <slot slot="content"></slot>
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
};
</script>

<style></style>
