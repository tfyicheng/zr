<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['项目管理', '项目人员管理', '项目人员列表', '编辑项目人员信息']" />
        <div class="main">
          <div class="p1">
            <div class="p1item">
              <span><i style="color: red; visibility: hidden">*</i>合 同 编 号</span>
              <el-input
                v-model="form.contNumber"
                placeholder="系统填写"
                :disabled="true"
              ></el-input>
            </div>
            <div class="p1item">
              <span><i style="color: red">*</i>项 目 名 称</span>
              <el-input
                v-model="form.prjName"
                placeholder="系统填写"
                :disabled="true"
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div>

            <div style="height: 20px"></div>
          </div>
        </div>

        <div class="main2">
          <div class="m2top">
            项目人员
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
            <div class="m2mt" v-show="form.personList.length > 0">
              <div class="m2mb"><i style="color: red">*</i>部门名称</div>
              <div class="m2mb"><i style="color: red">*</i>人员名称</div>
              <div class="m2mb"><i style="color: red">*</i>项目角色</div>
              <div class="m2mb"><i style="color: red">*</i>联系号码</div>
              <div class="m2mb"><i style="color: red">*</i>邮箱</div>
              <div class="m2mb"><i style="color: red">*</i>联系地址</div>
              <div class="m2mb" style="max-width: 60px">操作</div>
            </div>

            <el-form
              v-for="(c, index) in form.personList"
              :key="index"
              :model="c"
              :ref="`refForm1${index}`"
              :rules="ruleData"
            >
              <div class="m2mt">
                <div class="m2mb">
                  <el-form-item label="">
                    <el-input
                      v-model="c.deptName"
                      placeholder="系统填写"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="m2mb">
                  <el-form-item label="">
                    <el-input
                      v-model="c.userName"
                      placeholder="系统填写"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="m2mb">
                  <el-form-item label="" prop="prjRole">
                    <el-select v-model="c.prjRole" placeholder="点击选择" clearable>
                      <el-option
                        v-for="item in dict.type.project_role"
                        :key="item.value"
                        :label="item.label"
                        :value="Number(item.value)"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>

                <div class="m2mb">
                  <el-form-item label="">
                    <el-input
                      v-model="c.phoneNumber"
                      placeholder="系统填写"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                </div>

                <div class="m2mb">
                  <el-form-item label="">
                    <el-input v-model="c.email" placeholder="系统填写" :disabled="true"></el-input>
                  </el-form-item>
                </div>
                <div class="m2mb">
                  <el-form-item label="">
                    <el-input v-model="c.addr" placeholder="系统填写" :disabled="true"></el-input>
                  </el-form-item>
                </div>
                <div class="m2mb" style="max-width: 60px">
                  <svg-icon icon-class="delete" style="cursor: hand" @click="delpm(c.userId)" />
                </div>
              </div>
            </el-form>
            <div>
              <el-button type="primary" @click="addPayments">添加人员</el-button>
            </div>
          </div>
        </div>

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </div>

        <el-dialog :visible.sync="dialogTableVisible">
          <PersonList v-show="this.ChooseOne == 'pList'" ref="pList" />
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import PersonList from '@/views/components/dialog/personlist';
import { projPersonEdit, projPersonOneList } from '@/api/data/project';
export default {
  name: 'ProjectPersonnelEdit', //编辑项目人员
  dicts: ['project_type', 'project_scale', 'project_role'],
  components: { PersonList },
  data() {
    return {
      data: {},
      form: {
        personList: [],
      },

      paymentShow: true,
      dialogTableVisible: false,
      ChooseOne: '', //当前弹窗目标
      ruleData: {
        prjName: [{ required: true, message: '项目名称不能为空', trigger: 'blur' }],
        prjType: [{ required: true, message: '项目类型不能为空', trigger: 'change' }],
        scaleUnit: [{ required: true, message: '项目规模不能为空', trigger: 'change' }],
        startDate: [{ required: true, message: '请选择开始日期', trigger: 'change' }],
        deliveryDate: [{ required: true, message: '请选择交付日期', trigger: 'change' }],
        bidNumber: [{ required: true, message: '请选择投标编号', trigger: 'change' }],
        clientName: [{ required: true, message: '请选择客户', trigger: 'change' }],
        contacts: [{ required: true, message: '联系人不能为空', trigger: 'blur' }],
        area: [{ required: true, message: '请选择区域', trigger: ['blur', 'change'] }],
        phone: [
          { required: true, message: '请输入号码', trigger: 'blur' },
          // {
          //   pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
          //   message: '请输入正确的手机号码',
          //   trigger: 'blur',
          // },
        ],
        prjRole: [{ required: true, message: '请选择项目角色', trigger: 'change' }],
        planName: [{ required: true, message: '计划名称不能为空', trigger: 'blur' }],
        planDesc: [{ required: true, message: '计划描述不能为空', trigger: 'blur' }],
        weight: [{ required: true, message: '权重不能为空', trigger: 'blur' }],
        phase: [{ required: true, message: '请选择阶段', trigger: 'change' }],
        startDate: [{ required: true, message: '请选择计划开始时间', trigger: 'change' }],
        endDate: [{ required: true, message: '请选择计划结束时间', trigger: 'change' }],
      },
      flagId: null,
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      if (this.$route.query.id) {
        this.flagId = this.$route.query.id;
        projPersonOneList(this.$route.query.id).then((response) => {
          console.log(response);
          this.form = response.data;
          this.form.prjId = this.$route.query.id;
        });
      }
      if (this.$route.query.data) {
        // console.log(this.$route.query.data);
        //this.data = this.$route.query.data;
        // projPersonOneList(this.$route.query.data.prjNumber).then((response) => {
        //   console.log(response);
        //   this.form.personList = response.data;
        // });
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
        // this.userName = data[0].userName;
        // this.form.userId = data[0].userId;
        data.forEach((item) => {
          if (this.form.personList.findIndex((c) => c.userId == item.userId) == -1) {
            this.form.personList.push(item);
          }
        });
      }
    },

    //关闭选择弹窗
    closeChoose() {
      this.dialogTableVisible = false;
    },

    goback() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
    },
    //添加节点
    addPayments() {
      this.chooseUser();
    },
    //删除节点
    delpm(id) {
      this.form.personList.splice(
        this.form.personList.findIndex((item) => item.userId === id),
        1,
      );
    },

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
      console.log(this.form);

      if (this.form.personList.length == 0) {
        this.$message.error('项目人员不能为空');
        return;
      }

      Promise.all([
        ...this.form.personList.map((item, index) => this.validateForm(`refForm1${index}`)),
      ]).then((res) => {
        if (res) {
          this.form.prjNumber = this.data.prjNumber;
          this.$modal.loading('正在提交，请稍候...');
          projPersonEdit(this.form)
            .then((res) => {
              console.log(res);
              this.$modal.closeLoading();
              if (res.code == 200) {
                this.$message.success('修改成功');
                this.$store.dispatch('tagsView/delView', this.$route);
                this.$router.go(-1);
              }
            })
            .catch((error) => {
              this.$modal.closeLoading();
            });
        }
      });
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
            .el-cascader,
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

            ::v-deep.el-input-group .el-input-group__prepend {
              width: 100px;
              padding: 0;
              margin: 0;
              height: 22px;
            }
            .selprepend {
              width: 120px;
              height: 34px;
              padding: 0;
              margin: 0;
            }
          }
          .p1item:last-child {
            width: 795px;
            .el-input {
              width: 645px;
            }
          }
        }

        .p2 {
          margin-top: 10px;

          .p2item {
            margin-bottom: 10px;
            span {
              line-height: 100px;
              text-align: center;
              margin: 0 37px 0 25px;
              font-family: Alibaba PuHuiTi 2;
              font-size: 16px;
              font-weight: 500;
            }
            .el-textarea {
              height: 240px !important;
              width: 1050px;
              border-radius: 4px;
              border: 1px;
              ::v-deep textarea {
                height: 240px !important;
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
              top: -170px;
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
          .m2mt {
            height: 60px;
            display: flex;
            line-height: 60px;
            .m2mb {
              flex: 1;
              margin: 0px 10px 10px 20px;
              .el-button {
                border: 0;
                margin: 0;
                width: 40px;
                height: 40px;
                border-radius: 4px;
              }
              .el-select,
              .el-input-inner {
                display: flex;
                flex: 1;
              }
              svg {
                width: 36px;
                height: 36px;
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
