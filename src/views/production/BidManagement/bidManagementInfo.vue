<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['生产管理', '投标管理', '投标列表', '投标详情']" />

        <div class="main">
          <div class="p0">
            <el-form :model="form" :inline="true" class="info" @submit.native.prevent>
              <el-form-item label="投 标 编 号">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.bidNumber"></InputTip>
                </div>
              </el-form-item>
              <el-form-item label="项 目 名 称" prop="contName">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.prjName"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="投 标 类 型" prop="prjSrc">
                <div class="info">
                  <dict-tag :options="dict.type.bid_type" :value="form.bidType" />
                </div>
              </el-form-item>

              <el-form-item label="投 标 区 域" prop="prjType">
                <div class="info">
                  {{ form.bidArea }}
                </div>
              </el-form-item>

              <el-form-item label="招 标 方 式">
                <div class="info">
                  <dict-tag :options="dict.type.bid_method" :value="form.bidMethod" />
                </div>
              </el-form-item>

              <el-form-item label="报 价 方 式">
                <div class="info">
                  <dict-tag :options="dict.type.bid_quote_method" :value="form.quoteMethod" />
                </div>
              </el-form-item>

              <el-form-item label="实价或下浮率">
                <div class="info">
                  <span>{{ form.realPriceRate }}</span>
                </div>
              </el-form-item>

              <el-form-item label="报 价 备 注">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.quoteRemark"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="报 名 时 间">
                <div class="info">
                  <!-- <span>{{ commonFun.coverTime(form.contStartDate) }}</span> -->
                  <span>{{ form.registrationTime }}</span>
                </div>
              </el-form-item>

              <el-form-item label="投 标 时 间">
                <div class="info">
                  <!-- <span>{{ commonFun.coverTime(form.contStartDate) }}</span> -->
                  <span>{{ form.bidTime }}</span>
                </div>
              </el-form-item>

              <el-form-item label="开 标 地 点">
                <div class="info">
                  <span>{{ form.bidOpenArea }}</span>
                </div>
              </el-form-item>

              <el-form-item label="是 否 中 标">
                <div class="info">
                  {{ form.bidWin != null ? commonFun.bidStatus[form.bidWin].label : '' }}
                </div>
              </el-form-item>

              <el-form-item label="合 同 编 号">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.contNumber"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="投 标 附 件" class="file">
                <FilePreview :data="form.bidAnnexFile" />
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div class="main2">
          <div class="m2top">
            保证金
            <div class="m2topm">
              <span v-show="infoShow" @click="infoShow ? (infoShow = false) : (infoShow = true)"
                >收起 <i class="el-icon-caret-top"></i>
              </span>
              <span v-show="!infoShow" @click="infoShow ? (infoShow = false) : (infoShow = true)"
                >展开 <i class="el-icon-caret-bottom"></i>
              </span>
            </div>
          </div>
          <div class="m2main" v-show="infoShow">
            <div class="p0">
              <el-form :model="form" :inline="true" ref="form2" class="info">
                <el-form-item label="保证金类型">
                  <div class="info">
                    <dict-tag :options="dict.type.guarantee_type" :value="form.guaranteeType" />
                  </div>
                </el-form-item>

                <el-form-item label="保证金额 (万元)" prop="totalAmount">
                  <div class="info">{{ commonFun.amountConversion2(form.guaranteeAmount) }}</div>
                </el-form-item>

                <el-form-item class="pline" :label="'保证金\n缴纳时间'">
                  <div class="info">
                    <!-- <span>{{ commonFun.coverTime(form.contStartDate) }}</span> -->
                    <span>{{ form.guaranteeAmountPaymentTime }}</span>
                  </div>
                </el-form-item>

                <el-form-item class="pline" :label="'保证金\n退还时间'">
                  <div class="info">
                    <!-- <span>{{ commonFun.coverTime(form.contStartDate) }}</span> -->
                    <span>{{ form.guaranteeAmountReturnTime }}</span>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>

        <div class="main2">
          <div class="m2top">
            工程概况
            <div class="m2topm">
              <span v-show="info2Show" @click="info2Show ? (info2Show = false) : (info2Show = true)"
                >收起 <i class="el-icon-caret-top"></i>
              </span>
              <span
                v-show="!info2Show"
                @click="info2Show ? (info2Show = false) : (info2Show = true)"
                >展开 <i class="el-icon-caret-bottom"></i>
              </span>
            </div>
          </div>
          <div class="m2main" v-show="info2Show">
            <div class="p0">
              <el-form :model="form" :inline="true" class="info">
                <el-form-item label="项 目 区 域" prop="prjArea">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="form.pArea"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item label="工 程 等 级">
                  <div class="info">
                    <dict-tag
                      :options="dict.type.engineering_level"
                      :value="form.engineeringLevel"
                    />
                  </div>
                </el-form-item>

                <el-form-item label="工 程 级 别">
                  <div class="info">
                    <dict-tag
                      :options="dict.type.engineering_level0"
                      :value="form.engineeringLevelType"
                    />
                  </div>
                </el-form-item>

                <el-form-item label="项 目 规 模">
                  <div class="info">
                    <dict-tag :options="dict.type.project_scale" :value="form.prjScale" />
                  </div>
                </el-form-item>

                <el-form-item label="总投资 (万元)">
                  <div class="info">{{ commonFun.amountConversion2(form.totalInvestment) }}</div>
                </el-form-item>

                <el-form-item class="pline" :label="'招 标 控 制 价\n(万元)'">
                  <div class="info">{{ commonFun.amountConversion2(form.controlPrice) }}</div>
                </el-form-item>

                <el-form-item class="plast" label="工 程 概 况">
                  <div class="info">
                    <InputTip :width="inputTipWidth * 2" :text="form.engineeringRemark"></InputTip>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>

        <div class="main2">
          <div class="m2top">
            业主信息/协作单位信息
            <div class="m2topm">
              <span v-show="info3Show" @click="info3Show ? (info3Show = false) : (info3Show = true)"
                >收起 <i class="el-icon-caret-top"></i>
              </span>
              <span
                v-show="!info3Show"
                @click="info3Show ? (info3Show = false) : (info3Show = true)"
                >展开 <i class="el-icon-caret-bottom"></i>
              </span>
            </div>
          </div>
          <div class="m2main" v-show="info3Show">
            <div class="p0">
              <el-form :model="form" :inline="true" class="info">
                <el-form-item label="单 位 名 称">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="form.clientName"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item class="pline" :label="'统 一 社 会\n信 用 代 码'" prop="creditCode">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="form.clientCreditCode"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item label="联 系 人" prop="contacts">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="form.clientContacts"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item label="联 系 号 码" prop="telephone">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="form.clientTelephone"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item label="邮 寄 地 址" class="plast">
                  <div class="info">
                    <InputTip :width="inputTipWidth * 2" :text="form.clientMailArea"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item label="注 册 地 址" class="plast">
                  <div class="info">
                    <InputTip :width="inputTipWidth * 2" :text="form.clientAddrArea"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item label="开户行账号" prop="bankAccount">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="form.clientBankAccount"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item label="开户支行">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="form.clientBankName"></InputTip>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>

        <div class="main2">
          <div class="m2top">
            招标代理信息
            <div class="m2topm">
              <span v-show="info4Show" @click="info4Show ? (info4Show = false) : (info4Show = true)"
                >收起 <i class="el-icon-caret-top"></i>
              </span>
              <span
                v-show="!info4Show"
                @click="info4Show ? (info4Show = false) : (info4Show = true)"
                >展开 <i class="el-icon-caret-bottom"></i>
              </span>
            </div>
          </div>
          <div class="m2main" v-show="info4Show">
            <div class="p0">
              <el-form :model="form" :inline="true" class="info">
                <el-form-item label="代 理 名 称">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="form.agentName"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item class="pline" :label="'统 一 社 会\n信 用 代 码'" prop="creditCode">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="form.agentCreditCode"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item label="联 系 人" prop="contacts">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="form.agentContacts"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item label="联 系 号 码" prop="telephone">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="form.agentTelephone"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item label="邮 寄 地 址" class="plast">
                  <div class="info">
                    <InputTip :width="inputTipWidth * 2" :text="form.agentMailArea"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item label="注 册 地 址" class="plast">
                  <div class="info">
                    <InputTip :width="inputTipWidth * 2" :text="form.agentAddrArea"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item label="开户行账号" prop="bankAccount">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="form.agentBankAccount"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item label="开户支行">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="form.agentBankName"></InputTip>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>

        <div class="main2">
          <div class="m2top">
            负责人
            <div class="m2topm">
              <span v-show="info7Show" @click="info7Show ? (info7Show = false) : (info7Show = true)"
                >收起 <i class="el-icon-caret-top"></i>
              </span>
              <span
                v-show="!info7Show"
                @click="info7Show ? (info7Show = false) : (info7Show = true)"
                >展开 <i class="el-icon-caret-bottom"></i>
              </span>
            </div>
          </div>
          <div class="m2main" v-show="info7Show">
            <div class="p0">
              <el-form :model="form" :inline="true" class="info">
                <el-form-item label="项 目 负 责 人">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="form.prjLeaderName"></InputTip>
                  </div>
                </el-form-item>

                <el-form-item label="技 术 负 责 人">
                  <div class="info">
                    <InputTip :width="inputTipWidth" :text="form.techLeaderName"></InputTip>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>

        <div class="main2">
          <div class="m2top">
            投标人员
            <div class="m2topm">
              <span v-show="info5Show" @click="info5Show ? (info5Show = false) : (info5Show = true)"
                >收起 <i class="el-icon-caret-top"></i>
              </span>
              <span
                v-show="!info5Show"
                @click="info5Show ? (info5Show = false) : (info5Show = true)"
                >展开 <i class="el-icon-caret-bottom"></i>
              </span>
            </div>
          </div>
          <div class="m2main" v-show="info5Show">
            <el-table
              v-show="tableData.length > 0"
              :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
              :cell-style="{ textAlign: 'left' }"
              :data="tableData"
              max-height="560"
              ref="multipleTable"
              row-key="id"
            >
              <el-table-column prop="prjRole" label="投标角色">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.bid_role"
                    :value="scope.row.prjRole"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="userNames" label="负责人员"> </el-table-column>
              <el-table-column prop="jobContent" label="负责内容"> </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="main2">
          <div class="m2top">
            投标过程
            <div class="m2topm">
              <span v-show="info6Show" @click="info6Show ? (info6Show = false) : (info6Show = true)"
                >收起 <i class="el-icon-caret-top"></i>
              </span>
              <span
                v-show="!info6Show"
                @click="info6Show ? (info6Show = false) : (info6Show = true)"
                >展开 <i class="el-icon-caret-bottom"></i>
              </span>
            </div>
          </div>
          <div class="m2main" v-show="info6Show">
            <div class="bidp">
              <el-timeline style="width: 600px; padding: 5px">
                <el-timeline-item
                  v-for="(activity, index) in form.process"
                  :key="index"
                  :icon="activity.icon"
                  :type="activity.type"
                  :color="activity.color"
                  :size="activity.size"
                  :timestamp="activity.processTime"
                  placement="top"
                >
                  <!--   -->
                  <el-link type="primary" @click="bidPE(activity)">编辑</el-link>
                  <span style="width: 10px; display: inline-block"></span>
                  <el-link type="danger" @click="bidPD(activity)">删除</el-link>
                  <el-card>
                    <h4>
                      {{ activity.processName }}
                    </h4>
                    <p>{{ activity.processDesc }}</p>
                    <div>
                      <ul>
                        <li
                          @click="filePreview(c.annexId)"
                          style="cursor: hand"
                          v-for="c in activity.files"
                          :key="c.index"
                        >
                          <svg-icon icon-class="file" />
                          <a style="cursor: hand; color: #409eff"> {{ c.originalName }}</a>
                        </li>
                      </ul>
                    </div>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
          </div>
        </div>

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" v-show="!form.canDown" @click="exportApply">申请导出</el-button>
          <el-button type="warning" v-show="form.canDown" @click="Output">导出</el-button>
          <el-button type="primary" @click="addbidP" style="width: auto">添加投标过程</el-button>
          <el-button type="primary" @click="handleEdit">编辑</el-button>
        </div>

        <el-dialog :visible.sync="open" width="700px" append-to-body>
          <span class="dialogt">投标过程</span>
          <el-form ref="form" :model="form2" :rules="ruleData" label-width="120px">
            <el-row>
              <el-col :span="11">
                <el-form-item :label="'投标/报价过程'" prop="processName">
                  <el-input
                    v-model="form2.processName"
                    placeholder="请输入内容"
                    :maxlength="commonFun.inputMax"
                    @input="$forceUpdate()"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="过程时间" prop="processTime">
                  <el-date-picker
                    v-model="form2.processTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    clearable
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row style="height: 102px">
              <el-col :span="23">
                <el-form-item label="过程描述">
                  <el-input
                    v-model="form2.processDesc"
                    type="textarea"
                    placeholder="请输入内容"
                    @input="$forceUpdate()"
                    maxlength="250"
                    show-word-limit
                    resize="none"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="23">
                <el-form-item label="过程附件">
                  <FileChoose
                    ref="FileChoose"
                    :value.sync="form2.files"
                    :extra="1"
                    :autoUpload="false"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog>

        <el-dialog :visible.sync="dialogTableVisible" class="iframe" v-el-drag-dialog>
          <iframe width="100%" height="100%" :src="fileview"></iframe>
        </el-dialog>

        <ApplyDown
          ref="ApplyDown"
          :downSourceName="form.prjName"
          :downSourceId="form.id"
          :type="2"
        />
        <BeforeDown ref="BeforeDown" :type="2" />
      </div>
    </div>
  </div>
