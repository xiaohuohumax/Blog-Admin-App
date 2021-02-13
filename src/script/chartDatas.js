import echarts from 'echarts'

// 新建图表 对外函数名 图表配置函数 ()=>{ return option; }
function createChart(element, option) {
    let myChart = echarts.init(element); // 创建echart对象
    myChart.setOption(option); // 设置配置
    return myChart; // 返回对象
}

export default createChart