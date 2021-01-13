<template>
 <Content>
    <template #head>
        <Button type="success">保存设置</Button>
    </template>
    <div class="py-3">
        <p class=" mr-2">设置用户头像:</p>
        <EnterImage />
    </div>
    <div class="py-3">
        <p class=" mr-2">设置网站横幅:</p>
        <EnterImage />
    </div>
</Content>
</template>

<script>
export default {

}
</script>

<style>

</style>