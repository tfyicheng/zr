<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['生产管理', '投标管理', '投标列表', '添加投标']" />

        <div class="main">
          <div class="p0">
            <el-form :model="form" :inline="true" ref="form" :rules="ruleData">
              <el-form-item label="投 标 编 号">
                <el-input
                  v-model="form.bidNumber"
                  placeholder="填入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="项 目 名 称" prop="prjName">
                <el-input
                  v-model="form.prjName"
                  placeholder="填入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="投 标 类 型" prop="bidType">
                <el-select v-model="form.bidType" placeholder="点击选择" clearable>
                  <el-option
                    v-for="item in dict.type.bid_type"
                    :key="item.value"
                    :label="item.label"
                    :value="Number(item.value)"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="投 标 区 域" prop="bidArea">
                <AddrCascader :data.sync="form.bidArea" />
              </el-form-item>

              <el-form-item label="招 标 方 式" prop="bidMethod">
                <el-select v-model="form.bidMethod" placeholder="点击选择" clearable>
                  <el-option
                    v-for="item in dict.type.bid_method"
                    :key="item.value"
                    :label="item.label"
                    :value="Number(item.value)"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="报 价 方 式" prop="quoteMethod">
                <el-select v-model="form.quoteMethod" placeholder="点击选择" clearable>
                  <el-option
                    v-for="item in dict.type.bid_quote_method"
                    :key="item.value"
                    :label="item.label"
                    :value="Number(item.value)"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="实价或下浮率">
                <el-input-number
                  v-model="form.realPriceRate"
                  :precision="2"
                  :controls="false"
                  :min="0"
                  placeholder="0.00"
                  clearable
                >
                </el-input-number>
              </el-form-item>

              <el-form-item label="报 价 备 注">
                <el-input
                  v-model="form.quoteRemark"
                  placeholder="填入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="报 名 时 间" prop="registrationTime">
                <el-date-picker
                  v-model="form.registrationTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  clearable
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item label="投 标 时 间" prop="bidTime">
                <el-date-picker
                  v-model="form.bidTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  clearable
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item label="开 标 地 点">
                <AddrCascader :data.sync="form.bidOpenArea" />
              </el-form-item>

              <el-form-item label="开标详细地址">
                <el-input
                  v-model="form.bidOpenAddr"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="是 否 中 标">
                <el-select v-model="form.bidWin" placeholder="点击选择" clearable>
                  <el-option
                    v-for="item in commonFun.bidStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="Number(item.value)"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="合 同 编 号">
                <el-input
                  v-model="form.contNumber"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="投 标 附 件" class="file">
                <FileChoose
                  ref="FileChoose"
                  :value.sync="form.bidAnnexFile"
                  :extra="1"
                  :autoUpload="false"
                />
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
              <el-form :model="form" :inline="true" ref="form2" :rules="ruleData">
                <el-form-item label="保证金类型">
                  <el-select v-model="form.guaranteeType" placeholder="点击选择" clearable>
                    <el-option
                      v-for="item in dict.type.guarantee_type"
                      :key="item.value"
                      :label="item.label"
                      :value="Number(item.value)"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="保证金额(万元)">
                  <el-input-number
                    v-model="form.guaranteeAmount"
                    :precision="4"
                    :controls="false"
                    :min="0"
                    placeholder="0.0000万元"
                    clearable
                  >
                  </el-input-number>
                </el-form-item>

                <el-form-item class="pline" :label="'保证金\n缴纳时间'">
                  <el-date-picker
                    v-model="form.guaranteeAmountPaymentTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    clearable
                  >
                  </el-date-picker>
                </el-form-item>

                <el-form-item class="pline" :label="'保证金\n退还时间'">
                  <el-date-picker
                    v-model="form.guaranteeAmountReturnTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    clearable
                  >
                  </el-date-picker>
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
              <el-form :model="form" :inline="true" ref="form3" :rules="ruleData">
                <el-form-item label="项 目 区 域" prop="pArea">
                  <AddrCascader :data.sync="form.pArea" />
                </el-form-item>

                <el-form-item label="工 程 等 级">
                  <el-select v-model="form.engineeringLevel" placeholder="点击选择">
                    <el-option
                      v-for="item in dict.type.engineering_level"
                      :key="item.value"
                      :label="item.label"
                      :value="Number(item.value)"
                      clearable
                    >
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="工 程 级 别">
                  <el-select v-model="form.engineeringLevelType" placeholder="点击选择">
                    <el-option
                      v-for="item in dict.type.engineering_level0"
                      :key="item.value"
                      :label="item.label"
                      :value="Number(item.value)"
                      clearable
                    >
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="项 目 规 模">
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

                <el-form-item label="总 投 资 (万元)">
                  <el-input-number
                    v-model="form.totalInvestment"
                    :precision="4"
                    :controls="false"
                    :min="0"
                    placeholder="0.0000万元"
                    clearable
                  >
                  </el-input-number>
                </el-form-item>

                <el-form-item class="pline" :label="'招 标 控 制 价\n(万元)'">
                  <el-input-number
                    v-model="form.controlPrice"
                    :precision="4"
                    :controls="false"
                    :min="0"
                    placeholder="0.0000万元"
                    clearable
                  >
                  </el-input-number>
                </el-form-item>

                <el-form-item class="plast" label="工 程 概 况">
                  <el-input
                    v-model="form.engineeringRemark"
                    placeholder="请输入"
                    :maxlength="commonFun.inputMax"
                    clearable
                  />
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
              <el-form :model="form" :inline="true" ref="form4" :rules="ruleData">
                <el-form-item label="单 位 名 称">
                  <ClieChoose :data.sync="form.clientId" :Multiple="false" @getClie="getClie" />
                </el-form-item>

                <el-form-item class="pline" :label="'统 一 社 会\n信 用 代 码'">
                  <el-input
                    v-model="form.clientCreditCode"
                    placeholder="请输入内容"
                    :maxlength="commonFun.inputMax"
                    clearable
                  ></el-input>
                </el-form-item>

                <el-form-item label="联 系 人">
                  <PersonChoose
                    :extra="form.clientId"
                    :value.sync="form.clientContacts"
                    :Multiple="false"
                    :type="2"
                    @getPerson="getPerson"
                  />
                </el-form-item>

                <el-form-item label="联 系 号 码">
                  <el-input
                    v-model="form.clientTelephone"
                    @input="$forceUpdate()"
                    @blur="(e) => (form.clientTelephone = e.target.value)"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    placeholder="请输入内容"
                    :maxlength="commonFun.inputMax"
                    clearable
                  ></el-input>
                </el-form-item>

                <el-form-item label="邮 寄 区 域">
                  <AddrCascader :data.sync="form.clientMailArea" />
                </el-form-item>

                <el-form-item label="邮寄详细地址">
                  <el-input
                    v-model="form.clientMailAddr"
                    placeholder="请输入内容"
                    :maxlength="commonFun.inputMax"
                    clearable
                  ></el-input>
                </el-form-item>

                <el-form-item label="注 册 区 域">
                  <AddrCascader :data.sync="form.clientAddrArea" />
                </el-form-item>

                <el-form-item label="注册详细地址">
                  <el-input
                    v-model="form.clientRegisterAddr"
                    placeholder="请输入内容"
                    :maxlength="commonFun.inputMax"
                    clearable
                  ></el-input>
                </el-form-item>

                <el-form-item label="开户行账号">
                  <el-input
                    v-model="form.clientBankAccount"
                    placeholder="请输入内容"
                    :maxlength="commonFun.inputMax"
                    clearable
                  ></el-input>
                </el-form-item>

                <el-form-item label="开户支行">
                  <el-input
                    v-model="form.clientBankName"
                    placeholder="请输入内容"
                    :maxlength="commonFun.inputMax"
                    clearable
                  ></el-input>
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
              <el-form :model="form" :inline="true" ref="form5" :rules="ruleData">
                <el-form-item label="代 理 名 称">
                  <ClieChoose :data.sync="form.agentId" :Multiple="false" @getClie="getClie2" />
                </el-form-item>

                <el-form-item class="pline" :label="'统 一 社 会\n信 用 代 码'">
                  <el-input
                    v-model="form.agentCreditCode"
                    placeholder="请输入内容"
                    :maxlength="commonFun.inputMax"
                    clearable
                  ></el-input>
                </el-form-item>

                <el-form-item label="联 系 人">
                  <PersonChoose
                    :extra="form.agentId"
                    :value.sync="form.agentContacts"
                    :Multiple="false"
                    :type="2"
                    @getPerson="getPerson2"
                  />
                </el-form-item>

                <el-form-item label="联 系 号 码">
                  <el-input
                    v-model="form.agentTelephone"
                    @input="$forceUpdate()"
                    @blur="(e) => (form.agentTelephone = e.target.value)"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    placeholder="请输入内容"
                    :maxlength="commonFun.inputMax"
                    clearable
                  ></el-input>
                </el-form-item>

                <el-form-item label="邮 寄 区 域">
                  <AddrCascader :data.sync="form.agentMailArea" />
                </el-form-item>

                <el-form-item label="邮寄详细地址">
                  <el-input
                    v-model="form.agentMailAddr"
                    placeholder="请输入内容"
                    :maxlength="commonFun.inputMax"
                    clearable
                  ></el-input>
                </el-form-item>

                <el-form-item label="注 册 区 域">
                  <AddrCascader :data.sync="form.agentAddrArea" />
                </el-form-item>

                <el-form-item label="注册详细地址">
                  <el-input
                    v-model="form.agentRegisterAddr"
                    placeholder="请输入内容"
                    :maxlength="commonFun.inputMax"
                    clearable
                  ></el-input>
                </el-form-item>

                <el-form-item label="开户行账号">
                  <el-input
                    v-model="form.agentBankAccount"
                    placeholder="请输入内容"
                    :maxlength="commonFun.inputMax"
                    clearable
                  ></el-input>
                </el-form-item>

                <el-form-item label="开户支行">
                  <el-input
                    v-model="form.agentBankName"
                    placeholder="请输入内容"
                    :maxlength="commonFun.inputMax"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>

        <div class="main2">
          <div class="m2top">
            负责人
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
            <div class="p0">
              <el-form :model="form" :inline="true" ref="form4" :rules="ruleData">
                <el-form-item label="项 目 负 责 人">
                  <PersonChoose :data.sync="form.prjLeader1" />
                </el-form-item>

                <el-form-item label="技 术 负 责 人">
                  <PersonChoose :data.sync="form.techLeader1" />
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
            <div class="m2mt" v-show="form.personList.length > 0">
              <div class="m2mb" style="max-width: 220px"><i style="color: red">*</i>投标角色</div>
              <div class="m2mb" style="max-width: 250px"><i style="color: red">*</i>负责人员</div>
              <div class="m2mb">负责内容</div>
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
                <div class="m2mb" style="max-width: 220px">
                  <el-form-item label="" prop="prjRole">
                    <el-select v-model="c.prjRole" placeholder="点击选择" clearable>
                      <el-option
                        v-for="item in dict.type.bid_role"
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
                    <PersonChoose :data.sync="c.userIds" :backVal="c.userName" />
                  </el-form-item>
                </div>

                <div class="m2mb">
                  <el-form-item label="">
                    <el-input v-model="c.jobContent" placeholder="请输入"></el-input>
                  </el-form-item>
                </div>

                <div class="m2mb" style="max-width: 60px">
                  <svg-icon icon-class="delete" style="cursor: hand" @click="delpm(c.uid)" />
                </div>
              </div>
            </el-form>

            <div>
              <el-button type="primary" @click="addPayments">添加角色</el-button>
            </div>
          </div>
        </div>

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </div>

        <!-- <el-dialog :visible.sync="dialogTableVisible">
          <PersonList v-show="this.ChooseOne == 'pList'" ref="pList" />
          <ClieList v-show="this.ChooseOne == 'cList'" :Multiple="false" ref="cList" />
          <CertList v-show="this.ChooseOne == 'certList'" ref="certList" />
        </el-dialog> -->
      </div>
    </div>
  </div>
