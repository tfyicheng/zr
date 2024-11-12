<template class="app-container">
  <div class="main">
    <div class="mainl">
      <div class="container">
        <div class="item">合同编号</div>
        <div class="item">{{ form.contNumber }}</div>
        <div class="item">项目名称</div>
        <div class="item">{{ form.prjName }}</div>
        <div class="item">项目区域</div>
        <div class="item">
          {{ coverRegin(form.areaProvince, form.areaCity, form.areaRegion) }}
        </div>
        <div class="item">项目类型</div>
        <div class="item">
          <dict-tag :options="dict.type.project_type" :value="form.prjType" />
        </div>
        <div class="item">规模</div>
        <div class="item">
          <dict-tag :options="dict.type.project_scale" :value="form.prjScale" />
        </div>
        <div class="item">工程类别</div>
        <div class="item">
          <dict-tag :options="dict.type.engineering_Type" :value="form.engineeringType" />
        </div>
        <div class="item">工程等级</div>
        <div class="item">
          <dict-tag :options="dict.type.engineering_level" :value="form.engineeringLevel" />
        </div>
        <div class="item">工程级别</div>
        <div class="item">
          <dict-tag :options="dict.type.engineering_level0" :value="form.engineeringLevelType" />
        </div>
        <div class="item">客户名称</div>
        <div class="item">{{ form.clientName }}</div>
        <div class="item">联系人</div>
        <div class="item">{{ form.contacts }}</div>
        <div class="item">联系号码</div>
        <div class="item">{{ form.telephone }}</div>
        <div class="item">邮寄地址</div>
        <div class="item">{{ form.mailArea }}</div>
        <div class="item">注册地址</div>
        <div class="item">{{ form.addrArea }}</div>
        <div class="item">开始日期</div>
        <div class="item">{{ form.startDate }}</div>
        <div class="item">交付日期</div>
        <div class="item">{{ form.deliveryDate }}</div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item">项目描述</div>
        <div class="item itemlast">{{ form.prjDesc }}</div>
      </div>
    </div>
    <div class="mainr">
      <div class="mrt">项目阶段计划</div>
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :timestamp="activity.timestamp"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import { projInfo, proPlanList } from '@/api/data/project';
export default {
  name: 'Info', //基本信息
  props: { uid: null },
  dicts: [
    'project_scale',
    'project_type',
    'engineering_level0',
    'project_plan',
    'engineering_level',
    'engineering_Type',
  ],
  data() {
    return {
      form: {},
      activities: [
        // {
        //   content: '支持使用图标',
        //   timestamp: '2018-04-12 20:46',
        //   size: 'large',
        //   type: 'primary',
        //   icon: 'el-icon-more',
        // },
        // {
        //   content: '支持自定义颜色支持自定义颜色支持自定义颜色支持自定义颜色',
        //   timestamp: '2018-04-03 20:46',
        //   color: '#0bbd87',
        // },
        // {
        //   content: '支持自定义尺寸',
        //   timestamp: '2018-04-03 20:46',
        //   size: 'large',
        // },
        // {
        //   content: '默认样式的节点',
        //   timestamp: '2018-04-03 20:46',
        // },
      ],
    };
  },
  created() {},
  methods: {
    //查询
    getList(id) {
      projInfo(id).then((response) => {
        this.form = response.data;
        this.commonFun.ShowAreaVal(this.form, response.data);
        proPlanList(response.data.id).then((response) => {
          this.activities = response.data;
          this.activities = response.data.map((item) => {
            return {
              content: item.planName,
              timestamp: item.startDate + ' ~ ' + item.endDate,
              color: this.coverColor(item.status),
            };
          });
        });
      });
    },

    //区域显示信息处理
    coverRegin(val1, val2, val3) {
      try {
        if (val1 && val2 && val3) {
          return val1 + '/' + val2 + '/' + val3;
        }
        if (val1 && val2) {
          return val1 + '/' + val2;
        }
        if (val1) {
          return val1;
        }
      } catch (error) {
        return val1 + '/' + val2 + '/' + val3;
      }
    },

    //阶段颜色处理
    coverColor(status) {
      switch (status) {
        case 0:
          return '#666666';
        case 1:
          return '#1890ff';
        case 2:
          return '#07c15f';
        case 3:
          return '#fac06a';
        case 4:
          return '#fac06a';
        case 5:
          return 'red';
        default:
          break;
      }
    },
  },
  watch: {
    uid: {
      handler(val) {
        if (val) {
          console.log('参数:' + val);
          this.getList(val);
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  .mainl {
    flex: 1;
    .container {
      display: grid;
      grid-template-rows: repeat(6, auto);
      grid-template-columns: repeat(2, 180px 2fr);

      .item {
        padding: 14px;
        border-width: 1px;
        border-color: #e4e6ed;
        border-style: solid;
        margin-top: -1px;
        margin-right: -1px;
        font-family: Alibaba PuHuiTi 2;
        font-size: 16px;
        font-weight: 500;
        line-height: 22px;
        letter-spacing: 0em;
        text-align: left;
      }
      .itemlast {
        max-height: 500px;
        grid-column: 2 / span 3;
        overflow: auto;
      }
    }
  }
  .mainr {
    width: 250px;
    .mrt {
      margin: 0px 0px 20px 30px;
      font-family: Alibaba PuHuiTi 2;
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
      letter-spacing: 0em;
      text-align: left;
    }
    .mrt::before {
      content: '\00a0 ';
      border-left: 3px solid #4da0ff;
      margin-right: 5px;
    }
    .el-timeline {
      max-height: 320px;
      overflow: auto;
    }
  }
}
</style>
