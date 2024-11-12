<template>
    <el-card class="box-card">
    <div slot="header" class="clearfix">
        <span><span class="clearfix-titie-icon">|</span>项目负责人TOP10</span>
        <el-select v-model="rateFpFrom.timeType" style="float: right; padding: 3px 0;width:25%" >
            <el-option v-for="item in timeTypeArray"
            :label="item.name"
            :key="item.id"
            :value="item.id"
            >
            </el-option>
        </el-select>
    </div>
    <div id="Chart1">

    </div>
    </el-card>
</template>

<script>
import * as echarts from 'echarts';
export default {
    data: function(){
        return {
            timeTypeArray:[
                {id:1,name:"最近一年"},
                {id:2,name:"最近一月"},
                {id:3,name:"最近一周"},
            ],
            rateFpFrom:{
                timeType:1
            }
        }
    },
    created(){
        this.$nextTick(() => {
            this.showEchart();
        })
    },
    methods: {
        showEchart(){
            
            var dom = document.getElementById('Chart1');
            var myChart = echarts.init(dom, null, {
                renderer: 'canvas',
                useDirtyRect: false
            });
            const seriesLabel = {
            show: true
            }
            const data =  ["刘德华","张学友","郭富城","李易峰","吴门达","刘德华","张学友","郭富城","李易峰","吴门达"];
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    type: 'shadow'
                    }
                },
                legend: {
                    data: [ 
                        { name:'负责项目数',itemStyle: {color: '#409EFF'} },
                        { name:'计划超期数',itemStyle: {color: '#FF6161'} }
                    ]
                },
                grid: {
                    left: 100
                },
                toolbox: {
                    show: true,
                    feature: {
                    saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'value',
                    name: '',
                    axisLabel: {
                     formatter: '{value}'
                    },
                    interval: 0,
                },
                yAxis: {
                    type: 'category',
                    inverse: true,
                    axisTick:{
                        show:false
                    },
                    data: data,
                    axisLabel: {
                    margin: 10,
                    interval: 0,
                    rotate: 20,
                    fontSize:14
                    }
                },
                series: [
                    {
                    name: '负责项目数',
                    type: 'bar',
                    data: [165, 170, 30],
                    barWidth:15,
                    label: seriesLabel,
                    itemStyle:{
                        color: '#409EFF',
                    }
                    },
                    {
                    name: '计划超期数',
                    type: 'bar',
                    label: seriesLabel,
                    barWidth:15,
                    data: [150, 105, 110],
                    itemStyle:{
                        color: '#FF6161',
                    }
                    },
                ]
                };
                myChart.setOption(option);
        }
    }
}
</script>

<style scoped>

.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
  .clearfix{
    height: 40px;
    line-height: 40px;
    font-weight: 1000;
    font-size: 20px;
  }
  .clearfix-titie-icon{
    color: #409EFF;
    position: relative;
    font-size: 20px;
    top: -1px;
    margin-right: 10px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }
  #Chart1{
    width: 100%;
    height: 600px;
    overflow-y: auto;
  }
  
</style>