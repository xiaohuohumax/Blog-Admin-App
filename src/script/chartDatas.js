import echarts from 'echarts'

// 新建图表 对外函数名 图表配置函数 ()=>{ return option; }
function createChart(element, option) {
    let myChart = echarts.init(element); // 创建echart对象
    myChart.setOption(option); // 设置配置
    return myChart; // 返回对象
}

// // 调用 Chart.userAgeChart(elementObject)
// createChart('userAgeChart', () => ({
//     title: {
//         text: 'ECharts 入门示例'
//     },
//     tooltip: {},
//     legend: {
//         data: ['销量']
//     },
//     xAxis: {
//         data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
//     },
//     yAxis: {},
//     series: [{
//         name: '销量',
//         type: 'bar',
//         data: [5, 20, 36, 10, 10, 20]
//     }]
// }))

// createChart('cricle', () => ({
//     backgroundColor: '#2c343c',
//     title: {
//         text: 'Customized Pie',
//         left: 'center',
//         top: 20,
//         textStyle: {
//             color: '#ccc'
//         }
//     },
//     tooltip: {
//         trigger: 'item',
//         formatter: '{a} <br/>{b} : {c} ({d}%)'
//     },
//     visualMap: {
//         show: false,
//         min: 80,
//         max: 600,
//         inRange: {
//             colorLightness: [0, 1]
//         }
//     },
//     series: [{
//         name: '访问来源',
//         type: 'pie',
//         radius: '55%',
//         center: ['50%', '50%'],
//         data: [{
//                 value: 335,
//                 name: '直接访问'
//             },
//             {
//                 value: 310,
//                 name: '邮件营销'
//             },
//             {
//                 value: 274,
//                 name: '联盟广告'
//             },
//             {
//                 value: 235,
//                 name: '视频广告'
//             },
//             {
//                 value: 400,
//                 name: '搜索引擎'
//             }
//         ].sort(function (a, b) {
//             return a.value - b.value;
//         }),
//         roseType: 'radius',
//         label: {
//             color: 'rgba(255, 255, 255, 0.3)'
//         },
//         labelLine: {
//             lineStyle: {
//                 color: 'rgba(255, 255, 255, 0.3)'
//             },
//             smooth: 0.2,
//             length: 10,
//             length2: 20
//         },
//         itemStyle: {
//             color: '#c23531',
//             shadowBlur: 200,
//             shadowColor: 'rgba(0, 0, 0, 0.5)'
//         },

//         animationType: 'scale',
//         animationEasing: 'elasticOut',
//         animationDelay: function (idx) {
//             return Math.random() * 200;
//         }
//     }]
// }))

// createChart('pieDoughnut', () => ({
//     tooltip: {
//         trigger: 'item',
//         formatter: '{a} <br/>{b}: {c} ({d}%)'
//     },
//     legend: {
//         orient: 'vertical',
//         left: 10,
//         data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
//     },
//     series: [{
//         name: '访问来源',
//         type: 'pie',
//         radius: ['50%', '70%'],
//         avoidLabelOverlap: false,
//         label: {
//             show: false,
//             position: 'center'
//         },
//         emphasis: {
//             label: {
//                 show: true,
//                 fontSize: '30',
//                 fontWeight: 'bold'
//             }
//         },
//         labelLine: {
//             show: false
//         },
//         data: [{
//                 value: 335,
//                 name: '直接访问'
//             },
//             {
//                 value: 310,
//                 name: '邮件营销'
//             },
//             {
//                 value: 234,
//                 name: '联盟广告'
//             },
//             {
//                 value: 135,
//                 name: '视频广告'
//             },
//             {
//                 value: 1548,
//                 name: '搜索引擎'
//             }
//         ]
//     }]
// }))

