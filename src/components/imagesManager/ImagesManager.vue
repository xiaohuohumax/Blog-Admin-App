<template>
<Content>
    <Tabs value="name1" :animated="false">
        <TabPane label="分享图包" icon="md-book" name="name1" class="p-2">
            <ImageWrite />
        </TabPane>
        <TabPane label="图包管理" icon="ios-videocam-outline" name="name2" class="p-2">
            <ImageUpdate />
        </TabPane>
    </Tabs>
</Content>
</template>

<script>
export default {};
</script>

<style>
</style>
