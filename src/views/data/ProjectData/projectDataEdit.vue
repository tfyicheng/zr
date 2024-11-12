<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['资料管理', '项目资料管理', '项目资料列表', '编辑项目资料']" />

        <div class="main">
          <div class="p0">
            <el-form :model="form" :inline="true" ref="form" :rules="ruleData">
              <el-form-item label="关联合同编号">
                <el-input
                  v-model="form.contNumber"
                  placeholder="填入内容"
                  :maxlength="commonFun.inputMax"
                  disabled
                ></el-input>
              </el-form-item>

              <el-form-item label="项 目 名 称">
                <!-- <el-input
                  v-model="form.prjName"
                  placeholder="选择/输入"
                  :maxlength="commonFun.inputMax"
                >
                  <svg-icon
                    slot="suffix"
                    @click.native="choosePri"
                    icon-class="choose"
                    style="cursor: pointer; margin-right: 10px""
                /></el-input> -->
                <el-input
                  v-model="form.prjName"
                  placeholder="填入内容"
                  :maxlength="commonFun.inputMax"
                  disabled
                ></el-input>
              </el-form-item>

              <el-form-item label="资 料 类 型" prop="fileType">
                <el-select v-model="form.fileType" placeholder="点击选择" clearable>
                  <el-option
                    v-for="item in dict.type.file_type"
                    :key="item.value"
                    :label="item.label"
                    :value="Number(item.value)"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="资 料 名 称" prop="dataName">
                <el-input
                  v-model="form.dataName"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="年 份" prop="prjYear">
                <el-date-picker
                  v-model="form.prjYear"
                  type="year"
                  placeholder="选择时间"
                  value-format="yyyy"
                  clearable
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="项 目 阶 段" prop="prjPhase">
                <el-select v-model="form.prjPhase" placeholder="点击选择" clearable>
                  <el-option
                    v-for="item in dict.type.project_plan"
                    :key="item.value"
                    :label="item.label"
                    :value="Number(item.value)"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>

          <div class="p2">
            <div class="p2item">
              <span><i style="color: red; visibility: hidden">*</i>资 料 描 述</span>
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="form.dataDesc"
                maxlength="500"
                show-word-limit
                resize="none"
              >
              </el-input>
            </div>
            <div class="p2item">
              <span><i style="color: red; visibility: hidden">*</i>资 料 附 件</span>
              <FileUpload2
                ref="uList"
                :upType="form.fileType"
                :value="form.annexFile"
                :mustType="true"
              />
            </div>
          </div>
        </div>
        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </div>

        <el-dialog :visible.sync="dialogTableVisible">
          <ProjList v-show="this.ChooseOne == 'jList'" :Multiple="false" ref="jList" />
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { projDataInfo, projDataUpdate, projDataInfoOne } from '@/api/data/project';
import { projInfo, proPlanList } from '@/api/data/project';
import { getCity, getProvince } from '@/api/system/user';
import ProjList from '@/views/components/dialog/projList';
export default {
  name: 'ProjectDataEdit', //项目资料编辑
  dicts: ['project_type', 'project_status', 'file_type', 'project_plan'],
  components: { ProjList },
  data() {
    return {
      modalKey: 0,
      area: [],
      form: {
        area: [],
      },
      //级联选择配置
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
      dialogTableVisible: false,
      ChooseOne: '',
      region: [],
      planNode: [],
      flagId: null,
      ruleData: {
        prjNumber: [{ required: true, message: '项目编号不能为空', trigger: 'blur' }],
        prjName: [{ required: true, message: '项目名称不能为空', trigger: 'change' }],
        dataName: [{ required: true, message: '资料名称不能为空', trigger: 'blur' }],
        prjPhase: [{ required: true, message: '请选择项目阶段', trigger: 'change' }],
        prjYear: [{ required: true, message: '请选择年份', trigger: 'change' }],
        area: [{ required: true, message: '请选择区域', trigger: ['blur', 'change'] }],
        dataDesc: [{ required: true, message: '请输入描述', trigger: 'blur' }],
        upfiles: [{ required: true, message: '请选择文件', trigger: 'blur' }],
        fileType: [{ required: true, message: '请选择类型', trigger: 'change' }],
      },
    };
  },

  mounted() {
    this.$refs.uList.$on('upload', this.getUlist);
  },

  created() {
    this.getInfoFrist();
  },
  methods: {
    getInfoFrist() {
      if (this.$route.query.id) {
        this.flagId = this.$route.query.id;
        projDataInfoOne(this.$route.query.id).then((response) => {
          console.log(response);
          this.form = response.data.prjData;
          this.form.contNumber = response.data.contNumber;
          this.form.prjName = response.data.prjName;
          this.form.prjYear = response.data.prjData.prjYear + ''; //时间选择器回显绑定数据类型为字符串
        });
      }
    },
    //获取项目资料详情
    getInfo(id) {
      projInfo(id).then((response) => {
        console.log(response);
        this.form.prjNumber = response.data.prjNumber;
        this.form.prjName = response.data.prjName;
        this.form.prjYear = response.data.startDate;
        let resdata = JSON.parse(JSON.stringify(response.data));
        this.getArea(resdata);
      });
    },

    //获取项目计划阶段
    // getPlanNode(id) {
    //   if (id) {
    //     proPlanList(id).then((response) => {
    //       console.log(response);
    //       this.planNode = response.data;
    //     });
    //   }
    // },

    //选择区域的值
    areaChange(value) {
      console.log(this.area);
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

    //区域数据回显
    getArea(resdata) {
      if (resdata.areaProvince) {
        getCity().then((response) => {
          response.data.forEach((item) => {
            if (item.name === resdata.areaProvince) {
              this.area[0] = item.id;
              this.form.area = this.area;
              this.modalKey++;
              // this.$refs.form.validateField('area', (val) => (!val ? true : false));
              if (resdata.areaCity) {
                getCity(this.area[0]).then((response) => {
                  response.data.forEach((item) => {
                    if (item.name == resdata.areaCity) {
                      this.area[1] = item.id;
                      this.form.area = this.area;
                      this.modalKey++;
                      //   this.$refs.form.validateField('area', (val) => (!val ? true : false));
                      if (resdata.areaRegion && this.area[0] && this.area[1]) {
                        getCity(this.area[0], this.area[1]).then((response) => {
                          response.data.forEach((item) => {
                            if (item.name == resdata.areaRegion) {
                              this.area[2] = item.id;
                              this.form.area = this.area;
                              this.modalKey++; //改变key值，组件重新渲染，实现回填功能
                              //    this.$refs.form.validateField('area', (val) => (!val ? true : false));
                            }
                          });
                        });
                      }
                    }
                  });
                });
              }
            }
          });
        });
      }
    },

    //选择项目id
    choosePri() {
      this.dialogTableVisible = true;
      this.ChooseOne = 'jList';
      this.$nextTick(() => {
        this.$refs.jList.$off('getChoose', this.getPri);
        this.$refs.jList.$on('getChoose', this.getPri);
        this.$refs.jList.$on('closeChoose', this.closeChoose);
        this.$refs.jList.getList();
      }, 500);
    },

    getPri(data) {
      this.dialogTableVisible = false;
      if (data) {
        this.form.prjName = data[0].prjName;
        this.form.prjNumber = data[0].showPrjNumber;
        this.form.prjType = data[0].prjType;
        // this.getInfo(data[0].prjNumber);
        //  this.getPlanNode(data[0].prjNumber);
      }
    },

    //关闭选择弹窗
    closeChoose() {
      this.dialogTableVisible = false;
    },

    // // 获取上传的文件
    // getUlist(data) {
    //   console.log('获取上传的文件:', data);
    //   this.form.annexFile = data;
    // },

    // // 保存
    // save() {
    //   console.log(this.form);
    //   if (this.form.prjType == null || this.form.prjType == undefined) {
    //     this.$message.error('请先选择资料类型');
    //     return;
    //   }
    //   this.$modal.loading('正在提交，请稍候...');
    //   projDataUpdate(this.form)
    //     .then((res) => {
    //       console.log(res);
    //       this.$modal.closeLoading();
    //       if (res.code == 200) {
    //         this.$message.success('修改成功');
    //         this.$store.dispatch('tagsView/delView', this.$route);
    //         this.$router.go(-1);
    //       }
    //     })
    //     .catch((error) => {
    //       this.$modal.closeLoading();
    //     });
    // },

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

    //文件上传方案2
    // 获取上传的文件
    getUlist(data) {
      console.log('获取上传的文件:', data);
      this.form.annexFile = data;
    },

    // 保存
    save() {
      console.log(this.form);
      // const formVal = ['prjNumber', 'prjName', 'prjType', 'areaProvince', 'prjYear', 'dataName'];
      // if (this.commonFun.saveFormCheck(this.form, formVal)) {
      // }

      Promise.all([this.validateForm('form')]).then((res) => {
        if (res) {
          this.$refs.uList.asyncUpFile().then((res) => {
            if (res) {
              this.save2();
            }
          });
        }
      });
    },

    save2() {
      if (this.form.annexFile.length == 0) {
        this.$message.error('附件不能为空');
        return;
      }
      this.form.fileIds = this.form.annexFile.map((c) => {
        return c.annexId;
      });
      this.$modal.loading('正在提交，请稍候...');
      projDataUpdate(this.form)
        .then((res) => {
          console.log(res);
          this.$modal.closeLoading();
          if (res.code == 200) {
            this.$message.success('修改成功');
            this.goback();
          } else {
            this.form.fileIds = null;
          }
        })
        .catch((error) => {
          this.$modal.closeLoading();
          this.form.fileIds = null;
        });
    },

    // 取消
    goback() {
      this.$store.dispatch('tagsView/delView', this.$route); //关闭当前标签页
      this.$router.go(-1);
    },
  },
  computed: {},
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name && this.flagId != this.$route.query.id) {
        this.getInfoFrist();
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
            .el-cascader,
            .el-input,
            .el-input-number,
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
          // .p1item:last-child {
          //   width: 795px;
          //   .el-input {
          //     width: 645px;
          //   }
          // }
        }

        .p2 {
          margin-top: 10px;
          .p2item {
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
                width: 40px;
                height: 40px;
                margin-top: 10px;
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