// createChart('pieRoseType', () => ({
//     title: {
//         text: '南丁格尔玫瑰图',
//         subtext: '纯属虚构',
//         left: 'center'
//     },
//     tooltip: {
//         trigger: 'item',
//         formatter: '{a} <br/>{b} : {c} ({d}%)'
//     },
//     legend: {
//         left: 'center',
//         top: 'bottom',
//         data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
//     },
//     toolbox: {
//         show: true,
//         feature: {
//             mark: {
//                 show: true
//             },
//             dataView: {
//                 show: true,
//                 readOnly: false
//             },
//             magicType: {
//                 show: true,
//                 type: ['pie', 'funnel']
//             },
//             restore: {
//                 show: true
//             },
//             saveAsImage: {
//                 show: true
//             }
//         }
//     },
//     series: [{
//             name: '半径模式',
//             type: 'pie',
//             radius: [20, 110],
//             center: ['25%', '50%'],
//             roseType: 'radius',
//             label: {
//                 show: false
//             },
//             emphasis: {
//                 label: {
//                     show: true
//                 }
//             },
//             data: [{
//                     value: 10,
//                     name: 'rose1'
//                 },
//                 {
//                     value: 5,
//                     name: 'rose2'
//                 },
//                 {
//                     value: 15,
//                     name: 'rose3'
//                 },
//                 {
//                     value: 25,
//                     name: 'rose4'
//                 },
//                 {
//                     value: 20,
//                     name: 'rose5'
//                 },
//                 {
//                     value: 35,
//                     name: 'rose6'
//                 },
//                 {
//                     value: 30,
//                     name: 'rose7'
//                 },
//                 {
//                     value: 40,
//                     name: 'rose8'
//                 }
//             ]
//         },
//         {
//             name: '面积模式',
//             type: 'pie',
//             radius: [30, 110],
//             center: ['75%', '50%'],
//             roseType: 'area',
//             data: [{
//                     value: 10,
//                     name: 'rose1'
//                 },
//                 {
//                     value: 5,
//                     name: 'rose2'
//                 },
//                 {
//                     value: 15,
//                     name: 'rose3'
//                 },
//                 {
//                     value: 25,
//                     name: 'rose4'
//                 },
//                 {
//                     value: 20,
//                     name: 'rose5'
//                 },
//                 {
//                     value: 35,
//                     name: 'rose6'
//                 },
//                 {
//                     value: 30,
//                     name: 'rose7'
//                 },
//                 {
//                     value: 40,
//                     name: 'rose8'
//                 }
//             ]
//         }
//     ]
// }));

// createChart('scatterSimple', () => ({
//     xAxis: {},
//     yAxis: {},
//     series: [{
//         symbolSize: 20,
//         data: [
//             [10.0, 8.04],
//             [8.0, 6.95],
//             [13.0, 7.58],
//             [9.0, 8.81],
//             [11.0, 8.33],
//             [14.0, 9.96],
//             [6.0, 7.24],
//             [4.0, 4.26],
//             [12.0, 10.84],
//             [7.0, 4.82],
//             [5.0, 5.68]
//         ],
//         type: 'scatter'
//     }]
// }))

// createChart('radar', () => ({
//     title: {
//         text: '基础雷达图'
//     },
//     tooltip: {},
//     legend: {
//         data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
//     },
//     radar: {
//         // shape: 'circle',
//         name: {
//             textStyle: {
//                 color: '#fff',
//                 backgroundColor: '#999',
//                 borderRadius: 3,
//                 padding: [3, 5]
//             }
//         },
//         indicator: [{
//                 name: '销售（sales）',
//                 max: 6500
//             },
//             {
//                 name: '管理（Administration）',
//                 max: 16000
//             },
//             {
//                 name: '信息技术（Information Techology）',
//                 max: 30000
//             },
//             {
//                 name: '客服（Customer Support）',
//                 max: 38000
//             },
//             {
//                 name: '研发（Development）',
//                 max: 52000
//             },
//             {
//                 name: '市场（Marketing）',
//                 max: 25000
//             }
//         ]
//     },
//     series: [{
//         name: '预算 vs 开销（Budget vs spending）',
//         type: 'radar',
//         // areaStyle: {normal: {}},
//         data: [{
//                 value: [4300, 10000, 28000, 35000, 50000, 19000],
//                 name: '预算分配（Allocated Budget）'
//             },
//             {
//                 value: [5000, 14000, 28000, 31000, 42000, 21000],
//                 name: '实际开销（Actual Spending）'
//             }
//         ]
//     }]
// }))

// createChart('graphCircularLayout', () => ({}))
// createChart('', () => ({}))
export default createChart