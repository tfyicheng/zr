<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <!-- <div class="top">
          <svg-icon icon-class="back" style="cursor: hand" @click="goback" />
          任务单信息
        </div> -->

        <NavTop :val="['生产管理', '项目合同管理', '项目合同列表 ', '任务单信息']" />
        <div class="main">
          <div class="p1">
            <div class="p1item">
              <span>项 目 区 域</span>
              <span><InputTip :width="inputTipWidth" :text="form.prjArea"></InputTip></span>
            </div>
            <div class="p1item">
              <span>工 程 等 级</span>
              <span>
                <dict-tag :options="dict.type.engineering_level" :value="form.engineeringLevel" />
              </span>
            </div>
            <div class="p1item">
              <span>工程级别</span>
              <span>
                <dict-tag
                  :options="dict.type.engineering_level0"
                  :value="form.engineeringLevelType"
                />
              </span>
            </div>
            <div class="p1item">
              <span>项目规模</span>
              <span>
                <dict-tag :options="dict.type.project_scale" :value="form.prjScale" />
              </span>
            </div>
            <div class="p1item">
              <span>总投资 (元)</span>
              <span>{{ commonFun.amountConversion2(form.totalInvestment) }}</span>
            </div>
            <div class="p1item">
              <span>结算金额 (元)</span>
              <span>{{ commonFun.amountConversion2(form.settlementAmount) }}</span>
            </div>
          </div>
        </div>

        <div class="main2">
          <div class="m2top">项目参数</div>
          <div class="m2main">
            <div class="p0">
              <el-form :model="form" :inline="true" ref="form2" :rules="ruleData">
                <el-form-item label="项 目 名 称">
                  <el-input
                    v-model="form.prjName"
                    placeholder="请输入内容"
                    :maxlength="commonFun.inputMax"
                    clearable
                  ></el-input>
                </el-form-item>

                <el-form-item class="pline" :label="'项 目 计 划\n开 始 时 间'">
                  <el-date-picker
                    v-model="form.prjStartTime"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    clearable
                  ></el-date-picker>
                </el-form-item>

                <el-form-item class="pline" :label="'项 目 计 划\n交 付 时 间'">
                  <el-date-picker
                    v-model="form.prjEndTime"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    clearable
                  ></el-date-picker>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>

        <div class="main2">
          <div class="m2top">
            项目人员
            <div class="m2topm">
              <span
                v-show="personShow"
                @click="personShow ? (personShow = false) : (personShow = true)"
                >收起 <i class="el-icon-caret-top"></i>
              </span>
              <span
                v-show="!personShow"
                @click="personShow ? (personShow = false) : (personShow = true)"
                >展开 <i class="el-icon-caret-bottom"></i>
              </span>
            </div>
          </div>
          <div class="m2main" v-show="personShow">
            <div class="m2mt" v-show="form.personList.length > 0">
              <div class="m2mb" style="max-width: 250px"><i style="color: red">*</i>项目角色</div>
              <div class="m2mb" style="max-width: 250px"><i style="color: red">*</i>参与人员</div>
              <div class="m2mb">工作内容</div>
              <div class="m2mb" style="max-width: 60px">操作</div>
            </div>

            <el-form
              v-for="(c, index) in form.personList"
              :key="index"
              :model="c"
              :ref="`personForm${index}`"
              :rules="ruleData"
            >
              <div class="m2mt">
                <div class="m2mb" style="max-width: 250px">
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

                <div class="m2mb" style="max-width: 250px">
                  <el-form-item label="" prop="userIds">
                    <PersonChoose
                      :data.sync="c.userIds"
                      :backVal="c.userName"
                      @getPerson="getPerson($event, c.uid)"
                    />
                  </el-form-item>
                </div>

                <div class="m2mb">
                  <el-form-item label="">
                    <el-input v-model="c.jobContent" placeholder="请输入" clearable></el-input>
                  </el-form-item>
                </div>

                <div class="m2mb" style="max-width: 60px">
                  <svg-icon icon-class="delete" style="cursor: hand" @click="delperson(c.uid)" />
                </div>
              </div>
            </el-form>

            <div>
              <el-button type="primary" @click="addPerson">添加人员</el-button>
            </div>
          </div>
        </div>

        <div class="main2">
          <div class="m2top">
            项目阶段
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
            <div class="m2mt" v-show="form.taskPlanList.length > 0">
              <!-- <div class="m2mb" style="max-width: 100px">ID</div> -->
              <div class="m2mb"><i style="color: red">*</i>阶段</div>
              <!-- <div class="m2mb"><i style="color: red">*</i>阶段计划名称</div> -->
              <div class="m2mb" style="min-width: 500px">计划说明</div>
              <div class="m2mb"><i style="color: red">*</i>阶段比例(合计100.00%)</div>
              <!-- <div class="m2mb">权重</div> -->
              <div class="m2mb">关联收款节点</div>
              <div class="m2mb" style="max-width: 60px">操作</div>
            </div>

            <el-form
              v-for="(c, index) in form.taskPlanList"
              :key="index"
              :model="c"
              :ref="`nodeForm${index}`"
              :rules="ruleData"
            >
              <div class="m2mt">
                <div class="m2mb" v-show="false">
                  <el-form-item label="">
                    <el-input
                      v-model="c.planName"
                      placeholder="请输入内容"
                      :maxlength="commonFun.inputMax"
                    ></el-input>
                  </el-form-item>
                </div>

                <div class="m2mb">
                  <el-form-item label="" prop="phase">
                    <el-select
                      v-model="c.phase"
                      placeholder="点击选择"
                      clearable
                      style="width: 100%"
                    >
                      <el-option
                        v-for="item in dict.type.project_plan"
                        :key="item.value"
                        :label="item.label"
                        :value="Number(item.value)"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>

                <div class="m2mb" style="min-width: 500px">
                  <el-form-item label="">
                    <el-input
                      v-model="c.planDesc"
                      placeholder="请输入内容"
                      :maxlength="commonFun.inputMax"
                    ></el-input>
                  </el-form-item>
                </div>
                <!-- :placeholder="coverArray(c.node)" -->
                <div class="m2mb">
                  <el-form-item label="" prop="distribution">
                    <el-input-number
                      v-model="c.distribution"
                      :precision="2"
                      style="width: 100%"
                      :controls="false"
                      :min="0"
                      :max="100"
                      placeholder="请输入（%）"
                    >
                    </el-input-number>
                  </el-form-item>
                </div>
                <div class="m2mb">
                  <el-form-item label="">
                    <el-input
                      v-model="c.nodeName"
                      @input="$forceUpdate()"
                      @click.native="choosePerson(c.uid)"
                      readonly
                      ><svg-icon
                        slot="suffix"
                        icon-class="choose"
                        style="cursor: pointer; margin-right: 10px; width: 14px; height: 14px"
                      />
                    </el-input>
                  </el-form-item>
                </div>

                <div class="m2mb" style="max-width: 60px">
                  <svg-icon icon-class="delete" style="cursor: hand" @click="delpm(c.uid)" />
                </div>
              </div>
            </el-form>

            <div>
              <el-button type="primary" @click="addPayments">添加阶段</el-button>
            </div>
          </div>
        </div>

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </div>

        <el-dialog :visible.sync="dialogTableVisible">
          <PaymentNodeList ref="pList" :id="form.contId" :type="type" />
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import PaymentNodeList from '@/views/components/dialog/paymentNodelist';
import { planInfo, planEdit } from '@/api/data/contract';

