<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['人员管理', '履职经历管理', '履职经历列表', '编辑履职经历']" />
        <div class="main">
          <div class="p0">
            <el-form :model="form" :inline="true" ref="form" :rules="ruleData">
              <el-form-item label="开 始 时 间" prop="startDate">
                <el-date-picker
                  v-model="form.startDate"
                  type="date"
                  placeholder="选择时间"
                  value-format="yyyy-MM-dd"
                  clearable
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item label="结 束 时 间" prop="endDate">
                <el-date-picker
                  v-model="form.endDate"
                  type="date"
                  placeholder="选择时间"
                  value-format="yyyy-MM-dd"
                  clearable
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item label="人 员 名 称" prop="userName">
                <el-input
                  style="cursor: pointer; tooltip-effect: none"
                  v-model="form.userName"
                  placeholder="点击选择"
                  @click.native="choosePerson"
                  readonly
                >
                  <svg-icon
                    slot="suffix"
                    icon-class="choose"
                    style="cursor: pointer; margin-right: 10px"
                  />
                </el-input>
              </el-form-item>

              <el-form-item label="单 位 名 称" prop="unitName">
                <el-input
                  v-model="form.unitName"
                  placeholder="请输入"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="部 门" prop="deptName">
                <el-input
                  v-model="form.deptName"
                  placeholder="请输入"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="职 位" prop="postName">
                <el-input
                  v-model="form.postName"
                  placeholder="请输入"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="证 明 人" prop="certifier">
                <el-input
                  v-model="form.certifier"
                  placeholder="请输入"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="证明人手机" prop="certifierPhone">
                <el-input
                  v-model="form.certifierPhone"
                  @blur="(e) => (form.certifierPhone = e.target.value)"
                  @input="$forceUpdate()"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  placeholder="请输入"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>
            </el-form>
          </div>

          <div class="p2">
            <div class="p2item">
              <span>经 历 描 述</span>
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="form.careerDesc"
                maxlength="200"
                show-word-limit
                resize="none"
              >
              </el-input>
            </div>
          </div>
          <div style="clear: both"></div>
        </div>
        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </div>

        <el-dialog :visible.sync="dialogTableVisible">
          <PersonList v-show="this.ChooseOne == 'pList'" :Multiple="false" ref="pList" />
          <!-- <DeptList   v-show="this.form.certType == 1" ref="dList" /> -->
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { workInfo, workUpdate } from '@/api/data/person';
import PersonList from '@/views/components/dialog/personlist';
//import DeptList from '@/views/components/dialog/deptlist';

export default {
  name: 'PersonResumeEdit', //编辑履职经历
  components: { PersonList },
  data() {
    return {
      form: {
        userName: null,
      },
      ChooseOne: '', //当前弹窗目标
      dialogTableVisible: false,
      queryId: '',
      ruleData: {
        userName: [{ required: true, message: '人员名称不能为空', trigger: 'change' }],
        startDate: [{ required: true, message: '请选择开始时间', trigger: 'change' }],
        endDate: [{ required: true, message: '请选择结束时间', trigger: 'change' }],
        unitName: [{ required: true, message: '单位名称不能为空', trigger: 'blur' }],
        deptName: [{ required: true, message: '部门不能为空', trigger: 'blur' }],
        postName: [{ required: true, message: '职位不能为空', trigger: 'blur' }],
        certifier: [{ required: true, message: '证明人不能为空', trigger: 'blur' }],
        certifierPhone: [
          { required: true, message: '请输入号码', trigger: 'blur' },
          // {
          //   pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
          //   message: '请输入正确的手机号码',
          //   trigger: 'blur',
          // },
        ],
      },
    };
  },

  mounted() {
    //this.$refs.uList.$on('upload', this.getUlist);
  },

  created() {
    this.getInfo();
  },
  methods: {
    //查询信息
    getInfo() {
      if (this.$route.query.id) {
        this.queryId = this.$route.query.id;
        workInfo(this.$route.query.id).then((response) => {
          //console.log(response);
          this.form = response.data;
        });
      }
    },

    //选择人员
    choosePerson() {
      this.dialogTableVisible = true;
      this.ChooseOne = 'pList';
      this.$nextTick(() => {
        this.$refs.pList.$off('getChoose', this.getChoose);
        this.$refs.pList.$on('getChoose', this.getChoose);
        this.$refs.pList.$on('closeChoose', this.closeChoose);
      }, 500);
    },

    getChoose(data) {
      this.dialogTableVisible = false;
      if (data) {
        this.form.userId = data[0].userId;
        this.form.userName = data[0].userName;
      }
    },

    //关闭选择人员弹窗
    closeChoose() {
      this.dialogTableVisible = false;
    },

    // 获取上传的文件
    // getUlist(data) {
    //   this.form.annexFile = data;
    // },

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
      Promise.all([this.validateForm('form')]).then((res) => {
        if (res) {
          this.$modal.loading('正在提交，请稍候...');
          workUpdate(this.form)
            .then((res) => {
              console.log(res);
              this.$modal.closeLoading();
              if (res.code == 200) {
                this.$message.success('修改成功');
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
      if (to.name == this.$options.name && this.$route.query.id != this.queryId) {
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
          margin-bottom: 20px;
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