</template>

<script>
import ApplyDown from '@/views/components/dialog/applyDown';
import { bidExport } from '@/api/data/file';
import { bidInfo, bidProcessEdit } from '@/api/data/produce';
export default {
  name: 'BidManagementInfo', //投标信息
  dicts: [
    'certificate_category',
    'cert_type',
    'cont_type',
    'project_scale',
    'project_type',
    'project_src',
    'project_role',
    'engineering_level',
    'engineering_level0',
    'bid_type',
    'bid_method',
    'bid_quote_method',
    'bid_role',
    'guarantee_type',
  ],
  components: { ApplyDown },
  data() {
    return {
      form: {
        bidPersonReq: [],
        bidCertReq: [],
        process: [],
      },
      form2: { processName: null, processTime: null, processDesc: null, files: [] },
      infoShow: true,
      info2Show: true,
      info3Show: true,
      info4Show: true,
      info5Show: true,
      info6Show: true,
      info7Show: true,
      // 是否显示弹出层
      open: false,
      tableData: [], //表格数据
      dialogTableVisible: false,
      fileview: '', //文件预览地址
      inputTipWidth: this.commonFun.inputTipWidth,
      ruleData: {
        processName: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        processTime: [{ required: true, message: '请选择时间', trigger: ['blur', 'change'] }],
      },
      flagId: null,
      bidstatue: null, //投标表单状态
    };
  },
  created() {
    this.getInfo();
  },

  methods: {
    getInfo() {
      if (this.$route.query.id) {
        this.flagId = this.$route.query.id;
        bidInfo(this.$route.query.id).then((response) => {
          console.log(response);
          this.form = response.data;
          this.tableData = response.data.person;
          this.commonFun.ShowAreaVal(this.form, response.data);
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

    //附件判断预览
    filePreview(val) {
      this.fileview = 'about:blank';
      setTimeout(() => {
        this.fileview = process.env.VUE_APP_BASE_API + '/file/preview/' + val;
      }, 200);

      this.dialogTableVisible = true;
    },

    //申请导出
    exportApply() {
      this.$refs.ApplyDown.show();
    },

    //下载/导出
    Output() {
      // bidExport(this.form.id);
      this.$refs.BeforeDown.downSourceId = this.form.id;
      this.$refs.BeforeDown.show();
    },

    //编辑
    handleEdit() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.push({ path: '/production-d/bidManagementEdit', query: { id: this.form.id } });
    },

    //添加投标过程
    addbidP() {
      this.form2 = {
        processName: null,
        processTime: null,
        processDesc: null,
        files: [],
      };

      this.open = true;
      this.bidstatue = 1;
      this.$refs.FileChoose.clearn();
    },

    //编辑投标过程
    bidPE(val) {
      this.form2 = val;
      this.open = true;
      this.bidstatue = 0;
    },

    //删除投标过程
    async bidPD(c) {
      if (!(await this.commonFun.sureDialog())) {
        return;
      }
      this.form.process.splice(
        this.form.process.findIndex(
          (item) =>
            item.processName === c.processName &&
            item.processTime === c.processTime &&
            item.processDesc === c.processDesc,
        ),
        1,
      );
      this.savebidProcess();
    },

    bidPD2(c) {
      this.form.process.splice(
        this.form.process.findIndex(
          (item) =>
            item.processName === c.processName &&
            item.processTime === c.processTime &&
            item.processDesc === c.processDesc,
        ),
        1,
      );
    },

    //取消表单
    cancel() {
      this.open = false;
      this.form2 = {
        processName: null,
        processTime: null,
        processDesc: null,
        files: [],
      };
    },

    //保存表单
    submitForm() {
      console.log(this.form2);
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$refs.FileChoose.asyncUpFile().then((res) => {
            if (res) {
              this.savebidProcess();
            }
          });
        }
      });
    },

    //保存投标过程
    savebidProcess() {
      let newval = { bidId: this.form.id, process: [] };
      newval.process = this.form.process;
      if (this.bidstatue != 0) {
        if (this.form2.processName != null) {
          newval.process.push(this.form2);
        }
      }

      newval.process = newval.process.map((c) => {
        return {
          processName: c.processName,
          processTime: c.processTime,
          processDesc: c.processDesc,
          files: c.files.map((cc) => {
            return cc.annexId;
          }),
        };
      });
      this.$modal.loading('正在提交，请稍候...');
      bidProcessEdit(newval)
        .then((res) => {
          this.$modal.closeLoading();
          if (res.code == 200) {
            this.$message.success('提交成功');
            //  this.form.process.push(this.form2);
            this.cancel();
          } else {
            this.bidPD2(this.form2);
          }
        })
        .catch((error) => {
          this.$modal.closeLoading();
          this.bidPD2(this.form2);
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
@import '@/assets/styles/commonAE.scss';
.bidp {
  overflow: auto;
  max-height: 500px;
  margin: 5px;
  .el-link {
    right: -490px;
    top: -20px;
  }
  h4 {
    margin-top: 0px;
    font-size: 15px;
    font-weight: bold;
  }
  ul {
    // max-height: 150px;
    overflow: auto;
    list-style-type: none;
    margin: 0px 5px;
    padding: 0px;

    li {
      margin-bottom: 5px;
    }
  }
}
.el-dialog__wrapper {
  //局部弹窗样式修改
  top: 20px;
  .el-dialog .dialogt {
    margin: 10px 10px;
    height: 20px;
    font-size: 20px;
    display: block;
  }
  .el-dialog .dialogt::before {
    content: '\00a0 ';
    border-left: 3px solid #4da0ff;
    margin-right: 5px;
  }

  .el-form {
    margin-top: 30px;
    .el-form-item {
      .el-textarea {
        max-height: 120px !important;
        border-radius: 4px;
        border: 1px;
        ::v-deep textarea {
          height: 120px;
          max-height: 120px !important;
        }
      }
    }
  }
}
</style>
