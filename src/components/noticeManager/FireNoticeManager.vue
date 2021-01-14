<template>
  <TimelineItem :color="color">
    <Card>
      <Input  type="textarea" v-model.trim="notice" placeholder="请输入公告" clearable />
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center mt-2">
          <RadioGroup v-model="color">
            <Radio
              :label="item.color"
              v-for="(item, index) in defineColor"
              :key="index"
              :style="`color:${item.color}`"
            >
              {{ item.name }}
            </Radio>
          </RadioGroup>
          <ColorPicker class="ml-2" v-model="color" alpha />
        </div>
        <Button type="primary" ghost>发送</Button>
      </div>
    </Card>
  </TimelineItem>
</template>

<script>
export default {
  data() {
    return {
      notice: "",
      defineColor: [
        { color: "#6B9AC4", name: "一般" },
        { color: "#FCD0A1", name: "警告" },
        { color: "#40F99B", name: "成功" },
        { color: "#DE3C4B", name: "失败" },
      ],
      color: "#6B9AC4",
    };
  },
};
</script>

<style>
.card-icon {
  width: 4.5rem;
  height: 4.5rem;
}
.ivu-radio-group-item {
  margin-bottom: 0 !important;
}
</style>
