<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['车辆管理', '用车出库管理', '用车出库列表', '添加用车出库']" />
        <div class="main">
          <div class="p0">
            <el-form
              :model="form"
              :inline="true"
              ref="form"
              :rules="ruleData"
              @submit.native.prevent
            >
              <el-form-item label="车 辆 号 码" prop="plateNumber">
                <el-input
                  v-model="form.plateNumber"
                  placeholder="点击选择"
                  @click.native="chooseCar"
                  readonly
                >
                  <svg-icon
                    slot="suffix"
                    icon-class="choose"
                    style="cursor: pointer; margin-right: 10px"
                  />
                </el-input>
              </el-form-item>

              <el-form-item label="品 牌">
                <el-input v-model="form.brand" placeholder="系统填写" disabled></el-input>
              </el-form-item>

              <el-form-item label="购 买 日 期">
                <el-input v-model="form.buyDate" placeholder="系统填写" disabled></el-input>
              </el-form-item>

              <el-form-item label="发 动 机 号">
                <el-input v-model="form.engineNumber" placeholder="系统填写" disabled></el-input>
              </el-form-item>

              <el-form-item label="车 架 号">
                <el-input v-model="form.frameNumber" placeholder="系统填写" disabled></el-input>
              </el-form-item>

              <el-form-item label="型 号">
                <el-input v-model="form.model" placeholder="系统填写" disabled></el-input>
              </el-form-item>

              <el-form-item label="车辆照片" class="file">
                <FilePreview :data="form.carPicFile" />
              </el-form-item>
            </el-form>
          </div>

          <!-- <div class="p2">
            <div class="p2item">
              <span>车 辆 照片</span>

              <div class="p2img">
                <img
                  v-for="(c, index) in form.carPicFile"
                  :key="index"
                  :src="c.annexId"
                  :alt="c.originalName"
                  @click="preview(c.annexId)"
                />
              </div> 
            </div>
          </div> -->
          <div style="clear: both"></div>
        </div>

        <div class="main2">
          <div class="m2top">
            出库信息
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
            <div class="p0">
              <el-form :model="data" :inline="true" ref="form2" :rules="ruleData">
                <!-- <el-form-item label="出 库 人" prop="outboundUser">
                  <el-input
                    v-model="data.outboundUser"
                    placeholder="点击选择"
                    @click.native="chooseUser"
                    readonly
                  >
                    <svg-icon
                      slot="suffix"
                      icon-class="choose"
                      style="cursor: pointer; margin-right: 10px""
                    />
                  </el-input>
                </el-form-item> -->

                <el-form-item label="出 库 时 间" prop="outboundTime">
                  <el-date-picker
                    v-model="data.outboundTime"
                    type="date"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期"
                    clearable
                  >
                  </el-date-picker>
                </el-form-item>

                <el-form-item label="出 库 事 由" prop="outboundRemark" class="plast">
                  <el-input
                    v-model="data.outboundRemark"
                    placeholder="请输入"
                    :maxlength="commonFun.inputMax"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </div>
      </div>

      <el-dialog :visible.sync="dialogTableVisible">
        <PersonList v-show="this.ChooseOne == 'pList'" :type="1" :Multiple="false" ref="pList" />
        <CarList v-show="this.ChooseOne == 'carList'" :Multiple="false" ref="carList" />
      </el-dialog>

      <!-- <PersonDialog :type="1" :Multiple="false" @getChoose="getUser" ref="PersonDialog" /> -->
    </div>
  </div>
</template>

