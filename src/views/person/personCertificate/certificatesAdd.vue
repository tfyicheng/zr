<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['人员管理', '人员证书管理 ', '人员证书列表 ', '添加人员证书']" />
        <div class="main">
          <div class="p0">
            <el-form :model="form" :inline="true" ref="form" :rules="formRules.rules">
              <el-form-item label="证 书 编 号">
                <el-input v-model="form.certNumber" placeholder="请输入内容" clearable />
              </el-form-item>
              <!-- <el-form-item label="证 书 名 称" prop="certName">
                <el-input v-model="form.certName" placeholder="请输入内容" clearable />
              </el-form-item> -->

              <el-form-item label="证 书 类 型" prop="cert">
                <CertCascader :data.sync="form.cert" :type="1" />
              </el-form-item>

              <!-- <el-form-item label="证 书 大 类" prop="certParentType">
                <el-select
                  v-model="form.certParentType"
                  placeholder="点击选择"
                  clearable
                  @change="certPChange"
                >
                  <el-option
                    v-for="item in dict.type.certificate_category"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="证 书 中 类" prop="certChildType">
                <el-select
                  v-model="form.certChildType"
                  placeholder="请先选择证书大类"
                  clearable
                  @change="certCChange"
                >
                  <el-option
                    v-for="item in certChildTypes"
                    :key="item.dictValue"
                    :label="item.dictLabel"
                    :value="item.dictValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="证 书 小 类" prop="certGrandsonType">
                <el-select v-model="form.certGrandsonType" placeholder="请先选择证书中类" clearable>
                  <el-option
                    v-for="item in certGrandsonTypes"
                    :key="item.dictValue"
                    :label="item.dictLabel"
                    :value="item.dictValue"
                  />
                </el-select>
              </el-form-item> -->
              <el-form-item label="项 目 名 称">
                <el-input v-model="form.prjName" placeholder="请输入内容" clearable />
              </el-form-item>

              <el-form-item label="人 员 名 称" prop="foreignCertName">
                <el-input
                  style="cursor: pointer"
                  v-model="form.foreignCertName"
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
              <el-form-item label="颁 发 机 构">
                <el-input v-model.trim="form.authority" placeholder="请输入内容" clearable />
              </el-form-item>
              <el-form-item label="专 业">
                <el-input v-model.trim="form.major" placeholder="请输入内容" clearable />
              </el-form-item>
              <el-form-item label="颁 发 机 构">
                <el-input v-model.trim="form.authority" placeholder="请输入内容" clearable />
              </el-form-item>
              <el-form-item label="发 证 时 间">
                <el-date-picker
                  v-model="form.issueDate"
                  type="date"
                  placeholder="选择时间"
                  value-format="yyyy-MM-dd"
                  clearable
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item label="通 过 时 间">
                <el-date-picker
                  v-model="form.throughDate"
                  type="date"
                  placeholder="选择时间"
                  value-format="yyyy-MM-dd"
                  clearable
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item label="有 效 时 间">
                <el-date-picker
                  v-model="form.expireDate"
                  type="date"
                  placeholder="选择时间"
                  value-format="yyyy-MM-dd"
                  clearable
                >
                </el-date-picker>
              </el-form-item>
              <!-- <el-form-item label="证书有效年限" prop="validity">
                <el-select v-model="form.validity" placeholder="点击选择">
                  <el-option
                    v-for="item in dict.type.cert_years"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    clearable
                  >
                  </el-option>
                </el-select>
              </el-form-item> -->
              <!-- <el-form-item label="水 印 名 称" prop="watermark">
                <el-input v-model="form.watermark" placeholder="请输入内容" clearable />
              </el-form-item> -->
            </el-form>
          </div>

          <div class="p2">
            <div class="p2item">
              <span>证 书 备 注</span>
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="form.remark"
                show-word-limit
                resize="none"
                :maxlength="commonFun.reMarkMax"
              >
              </el-input>
            </div>
            <div class="p2item">
              <span>证 书 附 件</span>
              <!-- <FileUpload ref="uList" /> -->
              <FileChoose
                ref="FileChoose"
                :value.sync="form.annexFile"
                :extra="1"
                :autoUpload="false"
              />
            </div>
          </div>
        </div>
        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </div>
        <!--destroy-on-close :chooseItems = chooseItemss  -->
        <el-dialog :visible.sync="dialogTableVisible">
          <PersonList v-show="this.form.certType == 0" ref="pList" />
          <DeptList v-show="this.form.certType == 1" ref="dList" />
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { certAdd1 } from '@/api/data/certificate';
import PersonList from '@/views/components/dialog/personlist';
import DeptList from '@/views/components/dialog/deptlist';

