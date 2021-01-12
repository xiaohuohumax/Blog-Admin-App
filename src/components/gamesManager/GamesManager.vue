<template>
<Content>
    <Tabs value="game1" :animated="false" name="tab-gmanger">
        <TabPane label="游戏上传" name="game1" tab="tab-gmanger" icon="md-book" class="p-2">
            <GameUpload />
        </TabPane>
        <TabPane label="游戏管理" name="game2" tab="tab-gmanger" icon="ios-videocam-outline" class="p-2">
            <GameUpdate />
        </TabPane>
    </Tabs>
</Content>
</template>

<script>
export default {};
</script>

<style>
</style>
