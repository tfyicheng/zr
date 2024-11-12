<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['车辆管理', '用车出库管理', '用车出库列表', '用车出库详情']" />
        <div class="main">
          <div class="p0">
            <el-form :model="form" :inline="true" class="info" @submit.native.prevent>
              <el-form-item label="出 库 编 号">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.id"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="车牌号" prop="contName">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.plateNumber"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="发动机号" prop="contName">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.engineNumber"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="车架号">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.frameNumber"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="品牌">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.brand"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="型号">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.model"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="购买时间">
                <div class="info">
                  <!-- <span>{{ commonFun.coverTime(form.buyDate) }}</span> -->
                  <span>{{ form.buyDate }}</span>
                </div>
              </el-form-item>

              <el-form-item label="车辆照片" class="file">
                <FilePreview :data="form.carPicFile" />
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div class="main2">
          <div class="m2top">出库信息</div>
          <div class="m2main">
            <div class="p0">
              <el-form :model="form" :inline="true" class="info">
                <!-- <el-form-item label="出 库 人">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="form.mileage"></InputTip>
                  </div>
                </el-form-item> -->

                <el-form-item label="出 库 时 间" prop="creditCode">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="form.outboundTime"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item class="plast" label="出 库 事 由" prop="contacts">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="form.outboundRemark"></InputTip>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>

        <div class="main2" v-if="false">
          <div class="m2top">
            审批记录
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
              :data="form.approvalRecordRes"
              style="padding: 20px"
              max-height="560"
              ref="multipleTable"
            >
              <!-- <el-table-column prop="id" label="ID"> </el-table-column> -->
              <el-table-column prop="approvalId" label="审批单"> </el-table-column>
              <el-table-column prop="approver" label="审批人"> </el-table-column>
              <el-table-column prop="deptName" label="所属部门"> </el-table-column>
              <el-table-column prop="approvalTime" label="审批(申请)时间"> </el-table-column>
              <el-table-column label="审批状态">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.approval_status"
                    :value="scope.row.status"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="approvalDesc" label="描述"> </el-table-column>
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
import { carOutInfo } from '@/api/data/car';

export default {
  name: 'CarOutRequestInfo', //出库申请信息
  dicts: ['approval_status'],
  data() {
    return {
      maxtbheigth: '300',
      paymentShow: true,
      form: {},
      inputTipWidth: this.commonFun.inputTipWidth,
      dialogTableVisible: false,
      flagId: null,
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    //查询信息
    getInfo() {
      if (this.$route.query.id) {
        this.flagId = this.$route.query.id;
        carOutInfo(this.$route.query.id).then((response) => {
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
      if (to.name == this.$options.name && this.flagId != this.$route.query.id) {
        //this.getInfo();
        this.$tab.refreshPage();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/commonAE.scss';
</style>
