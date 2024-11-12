<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['车辆管理', '用车申请管理', '用车申请列表', '用车归还']" />
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
              <el-form :model="data" :inline="true" ref="form" :rules="ruleData">
                <el-form-item label="用 车 公 里 数" prop="mileage">
                  <el-input-number
                    v-model="data.mileage"
                    :controls="false"
                    :min="0"
                    placeholder="请输入"
                  >
                  </el-input-number>
                </el-form-item>

                <el-form-item label="车辆回收时间" prop="recoveryTime">
                  <el-date-picker
                    v-model="data.recoveryTime"
                    type="datetime"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    clearable
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="回 收 备 注">
                  <el-input
                    v-model="data.remark"
                    placeholder="请输入内容"
                    :maxlength="commonFun.inputMax"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>

        <div class="main2" v-if="false">
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
            <div class="m2mt" v-show="data.reportList.length > 0">
              <div class="m2mb"><i style="color: red">*</i>司机名称</div>
              <div class="m2mb"><i style="color: red">*</i>车辆</div>
              <div class="m2mb"><i style="color: red">*</i>返回里程</div>
              <div class="m2mb"><i style="color: red">*</i>行驶里程</div>
              <div class="m2mb"><i style="color: red">*</i>起始里程</div>
            </div>

            <el-form
              v-for="(c, index) in data.reportList"
              :key="index"
              :model="c"
              :ref="`refForm${index}`"
              :rules="ruleData"
            >
              <div class="m2mt">
                <div class="m2mb">
                  <el-form-item label="" prop="driverName">
                    <el-input v-model="c.driverName" placeholder="请输入" clearable></el-input>
                  </el-form-item>
                </div>
                <div class="m2mb">
                  <el-form-item label="">
                    <el-input v-model="c.car" placeholder="系统填入" disabled></el-input>
                  </el-form-item>
                </div>

                <div class="m2mb">
                  <el-form-item label="" prop="endMileage">
                    <el-input
                      v-model="c.endMileage"
                      @blur="(e) => (c.endMileage = e.target.value)"
                      @input="$forceUpdate()"
                      oninput="value=value.replace(/[^\d]/g,'')"
                      placeholder="请输入"
                      :maxlength="commonFun.inputMax"
                      clearable
                    ></el-input>
                  </el-form-item>
                </div>

                <div class="m2mb">
                  <el-form-item label="" prop="mileage">
                    <el-input
                      v-model="c.mileage"
                      @blur="(e) => (c.mileage = e.target.value)"
                      @input="$forceUpdate()"
                      oninput="value=value.replace(/[^\d]/g,'')"
                      placeholder="请输入"
                      :maxlength="commonFun.inputMax"
                      clearable
                    ></el-input>
                  </el-form-item>
                </div>

                <div class="m2mb">
                  <el-form-item label="" prop="startMileage">
                    <el-input
                      v-model="c.startMileage"
                      @blur="(e) => (c.startMileage = e.target.value)"
                      @input="$forceUpdate()"
                      oninput="value=value.replace(/[^\d]/g,'')"
                      placeholder="请输入"
                      :maxlength="commonFun.inputMax"
                      clearable
                    ></el-input>
                  </el-form-item>
                </div>

                <!-- <div class="m2mb" style="max-width: 100px">
                <svg-icon icon-class="delete" style="cursor: hand" @click="delpm(c.uid)" />
              </div> -->
              </div>
            </el-form>

            <!-- <div>
              <el-button type="primary" @click="addPayments">添加报告</el-button>
            </div> -->
          </div>
        </div>

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </div>

        <el-dialog :visible.sync="dialogTableVisible">
          <CarList v-show="this.ChooseOne == 'carList'" :Multiple="false" ref="carList" />
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { carApplyInfo, carReturn } from '@/api/data/car';
import CarList from '@/views/components/dialog/carlist';
export default {
  name: 'CarRequestReback', //用车归还
  components: { CarList },
  data() {
    return {
      data: {
        mileage: null,
        recoveryTime: null,
        remark: null,
      },
      form: {
        totalCost: null,
      },
      inputTipWidth: this.commonFun.inputTipWidth,
      paymentShow: true,
      ChooseOne: '',
      dialogTableVisible: false,
      uid: '', //临时记录节点id
      ruleData: {
        totalCost: [
          { required: true, message: '金额不能为空', trigger: 'blur' },
          {
            validator: function (rule, value, callback) {
              if (value) {
                callback();
              } else {
                let tip = '';

                if (value * 1 === 0) {
                  tip = '金额应大于0';
                }

                if (tip) {
                  callback(new Error(tip));
                } else {
                  callback();
                }
              }
            },
            trigger: ['blur', 'change'],
          },
        ],
        returnTime: [{ required: true, message: '返回时间不能为空', trigger: 'change' }],
        driverName: [{ required: true, message: '司机名称不能为空', trigger: 'blur' }],
        endMileage: [{ required: true, message: '返回里程不能为空', trigger: 'blur' }],
        mileage: [{ required: true, message: '行驶里程不能为空', trigger: 'blur' }],
        startMileage: [{ required: true, message: '起始里程不能为空', trigger: 'blur' }],
        mileage: [{ required: true, message: '公里数不能为空', trigger: ['blur', 'change'] }],
        recoveryTime: [
          { required: true, message: '回收时间不能为空', trigger: ['blur', 'change'] },
        ],
      },
      flagId: null,
    };
  },

  mounted() {},

  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      if (this.$route.query.id) {
        this.flagId = this.$route.query.id;
        this.data.id = this.$route.query.id;
        carApplyInfo(this.$route.query.id).then((response) => {
          console.log(response);
          this.form = response.data;
          // if (response.data.plateNumber) {
          //   let re = response.data.carId.split(',');
          //   let res = response.data.plateNumber.split(',');
          //   for (let index = 0; index < res.length; index++) {
          //     this.data.reportList.push({
          //       carId: re[index],
          //       car: res[index],
          //     });
          //   }
          // }
        });
      }
    },

    //选择车
    chooseCar(uid) {
      this.dialogTableVisible = true;
      this.uid = uid;
      this.ChooseOne = 'carList';
      this.$nextTick(() => {
        this.$refs.carList.$off('getChoose', this.getCar);
        this.$refs.carList.$on('getChoose', this.getCar);
        this.$refs.carList.$on('closeChoose', this.closeChoose);
        this.$refs.carList.getList();
      }, 500);
    },

    //获取车id
    getCar(data) {
      this.dialogTableVisible = false;

      if (data && data.length > 0) {
        this.data.reportList.find((item) => item.uid === this.uid).carId = data[0].id;
        this.data.reportList.find((item) => item.uid === this.uid).car = data[0].plateNumber;
      }
    },

    //添加节点
    addPayments() {
      var nv = {
        uid: Math.floor(Math.random() * 100) + 1, //临时随机id
      };
      this.data.reportList.push(nv);
    },

    //删除收款节点
    delpm(id) {
      this.data.reportList.splice(
        this.data.reportList.findIndex((item) => item.uid === uid),
        1,
      );
    },

    //表单校验
    validateForm(refs) {
      console.log(refs);
      let valiForm = this.$refs?.[refs].validate ? this.$refs?.[refs] : this.$refs?.[refs][0];
      return new Promise((resolve, reject) => {
        valiForm.validate((res) => {
          if (res) resolve();
          else reject();
        });
      });
    },

    // 保存
    save() {
      console.log(this.data);

      Promise.all([this.validateForm('form')]).then((res) => {
        if (res) {
          // this.data.totalCost = this.form.totalCost;
          // this.data.returnTime = this.form.returnTime;
          // this.data.id = this.$route.query.id;
          this.$modal.loading('正在提交，请稍候...');

          carReturn(this.data)
            .then((res) => {
              this.$modal.closeLoading();
              console.log(res);
              if (res.code == 200) {
                this.$message.success('提交成功');
                this.goback();
              }
            })
            .catch((error) => {
              this.$modal.closeLoading();
            });
        }
      });
    },

    // 取消
    goback() {
      this.$store.dispatch('tagsView/delView', this.$route); //关闭当前标签页
      this.$router.go(-1);
    },
  },
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name && this.flagId != this.$route.query.id) {
        this.getInfo();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/styles/commonAE.scss';
</style>