export default {
  name: 'PCertificatesAdd', //添加
  dicts: ['certificate_category', 'cert_type', 'cert_years'],
  components: { PersonList, DeptList },
  data() {
    return {
      certChildTypes: [],
      certGrandsonTypes: [],
      options: [],
      textarea: '',
      form: {
        certType: 0,
        cert: [],
        foreignCertName: '',
        foreignCert: [],
        // authority: "颁发机构xxx",
        // issueDate: "2023-12-15",
        // certChildType: 0,
        // certParentType: 0,
        // certGrandsonType: 0,
        // certNumber: "202312201245217",
        // certName: "证书名称",
        // validity: 10,
        // watermark: "水印",
        // annexFile: [
        //   {
        //     annexId: "1735214359929446400"
        //   },
        //   {
        //     annexId: "1735214161396260864"
        //   }
        // ],
        // foreignCert: [
        //   {
        //     primaryId: "6",
        //     type: 0
        //   },
        //   {
        //     primaryId: "100",
        //     type: 1
        //   }
        // ]
      },
      chooseList: '', //选择的人员或组织
      dialogTableVisible: false,
    };
  },

  mounted() {
    //this.$refs.uList.$on('upload', this.getUlist);
  },

  created() {},
  methods: {
    //切换大类联动中类
    certPChange() {
      this.certChildTypes =
        this.dict.type.certificate_category[this.form.certParentType].raw.children;
    },

    //切换中类联动小类
    certCChange() {
      this.certGrandsonTypes = this.certChildTypes[this.form.certChildType].children;
    },

    //选择人员
    choosePerson() {
      this.form.certType = 0;
      if (this.form.certType == undefined) {
        this.$message.error('请先选择证书类型');
        return;
      }

      this.dialogTableVisible = true;
      if (this.form.certType == 0) {
        this.$nextTick(() => {
          this.$refs.pList.$off('getChoose', this.getChoose);
          this.$refs.pList.$on('getChoose', this.getChoose);
          this.$refs.pList.$on('closeChoose', this.closeChoose);
          this.$refs.pList.getList();
        }, 500); //在el-dialog打开后，再执行$on方法否则refs为空则没有监听事件
      } else {
        this.$nextTick(() => {
          this.$refs.dList.$off('getChoose', this.getChoose);
          this.$refs.dList.$on('getChoose', this.getChoose);
          this.$refs.dList.$on('closeChoose', this.closeChoose);
          this.$refs.dList.getList();
        }, 500);
      }
    },

    //获取选择的人员/组织 0=>人员 1=>组织
    getChoose(data) {
      this.form.foreignCert = [];
      this.form.foreignCertName = '';
      this.dialogTableVisible = false;
      if (this.form.certType == 0) {
        if (data) {
          if (Array.isArray(data)) {
            let str = '';
            for (var i = 0; i < data.length; i++) {
              str += data[i].userName + (i + 1 == data.length ? '' : '/');
              this.form.foreignCert.push({
                primaryId: data[i].userId, //人员/组织ID
                type: 0, //类型:0人员1组织
              });
            }
            this.form.foreignCertName = str;
          }
        }
      } else {
        if (data) {
          if (Array.isArray(data)) {
            let str = '';
            for (var i = 0; i < data.length; i++) {
              str += data[i].deptName + (i + 1 == data.length ? '' : '/');
              this.form.foreignCert.push({
                primaryId: data[i].deptId, //人员/组织ID
                type: 1, //类型:0人员1组织
              });
            }
            this.form.foreignCertName = str;
          }
        }
      }
    },

    //关闭选择人员弹窗
    closeChoose() {
      this.dialogTableVisible = false;
    },

    // 获取上传的文件
    getUlist(data) {
      console.log(data);
      this.form.annexFile = data;
    },

    // 保存
    save() {
      (this.form.certParentType = this.commonFun.getArrVal(this.form.cert, 0)), //证书大类
        (this.form.certChildType = this.commonFun.getArrVal(this.form.cert, 1)), //证书中类
        (this.form.certGrandsonType = this.commonFun.getArrVal(this.form.cert, 2)), //证书小类
        console.log(this.form);

      if (this.form.certParentType == '0' && this.form.certChildType == '0') {
        if (!this.formRules.isValidID(this.form.certNumber)) {
          this.$message.error('请输入合法的身份证号');
          return;
        }
      }
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$refs.FileChoose.asyncUpFile().then((res) => {
            if (res) {
              this.$modal.loading('正在提交，请稍候...');
              certAdd1(this.form)
                .then((res) => {
                  this.$modal.closeLoading();
                  console.log(res);
                  if (res.code == 200) {
                    this.$message.success('添加成功');
                    this.$store.dispatch('tagsView/delView', this.$route);
                    this.$router.go(-1);
                  }
                })
                .catch((error) => {
                  console.log('错误', error);
                  this.$modal.closeLoading();
                });
            }
          });
        }
      });
    },

    // 取消
    cancel() {
      this.$store.dispatch('tagsView/delView', this.$route);
      //this.$router.push({ path: '/data-d/certificatesCheck' });
      this.$route.go(-1);
    },

    goback() {
      this.$store.dispatch('tagsView/delView', this.$route); //关闭当前标签页
      this.$router.go(-1);
      //this.$router.push({ path: '/data-d/certificatesCheck' });
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
              // width: 100px;
              // height: 40px;
              // border-radius: 4px;
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
