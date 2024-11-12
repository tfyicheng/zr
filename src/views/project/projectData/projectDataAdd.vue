<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['项目管理', '项目资料归档管理', '项目资料归档列表', '添加资料归档']" />
        <div class="main">
          <div class="p0">
            <el-form :model="form" :inline="true" ref="form" :rules="ruleData">
              <el-form-item label="项 目 名 称" prop="prjName">
                <el-input
                  v-model="form.prjName"
                  placeholder="选择/输入"
                  :maxlength="commonFun.inputMax"
                >
                  <svg-icon
                    slot="suffix"
                    @click.native="choosePri"
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

              <el-form-item label="项 目 区 域" prop="prjArea">
                <AddrCascader :data.sync="form.prjArea" />
              </el-form-item>

              <el-form-item label="项 目 类 型" prop="prjType">
                <el-select v-model="form.prjType" placeholder="点击选择" clearable>
                  <el-option
                    v-for="item in dict.type.project_type"
                    :key="item.value"
                    :label="item.label"
                    :value="Number(item.value)"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="工 程 等 级" prop="engineeringLevel">
                <el-select v-model="form.engineeringLevel" placeholder="点击选择" clearable>
                  <el-option
                    v-for="item in dict.type.engineering_level"
                    :key="item.value"
                    :label="item.label"
                    :value="Number(item.value)"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="工 程 级 别" prop="engineeringLevelType">
                <el-select v-model="form.engineeringLevelType" placeholder="点击选择" clearable>
                  <el-option
                    v-for="item in dict.type.engineering_level0"
                    :key="item.value"
                    :label="item.label"
                    :value="Number(item.value)"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="项 目 规 模" prop="prjScale">
                <el-select v-model="form.prjScale" placeholder="点击选择" clearable>
                  <el-option
                    v-for="item in dict.type.project_scale"
                    :key="item.value"
                    :label="item.label"
                    :value="Number(item.value)"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="项目开始日期" prop="startDate">
                <el-date-picker
                  v-model="form.startDate"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  clearable
                ></el-date-picker>
              </el-form-item>

              <el-form-item label="项目结束日期" prop="deliveryDate">
                <el-date-picker
                  v-model="form.deliveryDate"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  clearable
                ></el-date-picker>
              </el-form-item>

              <el-form-item label="项 目 描 述" class="remark">
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="form.prjDesc"
                  maxlength="500"
                  show-word-limit
                  resize="none"
                >
                </el-input>
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
            归档资料 {{ index + 1 }}
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
              <el-button type="primary" style="width: auto" @click="addPayments2(c.uid)"
                >选择项目资料</el-button
              >
            </div>
          </div>
        </div>

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" @click="addP">添加阶段</el-button>
          <el-button type="primary" @click="save(false)">确认</el-button>
          <el-button type="primary" style="width: auto" @click="save(true)"
            >确认并完成归档</el-button
          >
        </div>

        <el-dialog :visible.sync="dialogTableVisible">
          <ProjList v-show="this.ChooseOne == 'jList'" :Multiple="false" ref="jList" :status="1" />
        </el-dialog>
      </div>
      <PrjDataDialog ref="PrjDataDialog" @getChoose="getprjData" />
    </div>
  </div>
</template>