<script>
import PersonDialog from '@/views/components/dialog/personDialog';
import PersonList from '@/views/components/dialog/personlist';
import CarList from '@/views/components/dialog/carlist';
import { carOutAdd, carInfo } from '@/api/data/car';
export default {
  name: 'CarOutRequestAdd', //添加出库申请
  dicts: ['approval_status'],
  components: { PersonList, CarList, PersonDialog },
  data() {
    return {
      data: { outboundUser: null },
      form: {
        plateNumber: null,
      },
      ChooseOne: '',
      dialogTableVisible: false,
      dialogTableVisible2: false,
      paymentShow: true,
      ruleData: {
        plateNumber: [{ required: true, message: '请选择车辆', trigger: ['change', 'blur'] }],
        outboundUser: [{ required: true, message: '请选择出库人', trigger: ['change', 'blur'] }],
        outboundTime: [{ required: true, message: '请选择开始日期', trigger: 'change' }],
        outboundRemark: [{ required: true, message: '请输入内容', trigger: 'blur' }],
      },
    };
  },

  mounted() {},

  created() {
    this.getUserDeptInfo();
  },
  methods: {
    //获取自身部门信息，申请人为自己
    getUserDeptInfo() {
      console.log(this.$store.state.user.name);
      console.log(this.$store.state.user.id);
      console.log(this.$store.state.user.deptName);
      console.log(this.$store.state.user.deptId);
      // let data = this.commonFun.getUserDept(this.$store.state.user.id);
      // if (data) {
      //   this.data.outboundUser = data.userName;
      //   this.data.outboundUserId = data.userId;
      // }
      this.data.applyUserId = this.$store.state.user.id;
      this.data.applyDeptId = this.$store.state.user.deptId;
    },

    //获取车辆详情
    getCarInfo(id) {
      if (id) {
        carInfo(id).then((response) => {
          this.form = response.data;
        });
      }
    },

    //选择车
    chooseCar() {
      this.dialogTableVisible = true;
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
      if (data) {
        this.form.car = data[0].plateNumber;
        this.data.carId = data[0].id;
        this.data.carNumber = data[0].plateNumber;
        this.getCarInfo(data[0].id);
      }
    },

    //选择用户id
    chooseUser() {
      //this.$refs.PersonDialog.visible = true;
      this.dialogTableVisible = true;
      this.ChooseOne = 'pList';
      this.$nextTick(() => {
        this.$refs.pList.$off('getChoose', this.getUser);
        this.$refs.pList.$on('getChoose', this.getUser);
        this.$refs.pList.$on('closeChoose', this.closeChoose);
        this.$refs.pList.getList();
      }, 500);
    },

    //获取用户id
    getUser(data) {
      this.dialogTableVisible = false;
      if (data) {
        this.data.outboundUser = data[0].userName;
        this.data.outboundUserId = data[0].userId;
      }
    },

    //关闭选择弹窗
    closeChoose() {
      this.dialogTableVisible = false;
    },

    validateForm(refs) {
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

      Promise.all([this.validateForm('form'), this.validateForm('form2')]).then((res) => {
        if (res) {
          this.$modal.loading('正在提交，请稍候...');
          carOutAdd(this.data)
            .then((res) => {
              console.log(res);
              this.$modal.closeLoading();
              if (res.code == 200) {
                this.$message.success('添加成功');
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
  computed: {},
};
</script>
<style lang="scss" scoped>
@import '@/assets/styles/commonAE.scss';
.appo {
  overflow: auto;
  .appi {
    margin: 20px;
    min-width: 1220px;
    .appc {
      .top {
        font-family: Alibaba PuHuiTi 2;
        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
        letter-spacing: 0em;
        text-align: left;
        margin-bottom: 20px;
      }

      .main {
        background: #fff;
        border-radius: 4px;

        .p0 {
          .el-form {
            .el-form-item {
              margin: 20px 10px 20px 10px;
              width: 380px;
              ::v-deep.el-form-item__label {
                font-size: 16px;
                font-weight: 500;
                text-align: center;
                line-height: 37px;
                width: 135px;
                color: black;
              }
              .el-form-item__content {
                line-height: 37px;
                vertical-align: center;
                .el-input,
                .el-date-editor,
                .el-cascader,
                .el-input-number,
                .el-select {
                  width: 240px;
                  height: 37px;
                  ::v-deep.el-input__inner {
                    height: 37px !important;
                  }
                  ::v-deep.el-input__inner::placeholder {
                    font-size: 14px !important;
                  }
                }
              }
            }
            .el-form-item + .plast {
              width: 785px;
              .el-form-item__content {
                .el-input {
                  width: 645px;
                }
              }
            }
          }
        }

        .p1 {
          position: relative;
          display: inline-block;
          .p1item {
            margin: 4px 10px 0 4px;
            float: left;
            width: 390px;
            height: 60px;
            span {
              margin-left: 20px;
              float: left;
              text-align: center;
              line-height: 60px;
              font-size: 16px;
            }

            .el-input,
            .el-date-editor,
            .el-select {
              float: right;
              margin: 10px 10px 0 10px;
              width: 240px;
            }

            .el-button {
              margin-left: 12px;
            }
          }
        }

        .p2 {
          margin-top: 10px;
          .p2item {
            span {
              line-height: 100px;
              text-align: center;
              margin: 0 40px 0 30px;
              font-family: Alibaba PuHuiTi 2;
              font-size: 16px;
              font-weight: 500;
            }
            .el-textarea {
              height: 100px !important;
              width: 645px;
              border-radius: 4px;
              border: 1px;
              ::v-deep textarea {
                height: 100px !important;
              }
            }
            .el-button {
              width: 240px;
              height: 48px;
              border-radius: 4px;
              color: #409eff;
              font-family: Alibaba PuHuiTi 2;
              font-size: 16px;
              font-weight: 500;
            }
            .upload-file {
              margin-top: 30px;
              width: 400px;
              display: inline-block;
            }
            .p2img {
              max-height: 300px;
              width: 90%;
              overflow: auto;
              img {
                cursor: pointer;
                max-width: 120px;
                max-height: 120px;
                margin-right: 20px;
                margin-bottom: 20px;
              }
            }
          }
          .p2item:first-child {
            span {
              position: relative;
              top: -35px;
            }
          }
          .p2item:last-child {
            span {
              float: left;
            }
          }
        }
      }

      .main2 {
        margin-top: 20px;
        background: #fff;
        border-radius: 4px;
        .m2top {
          padding-top: 20px;
          padding-bottom: 20px;
          margin: 0 20px;
          font-family: Alibaba PuHuiTi 2;
          font-size: 20px;
          font-weight: 500;
          line-height: 28px;
          letter-spacing: 0em;
          text-align: left;
          .m2topm {
            display: inline;
            float: right;
            font-size: 14px;
            cursor: pointer;
            color: #409eff;
          }
        }
        .m2top::before {
          content: '\00a0    ';
          border-left: 3px solid #4da0ff;
        }
        .m2main {
          border-top: 1px solid #e4e6ed;

          .p0 {
            .el-form {
              .el-form-item {
                margin: 20px 10px 20px 10px;
                width: 380px;
                ::v-deep.el-form-item__label {
                  font-size: 16px;
                  font-weight: 500;
                  text-align: center;
                  line-height: 37px;
                  width: 135px;
                  color: black;
                }
                .el-form-item__content {
                  line-height: 37px;
                  vertical-align: center;
                  .el-input,
                  .el-date-editor,
                  .el-input-number,
                  .el-select {
                    width: 240px;
                    height: 37px;
                    ::v-deep.el-input__inner {
                      height: 37px !important;
                    }
                    ::v-deep.el-input__inner::placeholder {
                      font-size: 14px !important;
                    }
                  }
                }
              }
              .el-form-item + .plast {
                width: 785px;
                .el-form-item__content {
                  .el-input {
                    width: 645px;
                  }
                }
              }
            }
          }

          .p2 {
            position: relative;
            display: inline-block;
            .p2item {
              margin: 4px 10px 0 4px;
              float: left;
              //width: 390px;
              height: 60px;
              span {
                margin-left: 20px;
                float: left;
                text-align: center;
                line-height: 60px;
                font-size: 16px;
              }

              .el-input,
              .el-date-editor,
              .el-select {
                float: right;
                margin: 10px 10px 0 10px;
                width: 240px;
              }

              .el-button {
                margin-left: 12px;
              }
            }
          }
          .el-button {
            border: 0;
            margin: 20px 20px 20px 20px;
            width: 100px;
            height: 40px;
            border-radius: 4px;
          }
        }
      }

      .p3 {
        margin: 0px 0px;
        width: 98%;

        .el-button {
          border: 0;
          margin: 20px 20px 20px 0px;
          width: 100px;
          height: 40px;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>
