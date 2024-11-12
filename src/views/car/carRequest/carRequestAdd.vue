<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['车辆管理', '用车申请管理', '用车申请列表', '添加用车申请']" />
        <div class="main">
          <div class="p0">
            <el-form :model="form" :inline="true" ref="form" :rules="ruleData">
              <!-- <el-form-item label="申 请 部 门">
                <el-input v-model="form.useDept" placeholder="系统填写" disabled></el-input>
              </el-form-item> -->

              <!-- <el-form-item label="申 请 人">
                <el-input
                  v-model="form.applyUser"
                  placeholder="系统填写"
                  @click.native="chooseUser"
                  readonly
                  disabled
                >
                </el-input>
              </el-form-item>    -->

              <el-form-item label="用 车 部 门" prop="useDeptId">
                <!-- <DeptChoose :data.sync="form.deptIds" :Multiple="false" /> -->
                <el-select v-model="form.useDeptId" placeholder="部门" @change="getDept" clearable>
                  <el-option
                    v-for="item in depts"
                    :key="item.deptId"
                    :label="item.deptName"
                    :value="item.deptId"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="出 行 人" prop="applyUser">
                <el-input
                  v-model="form.applyUser"
                  placeholder="点击选择"
                  @click.native="chooseUser"
                  readonly
                >
                  <svg-icon
                    slot="suffix"
                    icon-class="choose"
                    style="cursor: pointer; margin-right: 10px"
                  />
                </el-input>
              </el-form-item>

              <!-- <el-form-item label="用 车 类 型" prop="outType">
                <el-select v-model="form.outType" placeholder="点击选择">
                  <el-option
                    v-for="item in dict.type.out_type"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item> -->

              <!-- <el-form-item label="用 车 人 数" prop="usePersonNum">
                <el-input
                  v-model="form.usePersonNum"
                  @input="$forceUpdate()"
                  @blur="(e) => (form.usePersonNum = e.target.value)"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  placeholder="请输入"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item> -->

              <el-form-item label="车 辆 号 码" prop="car">
                <el-input
                  v-model="form.car"
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
              <!-- 
              <el-form-item label="到 达 地 点" prop="area">
                <el-cascader
                  v-model="form.area"
                  :props="props"
                  ref="cascaderAddr"
                  placeholder="请选择区域"
                  @change="areaChange"
                  clearable
                ></el-cascader>
              </el-form-item> -->

              <el-form-item label="目 的 区 域" prop="area">
                <AddrCascader :data.sync="form.area" />
              </el-form-item>

              <el-form-item label="目 的 地" prop="destination">
                <el-input
                  v-model="form.destination"
                  placeholder="请输入"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="用 车 项 目" prop="projectName">
                <el-input
                  v-model="form.projectName"
                  placeholder="请输入"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="出车时间" prop="useTime">
                <el-date-picker
                  v-model="form.useTime"
                  type="date"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期"
                  clearable
                >
                </el-date-picker>
              </el-form-item>
            </el-form>
          </div>

          <div class="p2">
            <div class="p2item">
              <span><i style="color: red">*</i>用 车 事 由</span>
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="form.remark"
                maxlength="200"
                show-word-limit
                resize="none"
              >
              </el-input>
            </div>
          </div>
        </div>
        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </div>

        <el-dialog :visible.sync="dialogTableVisible">
          <PersonList
            v-show="this.ChooseOne == 'pList'"
            :type="1"
            ref="pList"
            :extra="form.useDeptId"
          />
          <CarList v-show="this.ChooseOne == 'carList'" ref="carList" :Multiple="false" />
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { listDept } from '@/api/system/dept';
import { carApplyAdd } from '@/api/data/car';
import { userDeptInfo } from '@/api/data/person';
import { getInfo } from '@/api/login';
import PersonList from '@/views/components/dialog/personlist';
import CarList from '@/views/components/dialog/carlist';
import { getCity, getProvince } from '@/api/system/user';
export default {
  name: 'CarRequestAdd', //添加用车申请
  dicts: ['out_type'],
  components: { PersonList, CarList },
  data() {
    return {
      area: [], //选择区域数组
      form: {
        applyUser: null,
        area: [],
        car: null,
        remark: null,
      },
      depts: [], //部门项
      ChooseOne: '',
      dialogTableVisible: false,
      //区域级联选择配置
      props: {
        checkStrictly: true,
        lazy: true,
        lazyLoad(node, resolve) {
          if (node.level == 0) {
            getCity().then((response) => {
              const nodes = response.data.map((item) => ({
                value: item.id,
                label: item.name,
              }));
              resolve(nodes);
            });
          } else if (node.level == 1) {
            getProvince(node.value).then((response) => {
              const nodes = response.data.map((item) => ({
                value: item.id,
                label: item.name,
              }));
              resolve(nodes);
            });
          } else if (node.level == 2) {
            getCity(node.parent.value, node.value).then((response) => {
              const nodes = response.data.map((item) => ({
                value: item.id,
                label: item.name,
                leaf: node.level == 2,
              }));
              resolve(nodes);
            });
          } else if (node.level == 3) {
            resolve(null);
          }
        },
      },
      ruleData: {
        outType: [{ required: true, message: '请选择类型', trigger: 'change' }],
        car: [{ required: true, message: '请选择车辆', trigger: 'change' }],
        usePersonNum: [{ required: true, message: '人数不能为空', trigger: 'blur' }],
        area: [{ required: true, message: '请选择区域', trigger: ['change', 'blur'] }],
        useDeptId: [{ required: true, message: '请选择部门', trigger: ['change', 'blur'] }],
        useTime: [{ required: true, message: '请选择时间', trigger: 'change' }],
        applyUser: [{ required: true, message: '请选择人员', trigger: 'change' }],
        destination: [{ required: true, message: '请输入目的地', trigger: ['change', 'blur'] }],
        projectName: [{ required: true, message: '请输入', trigger: ['change', 'blur'] }],
        area: [{ required: true, message: '区域不能为空', trigger: ['blur', 'change'] }],
      },
    };
  },

  mounted() {},

  created() {
    //this.getUserDeptInfo();
    this.getDeptList();
  },
  methods: {
    //获取部门列表
    getDeptList() {
      listDept().then((response) => {
        this.depts = response.data;
      });
    },

    getDept(val) {
      let va = this.depts.find((c) => c.deptId == val);
      if (va) {
        this.form.useDept = va.deptName;
      }
    },

    //获取自身部门信息，申请人为自己  20240430 统一一个人管理路由，部门单选
    getUserDeptInfo() {
      // this.form.applyUser = this.$store.state.user.name;
      // this.form.useDept = this.$store.state.user.deptName;
      // this.form.useDeptId = this.$store.state.user.deptId;
      // console.log(this.$store.state.user.deptName);
      // console.log(this.$store.state.user.deptId);
    },

    //选择区域的值
    areaChange(value) {
      if (this.$refs.cascaderAddr && this.$refs.cascaderAddr.checkedValue.length === 0) {
        this.form.areaProvince = '';
        this.form.areaCity = '';
        this.form.areaRegion = '';
      } else {
        const checkedNodes = this.$refs['cascaderAddr'].getCheckedNodes();
        this.form.areaProvince = checkedNodes[0].pathLabels[0] ? checkedNodes[0].pathLabels[0] : '';
        this.form.areaCity = checkedNodes[0].pathLabels[1] ? checkedNodes[0].pathLabels[1] : '';
        this.form.areaRegion = checkedNodes[0].pathLabels[2] ? checkedNodes[0].pathLabels[2] : '';
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
      if (data && data.length > 0) {
        // this.form.car = '';
        // this.form.carId = '';
        // data.forEach((item) => {
        //   this.form.car += item.plateNumber + ',';
        //   this.form.carId += item.id + ',';
        // });
        // this.form.car = this.form.car.substr(0, this.form.car.length - 1);
        // this.form.carId = this.form.carId.substr(0, this.form.carId.length - 1);
        this.form.carNumber = data[0].plateNumber;
        this.form.car = data[0].plateNumber;
      }
    },

    //选择用户id
    chooseUser() {
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
      if (data && data.length > 0) {
        // this.form.applyUser = data[0].userName;
        // this.form.applyUserId = data[0].userId;
        // userDeptInfo(data[0].applyUserId).then((response) => {
        //   this.form.useDeptId = response.data.deptId;
        //   this.form.useDept = response.data.deptName;
        // });
        this.form.applyUser = data.map((c) => {
          return c.userName;
        });
        this.form.applyUserId = data.map((c) => {
          return c.userId;
        });
      }
    },

    //关闭选择人员弹窗
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
      console.log(this.form);

      if (!this.form.remark) {
        this.$message.error('用车事由不能为空');
        return;
      }

      Promise.all([this.validateForm('form')]).then((res) => {
        if (res) {
          this.commonFun.ConverAreaVal(this.form);
          this.$modal.loading('正在提交，请稍候...');

          carApplyAdd(this.form)
            .then((res) => {
              this.$modal.closeLoading();
              console.log(res);
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
            .el-cascader,
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
          padding-bottom: 20px;
          .p2item {
            span {
              line-height: 100px;
              text-align: center;
              margin: 0 35px 0 28px;
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
