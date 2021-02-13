<template>
  <div style="margin-top: 0.75rem">
    <div class="mb-2 font-weight-bold d-flex justify-content-between align-items-center">
      <div>
        {{ title }}
        <span class="small text-success font-weight-blod">{{ subtitle }}</span> :
      </div>
      <div><slot name="help"></slot></div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
  },
};
</script>
