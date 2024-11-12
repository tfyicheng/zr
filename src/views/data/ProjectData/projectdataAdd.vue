<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['资料管理', '项目资料管理', '项目资料列表', '添加项目资料']" />
        <div class="main">
          <div class="p0">
            <el-form :model="form" :inline="true" ref="form" :rules="ruleData">
              <el-form-item label="项 目 名 称" prop="prjName">
                <el-input
                  v-model="form.prjName"
                  placeholder="点击选择"
                  :maxlength="commonFun.inputMax"
                  :disabled="false"
                  @click.native="choosePri"
                >
                  <svg-icon
                    slot="suffix"
                    icon-class="choose"
                    style="cursor: pointer; margin-right: 10px"
                /></el-input>
              </el-form-item>

              <el-form-item class="pline" :label="'关联项目\n合同编号'">
                <el-input
                  v-model="form.contNumber"
                  placeholder="填入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div
          class="main2"
          v-for="(c, index) in form.prjPhaseData"
          :key="index"
          v-show="form.prjPhaseData && form.prjPhaseData.length > 0"
        >
          <div class="m2top">
            项目资料 {{ index + 1 }}
            <span
              style="
                color: red;
                cursor: pointer;
                font-size: 15px;
                line-height: 15px;
                margin-left: 10px;
              "
              @click="delc(c.uid)"
              >删除</span
            >
            <div class="m2topm">
              <span v-show="c.flag" @click="c.flag ? (c.flag = false) : (c.flag = true)"
                >收起 <i class="el-icon-caret-top"></i>
              </span>
              <span v-show="!c.flag" @click="c.flag ? (c.flag = false) : (c.flag = true)"
                >展开 <i class="el-icon-caret-bottom"></i>
              </span>
            </div>
          </div>
          <div class="m2main" v-show="c.flag">
            <div class="p0">
              <el-form :model="c" :inline="true" :ref="`refCont${index}`" :rules="ruleData">
                <el-form-item label="项目阶段" prop="prjPhase">
                  <el-select v-model="c.prjPhase" placeholder="点击选择" clearable>
                    <el-option
                      v-for="item in dict.type.project_plan"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="年份" prop="prjYear">
                  <el-date-picker
                    v-model="c.prjYear"
                    type="year"
                    placeholder="选择年份"
                    clearable
                    value-format="yyyy"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-form>
            </div>

            <div class="m2mt" v-show="c.prjData.length > 0">
              <div class="m2mb"><i style="color: red">*</i>资料名称</div>
              <!-- <div class="m2mb">项目阶段</div> -->
              <!-- <div class="m2mb">年份</div>
              <div class="m2mb">区域</div> -->
              <div class="m2mb">描述</div>
              <!-- <div class="m2mb">附件类型</div> -->
              <div class="m2mb"><i style="color: red">*</i>资料附件</div>
              <div class="m2mb" style="max-width: 60px">操作</div>
            </div>

            <el-form
              v-for="(cc, index) in c.prjData"
              :key="index"
              :model="cc"
              :ref="`refForm${cc.uuid}`"
              :rules="ruleData"
            >
              <div class="m2mt" v-if="true">
                <div class="m2mb">
                  <el-form-item label="" prop="dataName">
                    <el-input
                      v-model="cc.dataName"
                      placeholder="填入内容"
                      :maxlength="commonFun.inputMax"
                    ></el-input>
                  </el-form-item>
                </div>
                <!-- <div class="m2mb">
                  <el-form-item label="" prop="prjPhase">
                    <el-select v-model="c.prjPhase" placeholder="点击选择">
                      <el-option
                        v-for="item in dict.type.project_plan"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div> -->

                <!-- <div class="m2mb">
                  <el-form-item label="" prop="prjYear">
                    <el-date-picker
                      v-model="c.prjYear"
                      type="year"
                      placeholder="选择年份"
                      clearable
                      value-format="yyyy"
                    >
                    </el-date-picker>
                  </el-form-item>
                </div> -->

                <!-- <div class="m2mb">
                  <el-form-item label="" prop="area">
                    <el-cascader
                      :key="modalKey"
                      v-model="c.area"
                      :props="props"
                      :ref="c.uid + 'cascaderAddr'"
                      placeholder="请选择区域"
                      @change="areaChange(c.uid)"
                      clearable
                    ></el-cascader>
                  </el-form-item>
                </div> -->

                <div class="m2mb">
                  <el-form-item label="">
                    <el-input
                      v-model="cc.dataDesc"
                      placeholder="填入内容"
                      :maxlength="commonFun.inputMax"
                    ></el-input>
                  </el-form-item>
                </div>

                <!-- <div class="m2mb">
                  <el-form-item label="" prop="prjType">
                    <el-select v-model="c.prjType" placeholder="点击选择">
                      <el-option
                        @input="$forceUpdate()"
                        v-for="item in dict.type.file_type"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div> -->

                <div class="m2mb">
                  <el-form-item label="" prop="upfiles">
                    <el-input
                      v-model="cc.upfiles"
                      placeholder="请点击选择"
                      readonly
                      @click.native="chooseFile(c.uid, cc.uuid)"
                      ><svg-icon
                        slot="suffix"
                        icon-class="choose"
                        style="cursor: pointer; margin-right: 10px; width: 14px; height: 14px"
                      />
                    </el-input>
                    <FileUpload
                      :ref="cc.uuid + ''"
                      :uid="cc.uuid"
                      @uplist="getUpList"
                      @upDown="upDown"
                      @fileDel="fileDel"
                      :value="cc.files"
                      :upType="cc.fileType"
                      :mustType="true"
                    />
                  </el-form-item>
                </div>

                <div class="m2mb" style="max-width: 60px">
                  <svg-icon
                    icon-class="delete"
                    style="cursor: hand"
                    @click="delpm(c.uid, cc.uuid)"
                  />
                </div>
              </div>
            </el-form>

            <div>
              <el-button type="primary" @click="addPayments(c.uid)">添加资料</el-button>
            </div>
          </div>
        </div>

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" @click="addP">添加阶段</el-button>
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
import { projDataAdd, projInfo, proPlanList } from '@/api/data/project';
import { getCity, getProvince } from '@/api/system/user';
import ProjList from '@/views/components/dialog/projList';
import FileUpload from '@/views/components/dialog/fileUpload';
export default {
  name: 'ProjectDataAdd', //项目资料添加
  dicts: ['project_type', 'project_status', 'file_type', 'project_plan'],
  components: { ProjList, FileUpload },
  data() {
    return {
      modalKey: 0,
      area: [],
      form: {
        prjNumber: '',
        prjName: '',
        data: [],
        prjPhaseData: [
          {
            uid: Math.floor(Math.random() * 100) + 1, //临时随机id
            prjData: [
              {
                uuid: Math.floor(Math.random() * 1000) + 1, //临时随机id
                upfiles: null,
              },
            ],
            flag: true,
          },
        ],
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
      uid: '', //临时记录节点id
      uuid: '', //临时记录节点id
      ruleData: {
        prjNumber: [{ required: true, message: '项目编号不能为空', trigger: 'blur' }],
        prjName: [{ required: true, message: '项目名称不能为空', trigger: 'change' }],
        dataName: [{ required: true, message: '资料名称不能为空', trigger: 'blur' }],
        prjPhase: [{ required: true, message: '请选择项目阶段', trigger: ['change', 'blur'] }],
        prjYear: [{ required: true, message: '请选择年份', trigger: ['change', 'blur'] }],
        area: [{ required: true, message: '请选择区域', trigger: 'change' }],
        dataDesc: [{ required: true, message: '请输入描述', trigger: 'blur' }],
        upfiles: [{ required: true, message: '文件不能为空', trigger: ['change', 'blur'] }],
        fileType: [{ required: true, message: '请选择附件类型', trigger: 'change' }],
      },
    };
  },

  mounted() {},

  created() {},
  methods: {
    // //获取项目资料详情
    // getInfo(id) {
    //   projInfo(id).then((response) => {
    //     console.log(response);
    //     this.form.prjNumber = response.data.prjNumber;
    //     this.form.prjName = response.data.prjName;
    //   });
    // },

    //获取项目计划阶段
    // getPlanNode(id) {
    //   if (id) {
    //     proPlanList(id).then((response) => {
    //       console.log(response);
    //       this.planNode = response.data;
    //     });
    //   }
    // },

    checkChoose(rule, value, callback) {
      console.warn('checkFavoriteFood', value);
      if (value.lenght == 0) {
        callback(new Error('选择不能为空'));
      } else {
        callback();
      }
    },

    //选择附件
    chooseFile(uid, uuid) {
      this.uid = uid;
      this.uuid = uuid;
      this.$refs[uuid][0].visible = true;
    },

    //选择区域的值
    areaChange(uid) {
      console.log(uid, this.$refs[uid + 'cascaderAddr'][0]);
      if (this.$refs.cascaderAddr && this.$refs.cascaderAddr.checkedValue.length === 0) {
        this.form.data.find((item) => item.uid === uid).areaProvince = null;
        this.form.data.find((item) => item.uid === uid).areaCity = null;
        this.form.data.find((item) => item.uid === uid).areaRegion = null;
      } else {
        const checkedNodes = this.$refs[uid + 'cascaderAddr'][0].getCheckedNodes();
        this.form.data.find((item) => item.uid === uid).areaProvince = checkedNodes[0].pathLabels[0]
          ? checkedNodes[0].pathLabels[0]
          : null;
        this.form.data.find((item) => item.uid === uid).areaCity = checkedNodes[0].pathLabels[1]
          ? checkedNodes[0].pathLabels[1]
          : null;
        this.form.data.find((item) => item.uid === uid).areaRegion = checkedNodes[0].pathLabels[2]
          ? checkedNodes[0].pathLabels[2]
          : null;
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
        this.form.prjId = data[0].id;
        this.form.contNumber = data[0].contNumber;
        // this.getInfo(data[0].prjNumber);
        // this.getPlanNode(data[0].prjNumber);
      }
    },

    //关闭选择弹窗
    closeChoose() {
      this.dialogTableVisible = false;
    },

    //添加阶段
    addP() {
      var nv = {
        uid: Math.floor(Math.random() * 100) + 1, //临时随机id
        prjData: [],
        flag: true,
      };
      this.form.prjPhaseData.push(nv);
    },

    //删除阶段
    delc(uid) {
      this.form.prjPhaseData.splice(
        this.form.prjPhaseData.findIndex((item) => item.uid === uid),
        1,
      );
    },

    //添加节点
    addPayments(id1) {
      var nv = {
        uuid: Math.floor(Math.random() * 1000) + 1, //临时随机id
        upfiles: null,
      };
      if (this.form.prjPhaseData.findIndex((item) => item.uid === id1) != -1) {
        let va = this.form.prjPhaseData.find((item) => item.uid === id1);

        va.prjData.push(nv);
      }
    },

    //删除节点
    delpm(id1, uid) {
      if (this.form.prjPhaseData.findIndex((item) => item.uid === id1) != -1) {
        let va = this.form.prjPhaseData.find((item) => item.uid === id1);
        va.prjData.splice(
          va.prjData.findIndex((item) => item.uuid === uid),
          1,
        );
      }
    },

    //获取等待上传的文件列表
    getUpList(val) {
      //console.log(val);
      let ufstr = this.commonFun.splitStr(val.uplist);
      // this.form.data.find((item) => item.uid === val.uid).upfiles = ufstr;
      // this.form.data.find((item) => item.uid === val.uid).prjType = val.prjType;
      if (this.form.prjPhaseData.findIndex((item) => item.uid === this.uid) != -1) {
        let va = this.form.prjPhaseData.find((item) => item.uid === this.uid);

        if (va.prjData.findIndex((item) => item.uuid === this.uuid) != -1) {
          let vva = va.prjData.find((item) => item.uuid === this.uuid);

          vva.upfiles = ufstr;
          vva.fileType = val.prjType;
        }
      }
      this.$forceUpdate();
    },

    //成功上传的文件列表
    upDown(val) {
      //console.log('成功上传的文件列表', val);
      // this.form.data.find((item) => item.uid === val.uid).annexFile = val.file;
      // this.form.data.find((item) => item.uid === val.uid).prjType = val.prjType;

      let vf = [];
      this.form.prjPhaseData.map((c) => {
        c.prjData.map((cc) => {
          vf.push(cc);
        });
      });
      if (vf.findIndex((item) => item.uuid === val.uid) != -1) {
        let vva = vf.find((item) => item.uuid === val.uid);

        vva.fileIds = val.file.map((c) => {
          return c.annexId;
        });
        vva.fileType = val.prjType;
      }

      if (this.checkUpFile()) {
        this.save2();
      }
    },

    //删除的文件列表
    fileDel(val) {
      //console.log(val);
      let vf = [];
      this.form.prjPhaseData.map((c) => {
        c.prjData.map((cc) => {
          vf.push(cc);
        });
      });

      let ufstr = this.commonFun.splitStr(val.uplist);
      if (vf.findIndex((item) => item.uuid === val.uid) != -1) {
        let vva = vf.find((item) => item.uuid === val.uid);

        vva.fileIds = val.file.map((c) => {
          return c.annexId;
        });
        vva.upfiles = ufstr;
        vva.fileType = val.prjType;
      }
      this.$forceUpdate();
    },

    //检查文件上传状态
    checkUpFile() {
      let vf = [];
      this.form.prjPhaseData.map((c) => {
        c.prjData.map((cc) => {
          vf.push(cc);
        });
      });

      let flag = 0;
      vf.forEach((item) => {
        if (this.$refs[item.uuid][0].number == 0) {
          flag += 1;
        }
      });
      if (flag == vf.length) {
        return true;
      } else {
        return false;
      }
    },

    //文件上传方案3
    //异步上传
    async upFileForm() {
      // for await (let item of this.form.data) {
      //   //console.log('开始上传', item.uid);
      //   var promise = this.$refs[item.uid][0].asyncUpFile();
      // }

      let vf = [];
      this.form.prjPhaseData.map((c) => {
        c.prjData.map((cc) => {
          vf.push(cc);
        });
      });

      for (let item of vf) {
        console.log('组件开始上传:', item.uuid);
        if (this.$refs[item.uuid][0].number > 0) {
          await this.$refs[item.uuid][0].asyncUpFile();
        }
        console.log('组件上传结束:', item.uuid, this.$refs[item.uuid][0].number);
        //额外判断当前组件上传结果
        if (this.$refs[item.uuid][0].number > 0) {
          this.$modal.closeLoading();
          break;
        }
      }

      // for await (let item of vf) {
      //   //console.log('开始上传', item.uid);
      //   var promise = this.$refs[item.uuid][0].asyncUpFile();
      // }
    },

    //表单校验
    validateForm(refs) {
      //console.log(refs);
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

      if (this.form.prjPhaseData.length == 0) {
        this.$message.error('请添加阶段');
        return;
      }

      let vf = [];
      this.form.prjPhaseData.map((c) => {
        c.prjData.map((cc) => {
          vf.push(cc);
        });
      });

      Promise.all([
        this.validateForm('form'),
        ...this.form.prjPhaseData.map((item, index) => this.validateForm(`refCont${index}`)),
        ...vf.map((item, index) => this.validateForm(`refForm${item.uuid}`)),
      ]).then((res) => {
        if (res) {
          // 表单验证通过

          if (this.checkUpFile()) {
            this.save2();
          } else {
            this.upFileForm();
          }
        }
      });
    },

    save2() {
      console.log(this.form);
      //this.$modal.loading('正在提交，请稍候...');
      projDataAdd(this.form)
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
        // height: 360px;
        // overflow: auto;
        background: #fff;
        border-radius: 4px;
        .m2top {
          padding-top: 20px;
          margin: 20px;
          font-family: Alibaba PuHuiTi 2;
          font-size: 20px;
          font-weight: 500;
          line-height: 28px;
          letter-spacing: 0em;
          text-align: left;
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

              #file {
                display: none;
              }
              .el-button {
                border: 0;
                margin: 0;
                width: 40px;
                height: 40px;
                border-radius: 4px;
              }
              .el-select,
              .el-input__inner {
                display: flex;
                flex: 1;
                //width: 300px;
              }
              .el-input__suffix {
                .el-input__suffix-inner {
                  border-color: none;
                  .el-icon-circle-close:before {
                    content: '\e79d' !important;
                    font-size: 18px;
                  }
                }
              }
              svg {
                width: 36px;
                height: 36px;
                margin-top: 0px;
              }
              .el-date-editor.el-input,
              .el-date-editor.el-input__inner {
                width: 100% !important;
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