export default {
  name: 'TaskSheetP', //项目任务单
  components: { PaymentNodeList },
  dicts: [
    'cont_type',
    'project_scale',
    'project_type',
    'project_src',
    'engineering_level',
    'engineering_level0',
    'project_role',
    'project_plan',
  ],
  data() {
    return {
      inputTipWidth: 230,
      form: {
        // contractName: '项目阶段计划名称项目阶段计划名称项目阶段计划名称项目阶段计划名称',
        personList: [],
        taskPlanList: [],
      },
      pnodes: [
        // {
        //   id: '1750772273235185664', //合同ID
        //   planName: '计算阶段1', //计划名称
        //   planDesc: '米宽的发生纠纷格洛克十九公里开始', //计划描述
        //   node: [
        //     {
        //       nodeId: '9', //节点ID
        //       nodeName: '节点名称1', //节点名称
        //     },
        //   ], //节点
        // },
      ],
      paymentShow: true,
      personShow: true,
      dialogTableVisible: false,
      uid: '', //临时记录节点id
      type: 0, //合同类型
      ruleData: {
        planName: [{ required: true, message: '计划名称不能为空', trigger: 'blur' }],
        nodeName: [{ required: true, message: '节点不能为空', trigger: 'change' }],
        distribution: [{ required: true, message: '请输入比例', trigger: 'blur' }],
        prjRole: [{ required: true, message: '请选择项目角色', trigger: 'change' }],
        userIds: [{ required: true, message: '请选择人员', trigger: ['blur', 'change'] }],
        phase: [{ required: true, message: '请选择阶段', trigger: ['blur', 'change'] }],
      },
      flagId: null,
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    //查询信息
    getInfo() {
      // if (this.$route.query.data) {
      //   this.form = this.$route.query.data;
      // }

      // if (this.$route.query.type) {
      //   this.type = this.$route.query.type;
      // }
      if (this.$route.query.id) {
        this.flagId = this.$route.query.id;
        planInfo(this.$route.query.id).then((response) => {
          //console.log(response);
          this.form = response.data;
          if (response.data) {
            this.form.prjArea = this.commonFun.coverRegin(
              response.data.prjAreaProvince,
              response.data.prjAreaCity,
              response.data.prjAreaRegion,
            );
            if (!response.data.personList) {
              this.form.personList = [];
            } else {
              this.form.personList.forEach((c) => {
                c.userIds = c.userId.split(',');
              });
            }
            if (!response.data.taskPlanList) {
              this.form.taskPlanList = [];
            } else {
              this.form.taskPlanList = response.data.taskPlanList.map((c) => {
                return { ...c, uid: Math.floor(Math.random() * 100) + 1 };
              });
            }
            // this.pnodes = response.data.map((c) => {
            //   return {
            //     id: c.id,
            //     planName: c.planName,
            //     planDesc: c.planDesc,
            //     node: c.node,
            //     nodeName: this.coverArray(c.node),
            //   };
            // });
          }
        });
      }
    },

    goback() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
    },

    getPerson(data, uid) {
      console.log(data, uid);
      if (data && data.length > 0) {
        console.log(this.form.personList.find((item) => item.uid === uid));
        this.form.personList.find((item) => item.uid === uid).userId = data
          .map((data) => data.userId)
          .join('/');
        this.form.personList.find((item) => item.uid === uid).userName = data
          .map((data) => data.userName)
          .join('/');
      } else {
        this.form.personList.find((item) => item.uid === uid).userId = null;
        this.form.personList.find((item) => item.uid === uid).userName = null;
      }
    },

    //添加人员
    addPerson() {
      var nv = {
        uid: Math.floor(Math.random() * 100) + 1, //临时随机id
        userIds: null, //先添加一个空值用于表单校验
      };
      this.form.personList.push(nv);
    },

    //删除人员
    delperson(uid) {
      this.form.personList.splice(
        this.form.personList.findIndex((item) => item.uid === uid),
        1,
      );
    },

    //添加节点
    addPayments() {
      var nv = {
        uid: Math.floor(Math.random() * 100) + 1, //临时随机id
        nodeName: null, //先添加一个空值用于表单校验
      };
      this.form.taskPlanList.push(nv);
    },

    //删除节点
    delpm(uid) {
      this.form.taskPlanList.splice(
        this.form.taskPlanList.findIndex((item) => item.uid === uid),
        1,
      );
    },

    //选择关联节点
    choosePerson(uid) {
      this.dialogTableVisible = true;
      this.$nextTick(() => {
        this.$refs.pList.$off('getChoose', this.getChoose);
        this.$refs.pList.$on('getChoose', this.getChoose);
        this.$refs.pList.$on('closeChoose', this.closeChoose);
        this.uid = uid;
        this.$refs.pList.clearSel();
      }, 500);
    },

    //获取选择
    getChoose(data) {
      this.dialogTableVisible = false;
      if (data) {
        if (Array.isArray(data) && data.length > 0) {
          //去重判断
          if (this.form.taskPlanList.findIndex((c) => c.nodeId == data[0].id) != -1) {
            this.$message.error('请勿选择相同节点');
            return;
          }
          let nodes = [];
          for (var i = 0; i < data.length; i++) {
            nodes.push({
              nodeId: data[i].id,
              nodeName: data[i].nodeName,
            });
          }
          this.form.taskPlanList.find((item) => item.uid === this.uid).node = nodes;
          this.form.taskPlanList.find((item) => item.uid === this.uid).nodeName =
            this.coverArray(nodes);
          this.form.taskPlanList.find((item) => item.uid === this.uid).nodeId = data[0].id;
        }
      }
    },

    //关闭选择弹窗
    closeChoose() {
      this.dialogTableVisible = false;
      this.$refs.pList.clearSel();
    },

    //处理展示
    coverArray(data) {
      if (data) {
        if (Array.isArray(data) && data.length > 0) {
          let str = '';
          for (var i = 0; i < data.length; i++) {
            str += data[i].nodeName + (i + 1 == data.length ? '' : '/');
          }
          return str;
        }
      } else {
        return '请点击选择';
      }
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

    //保存编辑
    save() {
      if (this.form.personList.length == 0) {
        this.$message.error('项目人员不能为空');
        return;
      }
      if (this.form.taskPlanList.length == 0) {
        this.$message.error('项目阶段不能为空');
        return;
      }
      console.log(this.form);
      Promise.all([
        ...this.form.taskPlanList.map((item, index) => this.validateForm(`nodeForm${index}`)),
        ...this.form.personList.map((item, index) => this.validateForm(`personForm${index}`)),
      ]).then((res) => {
        if (res) {
          // let data = { contId: this.form.id, plan: [] };
          // for (var i = 0; i < this.pnodes.length; i++) {
          //   data.plan.push({
          //     planName: this.pnodes[i].planName,
          //     planDesc: this.pnodes[i].planDesc,
          //     nodeId: this.pnodes[i].node.map((item2) => {
          //       return item2.nodeId;
          //     }),
          //   });
          // }

          this.$modal.loading('正在提交，请稍候...');
          planEdit(this.form)
            .then((res) => {
              this.$modal.closeLoading();
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
  },
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name && this.flagId != this.$route.query.id) {
        this.$tab.refreshPage();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/commonAE.scss';
</style>
