<template>
<Content>
    <template #head>
        <Button type="success">保存设置</Button>
    </template>
    <div class="py-3">
        <p class=" mr-2">博客名称:</p>
        <Input placeholder="标签" class="w-50" v-model.trim="bokeName" />
    </div>
    <div class="py-3">
        <p class=" mr-2">设置网站说明:</p>
        <Input placeholder="标签" class="w-50" v-model.trim="bokeExplain" />
    </div>
    <div class="py-3">
        <p class=" mr-2">网站状态:</p>
        <Select class="w-50" v-model="bokeNow">
            <Option v-for="(item, index) in bokeNowList" :value="item.val" :key="index">{{ item.label }}</Option>
        </Select>
    </div>
    <div class="py-3">
        <p class=" mr-2">设置关键字:</p>
        <EnterTags />
    </div>
</Content>
</template>

<script>
export default {
    data() {
        return {
            bokeName: "xiaohuohu",
            bokeKeywords: [],
            bokeExplain: "个人博客",
            bokeNow: "open",
            bokeNowList: [{
                    label: "开放",
                    val: "open",
                },
                {
                    label: "关闭",
                    val: "close",
                },
                {
                    label: "维修",
                    val: "service",
                },
            ],
        };
    },
};
</script>

<style>
</style>
