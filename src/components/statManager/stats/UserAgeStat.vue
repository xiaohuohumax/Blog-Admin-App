<template>
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<!-- 删除 -->
<div class="">
    <div v-for="(item, index) in chart" :key="index" :id="item" class="userAgeStat w-100 mb-3 rounded" :style="{ height: '25rem' }"></div>
</div>
</template>

<script>
import chartDatas from "@/script/chartDatas";

import enumData from "@/script/enumData";

let {
    ipcRenderer
} = window.require("electron");

export default {
    data() {
        return {
            chart: [
                "cricle",
                "pieDoughnut",
                "pieRoseType",
                "userAgeChart",
                "scatterSimple",
                "radar",
                "graphCircularLayout"
            ],
        };
    },
    mounted() {
        let chartArray = [];
        this.chart.forEach((val) => {
            chartArray.push(chartDatas[val](document.getElementById(val)));
        });
        ipcRenderer.on(enumData.WindowResize, () => {
            chartArray.forEach((val) => val.resize());
        });
    },
};
</script>

<style>
.userAgeStat {
    overflow: hidden;
}
</style>
