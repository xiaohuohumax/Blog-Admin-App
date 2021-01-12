<template>
<Content>
    <template #head>
        <Button type="success">保存设置</Button>
    </template>

    <div class="py-3">
        <p class=" mr-2">设置字体:</p>
        <div class="">
            <Input placeholder="标签" class="w-50" v-model.trim="fontStyle" />
        </div>
    </div>
    <div class="py-3">
        <p class="mr-2">设置主题:</p>
        <RadioGroup v-model="themeStyle">
            <Radio label="light"> 明亮 </Radio>
            <Radio label="gray"> 深灰 </Radio>
            <Radio label="dark"> 暗黑 </Radio>
        </RadioGroup>
    </div>
</Content>
</template>

<script>
export default {
    data() {
        return {
            fontStyle: "微软雅黑",
            themeStyle: "light",
        };
    },
};
</script>

<style>
</style>
