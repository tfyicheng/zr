<template class="app-container">
  <div class="body">
    <div id="liquidFill"></div>
    <div class="data">
        <div class="datal">
            <div>合同金额（元）</div>
            <div>{{this.commonFun.amountConversion2(val1)}}</div>
        </div>
        <div class="datar">
            <div>已回款金额（元）</div>
            <div>{{this.commonFun.amountConversion2(val2)}}</div>
        </div>
    </div>
  </div>
</template>

<script>
import echartsLiquidfill from 'echarts-liquidfill';
export default {
  name: 'LiquidFill', //水球图
  props: ["counter","val1","val2","counter"],
  data() {
    return {
    };
  },
  created() {},
  methods: {
    liquidFill() {
      //方法
      var liquid = this.$echarts.init(document.getElementById('liquidFill'));
      liquid.setOption({
        title: {
          //标题
          text: '',
          textStyle: {
            //标题的样式
            color: '#fff', //字体颜色
            fontFamily: 'Microsoft YaHei', //字体
            align: 'center', //文字的水平方式
            verticalAlign: 'middle', //文字的垂直方式
          },
          left: 'center', //定位
          //backgroundColor: '#03dbdb', //文字区域的背景颜色
        },

        series: [
          {
            type: 'liquidFill',
            radius: '70%',
            shape: 'circle', //rect|roundRect|pin|diamond|circle
            data: [
              {
                value: this.counter,
                direction: 'right', //波浪方向
                itemStyle: {
                  normal: {
                    //这里就是根据不同的值显示不同球体的颜色。下面用箭头函数不能成功 else if(this.counter<0.7){'rgba(250, 173, 20, 1)'}
                    color: eval(
                      "if(this.counter<0.3){'rgb(254,85,85)'}else{'rgba(73,208,136, 1)'}",
                    ),
                  },
                },
              },
            ],
            outline: {
              show: true, //是否显示轮廓 布尔值
              borderDistance: 9, //外部轮廓与图表的距离 数字
              itemStyle: {
                borderColor: '#E4E6ED', //边框的颜色
                borderWidth: 3, //边框的宽度
                shadowBlur: 0, //外部轮廓的阴影范围 一旦设置了内外都有阴影
                //shadowColor: '#000' //外部轮廓的阴影颜色
              },
            },
            // 内图 背景色 边
            backgroundStyle: {
              color: '#fff', //图表的背景颜色rgba(255,0,0,0.1)
              borderWidth: '0', //图表的边框宽度
              borderColor: '#E4E6ED', //图表的边框颜色
            },
            itemStyle: {
                        opacity:1,//波浪的透明度
                        shadowBlur: 0,//波浪的阴影范围
                        shadowColor:''//阴影颜色
                    },
            amplitude:3,   //振幅 是波浪的震荡幅度 可以取具体的值 也可以是百分比 百分比下是按图标的直径来算
            waveLength:'100%',//波的长度 可以是百分比也可以是具体的像素值  百分比下是相对于直径的 取得越大波浪的起伏越小
            waveAnimation: false, //控制波动画的开关  值是布尔值 false 是关闭动画 true 是开启动画 也是默认值
            center: ['50%','60%'],//图表相对于盒子的位置 第一个是水平的位置 第二个是垂直的值 默认是[50%,50%]是在水平和垂直方向居中 可以设置百分比 也可以设置具体值
            //表内百分比展示
            label: {
              // 数据展示样式
              show: true,
              color: '#000',
              insideColor: '#000',
              fontSize: 32,
              fontWeight: '',
              align: 'center',
              baseline: 'middle',
            },
          },
        ],
        //backgroundColor: 'rgba(255,0,0,0.1)'//容器背景颜色
      });
    },
  },
  mounted() {
    this.liquidFill(),
    window.addEventListener('resize', () => {
        this.$echarts.init(document.getElementById('liquidFill')).resize();
      });
  },
  beforeDestroy() {
    window.removeEventListener('resize', () => {
      this.$echarts.init(document.getElementById('liquidFill')).resize();
    });
  },
};
</script>
<style lang="scss" scoped>
.body{
    text-align:center;
}
#liquidFill {
 // width: 300px;
  height: 300px;
}
.data{

    margin-top: 20px;
    display: inline-block;
    .datal{
        //margin: 10px;
        padding-right: 20px;
        float: left;
        border-right: 1px solid #E4E6ED;
        div {
            font-family: Alibaba PuHuiTi 2.0;
            font-size: 16px;
            font-weight: 400;
            line-height: 22px;
            letter-spacing: 0em;
            text-align: center;
        }
        div:last-child {
            font-family: Alibaba PuHuiTi 2.0;
            font-size: 24px;
            font-weight: 700;
            line-height: 34px;
            letter-spacing: 0em;
            text-align: center;
            color: #409EFF;
        }
    }
    .datar{
        padding-left: 20px;
        float: right;
        div {
            font-family: Alibaba PuHuiTi 2.0;
            font-size: 16px;
            font-weight: 400;
            line-height: 22px;
            letter-spacing: 0em;
            text-align: center;
        }
        div:last-child {
            font-family: Alibaba PuHuiTi 2.0;
            font-size: 24px;
            font-weight: 700;
            line-height: 34px;
            letter-spacing: 0em;
            text-align: center;
            color: #409EFF;
        }
    }
}
</style>