<script>
import { prjDataAdd, prjDataComplete, projInfo, proPlanList } from '@/api/data/project';
import { getCity, getProvince } from '@/api/system/user';
import ProjList from '@/views/components/dialog/projList';
import FileUpload from '@/views/components/dialog/fileUpload';
import PrjDataDialog from '@/views/components/dialog/prjDataDialog';
export default {
  name: 'ProjectDataAdd', //项目归档资料添加
  dicts: [
    'project_type',
    'project_status',
    'file_type',
    'project_plan',
    'project_scale',
    'project_type',
    'project_src',
    'engineering_level',
    'engineering_level0',
  ],
  components: { ProjList, FileUpload, PrjDataDialog },
  data() {
    return {
      modalKey: 0,

      form: {
        prjType: null,
        engineeringLevel: null,
        engineeringLevelType: null,
        prjScale: null,
        startDate: null,
        deliveryDate: null,
        prjDesc: null,
        prjNumber: '',
        prjName: '',
        prjArea: [],
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
        prjArea: [{ required: true, message: '请选择区域', trigger: ['change', 'blur'] }],
        dataDesc: [{ required: true, message: '请输入描述', trigger: 'blur' }],
        upfiles: [{ required: true, message: '文件不能为空', trigger: ['change', 'blur'] }],
        fileType: [{ required: true, message: '请选择附件类型', trigger: 'change' }],
        prjType: [{ required: true, message: '请选择类型', trigger: ['change', 'blur'] }],
        engineeringLevel: [{ required: true, message: '请选择', trigger: ['change', 'blur'] }],
        engineeringLevelType: [{ required: true, message: '请选择', trigger: ['change', 'blur'] }],
        prjScale: [{ required: true, message: '请选择', trigger: ['change', 'blur'] }],
        startDate: [{ required: true, message: '请选择', trigger: ['change', 'blur'] }],
        deliveryDate: [{ required: true, message: '请选择', trigger: ['change', 'blur'] }],
      },
      flag: false, //是否归档
    };
  },

  mounted() {},

  created() {},
  methods: {
    //获取项目资料详情
    getInfo(id) {
      projInfo(id).then((response) => {
        this.form.prjType = response.data.prjType;
        this.form.engineeringLevel = response.data.engineeringLevel;
        this.form.engineeringLevelType = response.data.engineeringLevelType;
        this.form.prjScale = response.data.prjScale;
        this.form.startDate = response.data.startDate;
        this.form.deliveryDate = response.data.deliveryDate;
        this.form.prjDesc = response.data.prjDesc;
        this.commonFun.backAreaVal(this.form, response.data);
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
        this.getInfo(data[0].id);
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

    //添加项目资料
    addPayments2(id1) {
      if (this.form.prjId == null) {
        this.$message.warning('请先选择已完成的项目');
        return;
      }
      this.uid = id1;
      this.$refs.PrjDataDialog.id = this.form.prjId;
      this.$refs.PrjDataDialog.clearSel();
      this.$refs.PrjDataDialog.show();

      // var nv = {
      //   uuid: Math.floor(Math.random() * 1000) + 1, //临时随机id
      //   upfiles: null,
      // };
      // if (this.form.prjPhaseData.findIndex((item) => item.uid === id1) != -1) {
      //   let va = this.form.prjPhaseData.find((item) => item.uid === id1);

      //   va.prjData.push(nv);
      // }
    },

    //获取选择的项目资料
    getprjData(data) {
      if (data) {
        data.forEach((c) => {
          var nv = {
            uuid: Math.floor(Math.random() * 1000) + 1, //临时随机id
            fileType: c.fileType,
            fileIds: c.files.map((c) => {
              return c.annexId;
            }),
            dataName: c.dataName,
            upfiles: this.commonFun.splitStr(
              c.files.map((c) => {
                return c.originalName;
              }),
            ),
            files: c.files,
          };
          if (this.form.prjPhaseData.findIndex((item) => item.uid === this.uid) != -1) {
            let va = this.form.prjPhaseData.find((item) => item.uid === this.uid);
            va.prjData.push(nv);
          }
        });
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

      // vf.forEach((item) => {
      //   console.log('开始上传:', item.uuid);
      //   var promise = this.$refs[item.uuid][0].asyncUpFile();
      // });
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
    save(flag = false) {
      this.flag = flag;
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
      this.commonFun.ConverAreaVal(this.form);
      console.log(this.form);
      //this.$modal.loading('正在提交，请稍候...');
      prjDataAdd(this.form)
        .then((res) => {
          console.log(res);
          this.$modal.closeLoading();
          if (res.code == 200) {
            this.$message.success('添加成功');
            this.goback();
            if (this.flag) {
              this.save3(res.data);
            }
          }
        })
        .catch((error) => {
          this.$modal.closeLoading();
        });
    },

    save3(id) {
      prjDataComplete(id).then((res) => {
        if (res.code == 200) {
          this.$message.success('归档成功');
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
</style>
