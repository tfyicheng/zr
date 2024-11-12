<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['车辆管理', '用车申请管理', '用车申请列表', '用车申请详情']" />
        <div class="main">
          <div class="p0">
            <el-form :model="form" :inline="true" class="info">
              <el-form-item label="用 车 部 门">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.useDept"></InputTip>
                </div>
              </el-form-item>
              <el-form-item label="出 行 人 员" prop="contName">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.applyUser"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="车 辆 号 码">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.carNumber"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="用 车 项 目">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.projectName"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="目 的 地">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.destination"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="出 车 时 间">
                <div class="info">
                  <!-- <span>{{ commonFun.coverTime(form.contStartDate) }}</span> -->
                  <span>{{ form.useTime }}</span>
                </div>
              </el-form-item>

              <el-form-item label="用 车 事 由" class="remark">
                <div class="info">
                  <el-input
                    type="textarea"
                    autosize
                    resize="none"
                    readonly
                    v-model="form.useRemark"
                  ></el-input>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div class="main2">
          <div class="m2top">用车结束</div>
          <div class="m2main">
            <div class="p0">
              <el-form :model="form" :inline="true" class="info">
                <el-form-item label="用 车 公 里 数">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="form.mileage"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item label="车辆回收时间" prop="creditCode">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="form.recoveryTime"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item label="回 收 备 注" prop="contacts">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="form.recoveryRemark"></InputTip>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>

        <div class="main2" v-if="flase">
          <div class="m2top">
            用车报告
            <div class="m2topm">
              <span
                v-show="paymentShow"
                @click="paymentShow ? (paymentShow = false) : (paymentShow = true)"
                >收起 <i class="el-icon-caret-top"></i>
              </span>
              <span
                v-show="!paymentShow"
                @click="paymentShow ? (paymentShow = false) : (paymentShow = true)"
                >展开 <i class="el-icon-caret-bottom"></i>
              </span>
            </div>
          </div>

          <div class="m2main" v-show="paymentShow">
            <el-table
              :data="form.reportList"
              style="padding: 20px"
              max-height="560"
              ref="multipleTable"
            >
              <!-- <el-table-column prop="id" label="ID"> </el-table-column> -->
              <el-table-column prop="plateNumber" label="车牌号"> </el-table-column>
              <el-table-column prop="driverName" label="司机名称"> </el-table-column>
              <el-table-column prop="startMileage" label="起始公里"> </el-table-column>
              <el-table-column prop="endMileage" label="返回公里"> </el-table-column>
              <el-table-column prop="mileage" label="行驶公里"> </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <!-- <el-button @click="Output" type="warning">导出</el-button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { carApplyInfo } from '@/api/data/car';

export default {
  name: 'CarRequestInfo', //用车申请信息
  data() {
    return {
      maxtbheigth: '300',
      paymentShow: true,
      form: {},
      inputTipWidth: this.commonFun.inputTipWidth,
      dialogTableVisible: false,
      fileview: '', //文件预览地址
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    //查询信息
    getInfo() {
      if (this.$route.query.id) {
        carApplyInfo(this.$route.query.id).then((response) => {
          this.form = response.data;
        });
      }
    },

    //返回
    goback() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
    },

    //导出
    Output() {},

    //刷新视图
    refreshView() {
      this.$store.dispatch('tagsView/delAllCachedViews', this.$route); //删除当前路径所有缓存视图
      const { fullPath } = this.$route; //获取全路径
      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + fullPath,
        });
      });
    },
  },

  // 使用 watch 监听路由变化，手动更新数据
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name) {
        // this.getInfo();
        this.$tab.refreshPage();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/commonAE.scss';
</style>