</template>

<script>
import { bidAdd } from '@/api/data/produce';
import PersonList from '@/views/components/dialog/personlist';
import ClieList from '@/views/components/dialog/clieList';
import CertList from '@/views/components/dialog/certList';
import { custInfo } from '@/api/data/customer';
export default {
  name: 'BidManagementAdd', //添加投标
  components: { PersonList, ClieList, CertList },
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
  data() {
    return {
      form: {
        clientContacts: null,
        clientTelephone: null,
        agentContacts: null,
        agentTelephone: null,
        personList: [],
        agentBankAccount: null,
        agentBankName: null,
        agentCreditCode: null,
        agentRegisterAddr: null,
        agentMailAddr: null,
        clientBankAccount: null,
        clientBankName: null,
        clientCreditCode: null,
        clientRegisterAddr: null,
        clientMailAddr: null,
        prjLeader1: null,
        techLeader1: null,
      },
      infoShow: true,
      info2Show: true,
      info3Show: true,
      info4Show: true,
      info5Show: true,
      info6Show: true,
      tableData: [], //表格数据
      dialogTableVisible: false,
      fileview: '', //文件预览地址
      flag: '', //负责人按钮样式标记id
      ChooseOne: '', //当前弹窗目标
      ruleData: {
        prjName: [{ required: true, message: '项目名称不能为空', trigger: 'blur' }],
        bidType: [{ required: true, message: '请选择类型', trigger: 'change' }],
        bidMethod: [{ required: true, message: '请选择方式', trigger: 'change' }],
        quoteMethod: [{ required: true, message: '请选择方式', trigger: 'change' }],
        registrationTime: [{ required: true, message: '请选择日期', trigger: 'change' }],
        bidTime: [{ required: true, message: '请选择日期', trigger: 'change' }],
        bidAnnexFile: [{ required: true, message: '附件不能为空', trigger: ['blur', 'change'] }],
        pArea: [{ required: true, message: '请选择区域', trigger: ['blur', 'change'] }],
        bidArea: [{ required: true, message: '请选择区域', trigger: ['blur', 'change'] }],
        amount: [
          { required: true, message: '金额不能为空', trigger: 'blur' },
          {
            validator: function (rule, value, callback) {
              if (value) {
                callback();
              } else {
                let tip = '';

                if (value * 1 === 0) {
                  tip = '金额应大于0';
                }

                if (tip) {
                  callback(new Error(tip));
                } else {
                  callback();
                }
              }
            },
            trigger: ['blur', 'change'],
          },
        ],
        clientId: [{ required: true, message: '请选择客户', trigger: ['blur', 'change'] }],
        clientCreditCode: [{ required: true, message: '请输入信用代码', trigger: 'blur' }],
        clientContacts: [
          { required: true, message: '联系人不能为空', trigger: ['blur', 'change'] },
        ],
        clientTelephone: [
          { required: true, message: '请输入联系号码', trigger: ['blur', 'change'] },
        ],
        clientBankAccount: [{ required: true, message: '请输入开户行账号', trigger: 'blur' }],
        agentId: [{ required: true, message: '请选择客户', trigger: ['blur', 'change'] }],
        agentCreditCode: [{ required: true, message: '请输入信用代码', trigger: 'blur' }],
        agentContacts: [{ required: true, message: '联系人不能为空', trigger: ['blur', 'change'] }],
        agentTelephone: [
          { required: true, message: '请输入联系号码', trigger: ['blur', 'change'] },
        ],
        agentBankAccount: [{ required: true, message: '请输入开户行账号', trigger: 'blur' }],
        prjRole: [{ required: true, message: '角色不能为空', trigger: ['blur', 'change'] }],
        userIds: [{ required: true, message: '请选择负责人', trigger: ['blur', 'change'] }],
      },
    };
  },
  created() {},

  methods: {
    //获取客户联系人
    getPerson(data) {
      console.log(data);
      if (data) {
        this.form.clientContacts = data[0].name;
        this.form.clientTelephone = data[0].phone;
      }
    },

    //获取投标代理联系人
    getPerson2(data) {
      if (data) {
        this.form.agentContacts = data[0].name;
        this.form.agentTelephone = data[0].phone;
      }
    },

    //获取选择的客户信息
    getClie(data) {
      if (data && data.length > 0) {
        this.form.clientName = data[0].name;
        // this.form.clientRegisterAddr = data[0].addr;
        // this.form.clientMailAddr = data[0].mailAddr;
        this.getClieInfo(data[0].id);
      } else {
        this.form.clientName = null;
        this.form.clientRegisterAddr = null;
        this.form.clientMailAddr = null;
      }
    },

    //获取选择的投标代理信息
    getClie2(data) {
      if (data && data.length > 0) {
        this.form.agentName = data[0].name;
        // this.form.agentRegisterAddr = data[0].addr;
        // this.form.agentMailAddr = data[0].mailAddr;
        this.getClieInfo2(data[0].id);
      } else {
        this.form.agentName = null;
        this.form.agentRegisterAddr = null;
        this.form.agentMailAddr = null;
      }
    },

    //获取客户详细信息
    getClieInfo(id) {
      custInfo(id).then((response) => {
        this.form.clientBankAccount = response.data.bankAccount;
        this.form.clientBankName = response.data.bankName;
        this.form.clientCreditCode = response.data.creditCode;
        this.form.clientRegisterAddr = response.data.addr;
        this.form.clientMailAddr = response.data.mailAddr;
        if (response.data.mailAreaProvince != null) {
          this.form.clientMailArea = [
            'backVal',
            response.data.mailAreaProvince,
            response.data.mailAreaCity,
            response.data.mailAreaRegion,
          ];
        }
        if (response.data.addrAreaProvince != null) {
          this.form.clientAddrArea = [
            'backVal',
            response.data.addrAreaProvince,
            response.data.addrAreaCity,
            response.data.addrAreaRegion,
          ];
        }
      });
    },

    //获取投标代理详细信息
    getClieInfo2(id) {
      custInfo(id).then((response) => {
        this.form.agentBankAccount = response.data.bankAccount;
        this.form.agentBankName = response.data.bankName;
        this.form.agentCreditCode = response.data.creditCode;
        this.form.agentRegisterAddr = response.data.addr;
        this.form.agentMailAddr = response.data.mailAddr;
        if (response.data.mailAreaProvince != null) {
          this.form.agentMailArea = [
            'backVal',
            response.data.mailAreaProvince,
            response.data.mailAreaCity,
            response.data.mailAreaRegion,
          ];
        }
        if (response.data.addrAreaProvince != null) {
          this.form.agentAddrArea = [
            'backVal',
            response.data.addrAreaProvince,
            response.data.addrAreaCity,
            response.data.addrAreaRegion,
          ];
        }
      });
    },

    goback() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
    },

    //添加节点
    addPayments() {
      var nv = {
        uid: Math.floor(Math.random() * 100) + 1, //临时随机id
      };
      this.form.personList.push(nv);
    },

    //删除节点
    delpm(uid) {
      this.form.personList.splice(
        this.form.personList.findIndex((item) => item.uid === uid),
        1,
      );
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
      try {
        this.form.prjLeader = this.form.prjLeader1 ? this.form.prjLeader1.join(',') : null;
        this.form.techLeader = this.form.techLeader1 ? this.form.techLeader1.join(',') : null;
      } catch (error) {}

      console.log(this.form);

      if (this.form.personList.length == 0) {
        this.$message.error('投标人员不能为空');
        return;
      }

      if (this.$refs.FileChoose.fileList.length == 0) {
        this.$message.error('附件不能为空');
        return;
      }

      Promise.all([
        this.validateForm('form'),
        this.validateForm('form2'),
        this.validateForm('form3'),
        this.validateForm('form4'),
        this.validateForm('form5'),
        ...this.form.personList.map((item, index) => this.validateForm(`refForm1${index}`)),
      ]).then((res) => {
        if (res) {
          this.$refs.FileChoose.asyncUpFile().then((res) => {
            if (res) {
              this.commonFun.ConverAreaVal(this.form);
              this.$modal.loading('正在提交，请稍候...');
              bidAdd(this.form)
                .then((res) => {
                  console.log(res);
                  this.$modal.closeLoading();
                  if (res.code == 200) {
                    this.$message.success('添加成功');
                    this.$store.dispatch('tagsView/delView', this.$route);
                    this.$router.go(-1);
                  }
                })
                .catch((error) => {
                  this.$modal.closeLoading();
                });
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/commonAE.scss';
</style>
