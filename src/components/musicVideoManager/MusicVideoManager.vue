<template>
<Content>
    <Tabs value="name1" :animated="false">
        <TabPane label="分享视频音乐" icon="md-book" name="name1" class="p-2">
            <MusicVideoWrite />
        </TabPane>
        <TabPane label="音视频管理" icon="ios-videocam-outline" name="name2" class="p-2">
            <MusicVideoUpdate />
        </TabPane>
    </Tabs>
</Content>
</template>

<script>
export default {};
</script>

<style>
</style>
