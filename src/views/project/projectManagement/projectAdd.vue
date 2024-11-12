<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['项目管理', '项目管理统计', '项目列表', '添加项目信息']" />

        <div class="main">
          <div class="p0">
            <el-form :model="form" :inline="true" ref="form" :rules="ruleData">
              <el-form-item label="项 目 名 称" prop="prjName">
                <el-input
                  v-model="form.prjName"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item class="pline" :label="'关联项目\n合同编号'">
                <ContChoose
                  :data.sync="form.contId"
                  :backVal="form.contName"
                  :Multiple="false"
                  :type="0"
                  @getCont="getCont"
                />
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

              <el-form-item label="工 程 类 别" prop="engineeringType">
                <el-select v-model="form.engineeringType" placeholder="点击选择" clearable>
                  <el-option
                    v-for="item in dict.type.engineering_Type"
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

              <el-form-item class="pline" :label="'计划开始\n日期'" prop="startDate">
                <el-date-picker
                  v-model="form.startDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  clearable
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item class="pline" :label="'计划结束\n日期'" prop="deliveryDate">
                <el-date-picker
                  v-model="form.deliveryDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  clearable
                >
                </el-date-picker>
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

        <div class="main2">
          <div class="m2top">
            客户信息
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
                <el-form-item label="客 户 名 称">
                  <ClieChoose
                    :data.sync="form.clientId"
                    :backVal="form.clientName"
                    :Multiple="false"
                    @getClie="getClie"
                  />
                </el-form-item>

                <el-form-item class="pline" :label="'统 一 社 会\n信 用 代 码'">
                  <el-input
                    v-model="form.creditCode"
                    placeholder="请输入内容"
                    :maxlength="commonFun.inputMax"
                    clearable
                  ></el-input>
                </el-form-item>

                <el-form-item label="联 系 人">
                  <PersonChoose
                    :extra="form.clientId"
                    :value.sync="form.contacts"
                    :Multiple="false"
                    :type="2"
                    @getPerson="getPerson"
                  />
                </el-form-item>

                <el-form-item label="联 系 号 码">
                  <el-input
                    v-model="form.telephone"
                    @input="$forceUpdate()"
                    @blur="(e) => (form.telephone = e.target.value)"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    placeholder="请输入内容"
                    :maxlength="commonFun.inputMax"
                    clearable
                  ></el-input>
                </el-form-item>

                <el-form-item label="邮 寄 区 域">
                  <AddrCascader :data.sync="form.mailArea" />
                </el-form-item>

                <el-form-item label="邮寄详细地址">
                  <el-input
                    v-model="form.mailAddr"
                    placeholder="请输入内容"
                    :maxlength="commonFun.inputMax"
                    clearable
                  ></el-input>
                </el-form-item>

                <el-form-item label="注 册 区 域">
                  <AddrCascader :data.sync="form.addrArea" />
                </el-form-item>

                <el-form-item label="注册详细地址">
                  <el-input
                    v-model="form.addr"
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
              <div class="m2mb" style="max-width: 220px"><i style="color: red">*</i>项目角色</div>
              <div class="m2mb" style="max-width: 250px"><i style="color: red">*</i>参与人员</div>
              <div class="m2mb">工作内容</div>
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

        <div class="main2">
          <div class="m2top">
            项目阶段设置
            <div class="m2topm">
              <span
                v-show="paymentShow2"
                @click="paymentShow2 ? (paymentShow2 = false) : (paymentShow2 = true)"
                >收起 <i class="el-icon-caret-top"></i>
              </span>
              <span
                v-show="!paymentShow2"
                @click="paymentShow2 ? (paymentShow2 = false) : (paymentShow2 = true)"
                >展开 <i class="el-icon-caret-bottom"></i>
              </span>
            </div>
          </div>
          <div class="m2main" v-show="paymentShow2">
            <div class="m2mt" v-show="form.taskPlanList.length">
              <!-- <div class="m2mb"><i style="color: red">*</i>阶段计划名称</div> -->
              <div class="m2mb"><i style="color: red">*</i>阶段</div>
              <div class="m2mb"><i style="color: red; visibility: hidden">*</i>计划说明</div>
              <div class="m2mb"><i style="color: red">*</i>阶段比例</div>
              <div class="m2mb"><i style="color: red">*</i>计划开始时间</div>
              <div class="m2mb"><i style="color: red">*</i>计划结束时间</div>
              <div class="m2mb" style="min-width: 240px">关联收款节点</div>
              <div class="m2mb" style="max-width: 60px">操作</div>
            </div>

            <el-form
              v-for="(c, index) in form.taskPlanList"
              :key="index"
              :model="c"
              :ref="`refForm2${index}`"
              :rules="ruleData"
            >
              <div class="m2mt">
                <div class="m2mb" v-show="false">
                  <el-form-item label="">
                    <el-input
                      v-model="c.planName"
                      placeholder="请输入内容"
                      :maxlength="commonFun.inputMax"
                      clearable
                    ></el-input>
                  </el-form-item>
                </div>

                <div class="m2mb">
                  <el-form-item label="" prop="phase">
                    <el-select v-model="c.phase" placeholder="点击选择" clearable>
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

                <div class="m2mb">
                  <el-form-item label="">
                    <el-input
                      v-model="c.planDesc"
                      placeholder="请输入内容"
                      :maxlength="commonFun.inputMax"
                      clearable
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
                  <el-form-item label="" prop="startDate">
                    <el-date-picker
                      style="width: auto"
                      v-model="c.startDate"
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      clearable
                    >
                    </el-date-picker>
                  </el-form-item>
                </div>

                <div class="m2mb">
                  <el-form-item label="" prop="endDate">
                    <el-date-picker
                      style="width: auto"
                      v-model="c.endDate"
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      clearable
                    >
                    </el-date-picker>
                  </el-form-item>
                </div>

                <div class="m2mb">
                  <el-form-item label="">
                    <!-- <el-input
                      v-model="c.nodeName"
                      @input="$forceUpdate()"
                      @click.native="choosePerson(c.uid)"
                      readonly
                      ><svg-icon
                        slot="suffix"
                        icon-class="choose"
                        style="cursor: pointer; margin-right: 10px; width: 14px; height: 14px"
                      />
                    </el-input> -->
                    <NodeChoose
                      :data.sync="c.nodeId"
                      :id="form.contId"
                      :backVal.sync="c.nodeName"
                      :Multiple="false"
                      :type="0"
                      @getNode="getNode($event, c.uid)"
                    />
                  </el-form-item>
                </div>
                <div class="m2mb" style="max-width: 60px">
                  <svg-icon icon-class="delete" style="cursor: hand" @click="delpm2(c.uid)" />
                </div>
              </div>
            </el-form>

            <div>
              <el-button type="primary" @click="addPayments2">添加阶段</el-button>
              <span style="color: #666666">(阶段比例合计100.00%)</span>
            </div>
          </div>
        </div>

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PersonList from '@/views/components/dialog/personlist';
import ClieList from '@/views/components/dialog/clieList';
import BidList from '@/views/components/dialog/bidlist';
import { projAdd } from '@/api/data/project';
import { getCity, getProvince } from '@/api/system/user';
import { planInfo, projectContInfo } from '@/api/data/contract';
import { custInfo } from '@/api/data/customer';
export default {
  name: 'ProjectAdd', //添加项目
  dicts: [
    'project_type',
    'project_scale',
    'project_role',
    'engineering_level0',
    'project_plan',
    'engineering_level',
    'engineering_Type',
  ],
  components: { PersonList, BidList, ClieList },
  data() {
    return {
      form: {
        bidNumber: null,
        clientName: null,
        phone: null,
        personList: [],
        taskPlanList: [],
        creditCode: null,
        addr: null,
        mailAddr: null,
        contacts: null,
        telephone: null,
        startDate: null,
        deliveryDate: null,
      },

      paymentShow: true,
      paymentShow2: true,
      infoShow: true,
      dialogTableVisible: false,
      ChooseOne: '', //当前弹窗目标
      ruleData: {
        prjName: [{ required: true, message: '项目名称不能为空', trigger: 'blur' }],
        prjType: [{ required: true, message: '项目类型不能为空', trigger: 'change' }],
        scaleUnit: [{ required: true, message: '项目规模不能为空', trigger: 'change' }],
        prjScale: [{ required: true, message: '项目规模不能为空', trigger: 'change' }],
        startDate: [{ required: true, message: '请选择开始日期', trigger: 'change' }],
        deliveryDate: [{ required: true, message: '请选择交付日期', trigger: 'change' }],
        bidNumber: [{ required: true, message: '请选择投标编号', trigger: 'change' }],
        clientName: [{ required: true, message: '请选择客户', trigger: ['blur', 'change'] }],
        contacts: [{ required: true, message: '联系人不能为空', trigger: 'blur' }],
        prjArea: [{ required: true, message: '请选择区域', trigger: ['blur', 'change'] }],
        engineeringLevel: [
          { required: true, message: '工程等级不能为空', trigger: ['blur', 'change'] },
        ],
        engineeringType: [
          { required: true, message: '工程类别不能为空', trigger: ['blur', 'change'] },
        ],
        engineeringLevelType: [
          { required: true, message: '工程级别不能为空', trigger: ['blur', 'change'] },
        ],
        phone: [
          { required: true, message: '请输入号码', trigger: 'blur' },
          // {
          //   pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
          //   message: '请输入正确的手机号码',
          //   trigger: 'blur',
          // },
        ],
        distribution: [
          { required: true, message: '阶段比例不能为空', trigger: ['blur', 'change'] },
        ],
        prjRole: [{ required: true, message: '请选择项目角色', trigger: 'change' }],
        planName: [{ required: true, message: '计划名称不能为空', trigger: 'blur' }],
        planDesc: [{ required: true, message: '计划描述不能为空', trigger: 'blur' }],
        weight: [{ required: true, message: '权重不能为空', trigger: 'blur' }],
        phase: [{ required: true, message: '请选择阶段', trigger: 'change' }],
        startDate: [{ required: true, message: '请选择计划开始时间', trigger: 'change' }],
        endDate: [{ required: true, message: '请选择计划结束时间', trigger: 'change' }],
        clientId: [{ required: true, message: '请选择客户', trigger: ['blur', 'change'] }],
        creditCode: [{ required: true, message: '请输入信用代码', trigger: 'blur' }],
        contacts: [{ required: true, message: '联系人不能为空', trigger: ['blur', 'change'] }],
        telephone: [{ required: true, message: '请输入联系号码', trigger: ['blur', 'change'] }],
        userIds: [{ required: true, message: '联系人不能为空', trigger: ['blur', 'change'] }],
      },
    };
  },
  created() {},
  methods: {
    //查询任务单信息
    getTask(id) {
      if (id) {
        planInfo(id).then((response) => {
          //console.log(response);
          // this.form = response.data;
          this.form.startDate = response.data.prjStartTime;
          this.form.deliveryDate = response.data.prjEndTime;
          if (response.data) {
            if (!response.data.personList) {
              this.form.personList = [];
            } else {
              this.form.personList = response.data.personList.map((c) => {
                return {
                  uid: Math.floor(Math.random() * 100) + 1,
                  userIds: c.userId.split(','),
                  userId: c.userId,
                  userName: c.userName,
                  prjRole: c.prjRole,
                  jobContent: c.jobContent,
                };
              });
            }
            if (!response.data.taskPlanList) {
              this.form.taskPlanList = [];
            } else {
              this.form.taskPlanList = response.data.taskPlanList.map((c) => {
                return {
                  uid: Math.floor(Math.random() * 100) + 1,
                  planName: c.planName,
                  planDesc: c.planDesc,
                  distribution: c.distribution,
                  // phase:
                  //   c.phase == null
                  //     ? this.isNumeric(c.planName)
                  //       ? Number(c.planName)
                  //       : c.planName
                  //     : c.phase,
                  phase: c.phase,
                  nodeId: c.nodeId,
                  nodeName: c.nodeName == null ? '' : c.nodeName,
                };
              });
            }
          }
        });
      }
    },

    //判断字符串是否为纯数字
    isNumeric(str) {
      return /^\d+$/.test(str);
    },

    //获取合同信息
    getInfo(id) {
      if (id) {
        projectContInfo(id).then((response) => {
          //console.log(response);
          this.form = { ...this.form, ...response.data }; //直接赋值导致数据需要强制更新，解构跟Object.assign一样是合并对象，注意原对象不可缺
          //addrArea: [],//注册
          // mailArea: [],//邮寄
          // prjArea: [],//项目
          //区域数据回传
          this.commonFun.backAreaVal(this.form, response.data);
          // this.form.addrArea = [
          //   'backVal',
          //   response.data.addrAreaProvince,
          //   response.data.addrAreaCity,
          //   response.data.addrAreaRegion,
          // ];
          // this.form.mailArea = [
          //   'backVal',
          //   response.data.mailAreaProvince,
          //   response.data.mailAreaCity,
          //   response.data.mailAreaRegion,
          // ];
          // this.form.prjArea = [
          //   'backVal',
          //   response.data.prjAreaProvince,
          //   response.data.prjAreaCity,
          //   response.data.prjAreaRegion,
          // ];

          this.getTask(id);
        });
      }
    },

    //获取节点信息
    getNode(data, uid) {
      if (data) {
        if (Array.isArray(data) && data.length > 0) {
          let nodes = [];
          // for (var i = 0; i < data.length; i++) {
          //   nodes.push({
          //     nodeId: data[i].id,
          //     nodeName: data[i].nodeName,
          //   });
          // }
          // this.form.taskPlanList.find((item) => item.uid === uid).node = nodes;
          // this.form.taskPlanList.find((item) => item.uid === uid).nodeName = this.coverArray(nodes);
        }
      } else {
        this.form.taskPlanList.find((item) => item.uid === uid).nodeId = null;
      }
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

    //获取合同信息
    getCont(data) {
      if (data && data.length > 0) {
        this.form.contName = data[0].contName;
        this.form.contNumber = data[0].contNumber;
        this.form.contId = data[0].id;
        this.form.taskPlanList = [];
        this.form.personList = [];
        this.getInfo(data[0].id);
      } else {
        this.form.contId = null;
        this.form.contName = null;
        this.form.contNumber = null;
        this.form.taskPlanList = [];
        this.form.personList = [];
        // this.form.settlementAmount = 0; //结算金额取自合同
        //  this.form.cumulativeAmount = 0; //累计合同取接口实时计算
      }
    },

    //获取客户联系人
    getPerson(data) {
      if (data) {
        this.form.contacts = data[0].name;
        this.form.telephone = data[0].phone;
      }
    },

    //获取选择的客户信息
    getClie(data) {
      if (data && data.length > 0) {
        this.form.clientName = data[0].name;
        // this.form.addr = data[0].addr;
        // this.form.mailAddr = data[0].mailAddr;
        this.getClieInfo(data[0].id);
      } else {
        this.form.clientName = null;
        this.form.addr = null;
        this.form.mailAddr = null;
      }
    },

    //获取客户详细信息
    getClieInfo(id) {
      custInfo(id).then((response) => {
        this.form.creditCode = response.data.creditCode;
        this.form.addr = response.data.addr;
        this.form.mailAddr = response.data.mailAddr;
        if (response.data.mailAreaProvince != null) {
          this.form.mailArea = [
            'backVal',
            response.data.mailAreaProvince,
            response.data.mailAreaCity,
            response.data.mailAreaRegion,
          ];
        }
        if (response.data.addrAreaProvince != null) {
          this.form.addrArea = [
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

    //添加节点
    addPayments2() {
      var nv = {
        uid: Math.floor(Math.random() * 100) + 1, //临时随机id
      };
      this.form.taskPlanList.push(nv);
    },

    //删除节点
    delpm2(uid) {
      this.form.taskPlanList.splice(
        this.form.taskPlanList.findIndex((item) => item.uid === uid),
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
      console.log(this.form);

      if (this.form.personList.length == 0) {
        this.$message.error('项目人员不能为空');
        return;
      }

      if (this.form.taskPlanList.length == 0) {
        this.$message.error('项目阶段不能为空');
        return;
      }
      Promise.all([
        this.validateForm('form'),
        this.validateForm('form2'),
        ...this.form.personList.map((item, index) => this.validateForm(`refForm1${index}`)),
        ...this.form.taskPlanList.map((item, index) => this.validateForm(`refForm2${index}`)),
      ]).then((res) => {
        if (res) {
          this.commonFun.ConverAreaVal(this.form);
          this.$modal.loading('正在提交，请稍候...');
          projAdd(this.form)
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
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/commonAE.scss';
</style>
