<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <!-- <div class="top">
          <svg-icon icon-class="back" style="cursor: hand" @click="goback" />
          任务单信息
        </div> -->
        <NavTop :val="['资料管理', '合同管理', '外委合同列表', '任务单信息']" />

        <div class="main">
          <div class="p0">
            <el-form :model="form" :inline="true" ref="form" class="info" @submit.native.prevent>
              <el-form-item label="合 同 编 号">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.contId"></InputTip>
                </div>
              </el-form-item>
              <el-form-item label="合 同 名 称" prop="contName">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.contName"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="项 目 类 型" prop="prjType">
                <div class="info">
                  <dict-tag :options="dict.type.project_type" :value="form.prjType" />
                </div>
              </el-form-item>

              <el-form-item label="签 署 类 型">
                <div class="info">
                  <dict-tag :options="dict.type.cont_type" :value="form.contType" />
                </div>
              </el-form-item>

              <el-form-item label="合同金额（元）" prop="totalAmount">
                <div class="info">{{ commonFun.amountConversion2(form.totalAmount) }}</div>
              </el-form-item>

              <el-form-item label="结算金额（元）" prop="settlementAmount">
                <div class="info">{{ commonFun.amountConversion2(form.settlementAmount) }}</div>
              </el-form-item>

              <el-form-item label="发 票 税 点 (%)" prop="taxPoints">
                <div class="info">
                  {{ form.taxPoints }}
                </div>
              </el-form-item>

              <el-form-item label="参 与 部 门" prop="deptIds">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.deptName"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="其 他 部 门">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.otherDept"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="合同负责人" prop="userId">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.leader"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="关联项目合同" prop="prjContId">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.prjContName"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="签 约 日 期" prop="contStartDate">
                <div class="info">
                  <!-- <span>{{ commonFun.coverTime(form.contStartDate) }}</span> -->
                  <span>{{ form.contStartDate }}</span>
                </div>
              </el-form-item>

              <el-form-item label="合 同 备 注" class="remark">
                <div class="info">
                  <el-input
                    type="textarea"
                    autosize
                    resize="none"
                    readonly
                    v-model="form.contTerm"
                  ></el-input>
                </div>
              </el-form-item>
              <el-form-item label="合 同 附 件" class="file">
                <FilePreview :data="form.annexFile" />
              </el-form-item>
            </el-form>
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
              <div class="m2mb"><i style="color: red">*</i>阶段</div>
              <!-- <div class="m2mb"><i style="color: red">*</i>阶段计划名称</div> -->
              <div class="m2mb" style="min-width: 500px">计划说明</div>
              <div class="m2mb"><i style="color: red">*</i>阶段比例(合计100.00%)</div>
              <div class="m2mb">关联付款节点</div>
              <div class="m2mb" style="max-width: 60px">操作</div>
            </div>

            <el-form
              v-for="(c, index) in form.taskPlanList"
              :key="index"
              :model="c"
              :ref="`refForm${index}`"
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
          <PaymentNodeList ref="pList" :id="flagId" :type="type" :Multiple="false" />
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import PaymentNodeList from '@/views/components/dialog/paymentNodelist';
import { planInfot, planEditt } from '@/api/data/contract';

export default {
  name: 'TaskSheetO', //外委任务单
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
        prjContId: null,
        telephone: null,
        addrArea: [], //注册
        mailArea: [], //邮寄
        prjArea: [], //项目
        addr: '',
        clientId: null,
        contType: null,
        contName: '',
        contStartDate: '',
        contTerm: '',
        contacts: '',
        email: '',
        phone: '',
        deptId: null,
        prjNumber: null,
        totalAmount: undefined,
        userId: null,
        annexFile: null, //置null 初始化[]导致回显失败原因未知
        taskPlanList: [],
      },

      paymentShow: true,
      dialogTableVisible: false,
      uid: '', //临时记录节点id
      type: 1, //合同类型
      ruleData: {
        planName: [{ required: true, message: '计划名称不能为空', trigger: 'blur' }],
        nodeName: [{ required: true, message: '节点不能为空', trigger: 'change' }],
        distribution: [{ required: true, message: '请输入比例', trigger: 'blur' }],
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
      if (this.$route.query.id) {
        this.flagId = this.$route.query.id;
        planInfot(this.$route.query.id).then((response) => {
          console.log(response);
          this.form = response.data;
          if (response.data) {
            this.form.prjArea = this.commonFun.coverRegin(
              response.data.prjAreaProvince,
              response.data.prjAreaCity,
              response.data.prjAreaRegion,
            );

            if (!response.data.taskPlanList) {
              this.form.taskPlanList = [];
            } else {
              this.form.taskPlanList = response.data.taskPlanList.map((c) => {
                return {
                  uid: Math.floor(Math.random() * 100) + 1, //临时随机id
                  id: c.id,
                  planName: c.planName,
                  planDesc: c.planDesc,
                  distribution: c.distribution,
                  phase: c.phase,
                  node: c.node,
                  nodeId: c.nodeId,
                  // nodeName: this.coverArray(c.node),
                  nodeName: c.nodeName,
                };
              });
            }
          }
        });
      }
    },

    goback() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
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
      if (this.form.taskPlanList.length == 0) {
        this.$message.error('项目阶段不能为空');
        return;
      }

      Promise.all([
        ...this.form.taskPlanList.map((item, index) => this.validateForm(`refForm${index}`)),
      ]).then((res) => {
        if (res) {
          let data = { contId: this.form.contId, taskPlanList: this.form.taskPlanList };
          // for (var i = 0; i < this.form.taskPlanList.length; i++) {
          //   data.taskPlanList.push({
          //     planName: this.form.taskPlanList[i].planName,
          //     planDesc: this.form.taskPlanList[i].planDesc,
          //     distribution: this.form.taskPlanList[i].distribution,
          //     nodeId: this.form.taskPlanList[i].node
          //       ? this.form.taskPlanList[i].node.map((item2) => {
          //           return item2.nodeId;
          //         })
          //       : null,
          //   });
          // }
          console.log(data);
          this.$modal.loading('正在提交，请稍候...');
          planEditt(data)
            .then((res) => {
              this.$modal.closeLoading();
              if (res.code == 200) {
                this.$message.success('提交成功');
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
        this.$tab.refreshPage();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/commonAE.scss';
</style>
