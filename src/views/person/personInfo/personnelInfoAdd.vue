<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['人员管理', '人员信息管理', '人员信息列表', '添加人员信息']" />

        <div class="main">
          <div class="p0">
            <el-form :model="form" :inline="true" ref="form" :rules="ruleData">
              <el-form-item label="登 陆 账 号">
                <el-input
                  v-model="form.loginName"
                  placeholder="系统填写"
                  :maxlength="commonFun.inputMax"
                  disabled
                ></el-input>
              </el-form-item>

              <el-form-item label="人 员 名 称" prop="userName">
                <el-input
                  v-model="form.userName"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                  @blur="getLogin"
                ></el-input>
              </el-form-item>

              <el-form-item label="性 别" prop="sex">
                <el-select v-model="form.sex" placeholder="点击选择" clearable>
                  <el-option
                    v-for="item in dict.type.sys_user_sex"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="部 门 名 称">
                <el-select
                  v-model="form.deptId"
                  placeholder="部门名称"
                  @change="itemChange"
                  clearable
                  :disabled="!checkPermi(['system:post:edit'])"
                >
                  <el-option
                    v-for="item in deptIds"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="职 位 名 称">
                <el-select
                  v-model="form.postId"
                  placeholder="职位名称"
                  clearable
                  :disabled="!checkPermi(['system:post:edit'])"
                >
                  <el-option
                    v-for="item in postIds"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="民 族">
                <el-input
                  v-model="form.nation"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="籍 贯">
                <el-input
                  v-model="form.nativePlace"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="出 生 日 期" prop="dateOfBirth">
                <el-date-picker
                  v-model="form.dateOfBirth"
                  type="date"
                  placeholder="选择时间"
                  value-format="yyyy-MM-dd"
                  clearable
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item label="政 治 面 貌">
                <el-select
                  v-model="form.political"
                  placeholder="点击选择"
                  @change="politicalChange"
                  clearable
                >
                  <el-option
                    v-for="item in dict.type.user_political_outlook"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="入 党 时 间">
                <el-date-picker
                  v-model="form.partyMembershipTime"
                  type="date"
                  placeholder="选择时间"
                  value-format="yyyy-MM-dd"
                  :disabled="form.political != 0"
                  clearable
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item label="联 系 号 码" prop="phonenumber">
                <el-input
                  v-model="form.phonenumber"
                  @blur="(e) => (form.phonenumber = e.target.value)"
                  @input="$forceUpdate()"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="入 职 时 间">
                <el-date-picker
                  v-model="form.joinDate"
                  type="date"
                  placeholder="选择时间"
                  value-format="yyyy-MM-dd"
                  clearable
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item label="工 作 时 间">
                <el-date-picker
                  v-model="form.workDate"
                  type="date"
                  placeholder="选择时间"
                  value-format="yyyy-MM-dd"
                  clearable
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item label="学 历">
                <el-select v-model="form.education" placeholder="点击选择" clearable>
                  <el-option
                    v-for="item in dict.type.user_education"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="专 业">
                <el-input
                  v-model="form.major"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item class="pline" :label="'第 一 学 历\n 毕 业 时 间'">
                <el-date-picker
                  v-model="form.firstDegreeDate"
                  type="date"
                  placeholder="选择时间"
                  value-format="yyyy-MM-dd"
                  clearable
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item label="毕 业 院 校">
                <el-input
                  v-model="form.graduationSch"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="毕 业 时 间">
                <el-date-picker
                  v-model="form.graduationDate"
                  type="date"
                  placeholder="选择时间"
                  value-format="yyyy-MM-dd"
                  clearable
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item label="现 专 业">
                <el-input
                  v-model="form.currentMajor"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="职 称 专 业">
                <el-input
                  v-model="form.professionalMajor"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item class="pline" :label="'专 业 技 术\n 职 称'">
                <el-input
                  v-model="form.majorProfessional"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item class="pline" :label="'职 称 评 审\n 通 过 时 间'">
                <el-date-picker
                  v-model="form.professionalDate"
                  type="date"
                  placeholder="选择时间"
                  value-format="yyyy-MM-dd"
                  clearable
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item :label="'任现职时间'">
                <el-date-picker
                  v-model="form.currentPositionDate"
                  type="date"
                  placeholder="选择时间"
                  value-format="yyyy-MM-dd"
                  clearable
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item class="pline" :label="'现 职 位 \n 级 别'">
                <el-input
                  v-model="form.currentJobLevel"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item class="pline" :label="'现 职 位 级 别 \n 提  拔 时 间'">
                <el-date-picker
                  v-model="form.currentJobPromotionTime"
                  type="date"
                  placeholder="选择时间"
                  value-format="yyyy-MM-dd"
                  clearable
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item label="证 件 类 型" prop="idType">
                <el-select v-model="form.idType" placeholder="点击选择" clearable>
                  <el-option
                    v-for="item in dict.type.person_cert.find((c) => c.label === '身份证').raw
                      .children"
                    :key="item.dictValue"
                    :label="item.dictLabel"
                    :value="item.dictValue"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="证 件 号 码" prop="idNum">
                <el-input
                  v-model="form.idNum"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="发 证 时 间">
                <el-date-picker
                  v-model="form.dateOfIssuance"
                  type="date"
                  placeholder="选择时间"
                  value-format="yyyy-MM-dd"
                  clearable
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item label="证 件 有 效 期">
                <el-date-picker
                  v-model="form.idNumValid"
                  type="date"
                  placeholder="选择时间"
                  value-format="yyyy-MM-dd"
                  clearable
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item label="邮 箱 地 址">
                <el-input
                  v-model="form.email"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="现 住 址" class="plast">
                <el-input
                  v-model="form.fullAddr"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="证 件 附 件" class="file">
                <FileChoose
                  ref="FileChoose"
                  :value.sync="form.files"
                  :extra="1"
                  :autoUpload="false"
                />
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div class="main" v-if="false">
          <div class="p0">
            <el-form :model="form" :inline="true" ref="form" :rules="ruleData">
              <el-form-item label="人 员 名 称" prop="userName">
                <el-input
                  v-model="form.userName"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="性 别">
                <el-select v-model="form.sex" placeholder="点击选择" clearable>
                  <el-option
                    v-for="item in dict.type.sys_user_sex"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="民 族">
                <el-input
                  v-model="form.nation"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="籍 贯">
                <el-input
                  v-model="form.nativePlace"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="出 生 日 期">
                <el-date-picker
                  v-model="form.dateOfBirth"
                  type="date"
                  placeholder="选择时间"
                  value-format="yyyy-MM-dd"
                  clearable
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item label="政 治 面 貌">
                <el-select v-model="form.political" placeholder="点击选择">
                  <el-option
                    v-for="item in dict.type.user_political_outlook"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="学 历">
                <el-select v-model="form.education" placeholder="点击选择" clearable>
                  <el-option
                    v-for="item in dict.type.user_education"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="工 作 状 态">
                <el-select v-model="form.jobState" placeholder="点击选择">
                  <el-option
                    v-for="item in dict.type.user_job_status"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="婚 姻 状 况">
                <el-select v-model="form.maritalStatus" placeholder="点击选择" clearable>
                  <el-option
                    v-for="item in dict.type.user_marital_status"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="毕 业 院 校">
                <el-input
                  v-model="form.graduationSch"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="联 系 号 码">
                <el-input
                  v-model="form.phoneNumber"
                  @blur="(e) => (form.phoneNumber = e.target.value)"
                  @input="$forceUpdate()"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="邮 箱">
                <el-input
                  v-model="form.email"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="现 住 址">
                <el-input
                  v-model="form.fullAddr"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="身份证号码">
                <el-input
                  v-model="form.idNum"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="证件有效期">
                <el-date-picker
                  v-model="form.idNumValid"
                  type="date"
                  placeholder="选择时间"
                  value-format="yyyy-MM-dd"
                  clearable
                >
                </el-date-picker>
              </el-form-item>
            </el-form>
          </div>

          <div class="p2">
            <div class="p2item">
              <span>身份证附件</span>
              <!-- <FileUpload ref="uList" /> -->
              <FileChoose
                ref="FileChoose"
                :value.sync="form.idNumber"
                :extra="1"
                :autoUpload="false"
              />
            </div>
          </div>
        </div>

        <div class="main3" v-if="false">
          <div class="m3top">登录密码</div>
          <div class="m3main">
            <el-form :model="form" :inline="true" ref="form2" :rules="ruleData">
              <el-form-item label="密码" prop="password">
                <el-input
                  v-model="form.password"
                  @input="$forceUpdate()"
                  onkeyup="value=value.replace(/[^\w]/g,'')"
                  placeholder="请输入密码"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>
              <!-- <el-form-item label="新密码">
                <el-input
                  v-model="oldpw"
                  onkeyup="this.value=this.value.replace(/[^\w]/g,'')"
                  placeholder="请输入密码"
                  :maxlength="commonFun.inputMax"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码">
                <el-input
                  v-model="form.password"
                  onkeyup="this.value=this.value.replace(/[^\w]/g,'')"
                  placeholder="请再次输入"
                  :maxlength="commonFun.inputMax"
                ></el-input>
              </el-form-item> -->
            </el-form>
          </div>
        </div>

        <div class="main2" v-if="false">
          <div class="m2top">教育信息</div>
          <div class="m2main">
            <div class="m2mt" v-show="form.eduList.length > 0">
              <div class="m2mb"><i style="color: red">*</i>开始时间</div>
              <div class="m2mb"><i style="color: red">*</i>结束时间</div>
              <div class="m2mb"><i style="color: red">*</i>学历</div>
              <div class="m2mb"><i style="color: red">*</i>毕业院校</div>
              <div class="m2mb"><i style="color: red">*</i>专业名称</div>
              <div class="m2mb">附件</div>
              <div class="m2mb" style="max-width: 60px">操作</div>
            </div>

            <el-form
              v-for="(c, index) in form.eduList"
              :key="index"
              :model="c"
              :ref="`refForm${index}`"
              :rules="ruleData"
            >
              <div class="m2mt">
                <div class="m2mb">
                  <el-form-item label="" prop="startDate">
                    <el-date-picker
                      v-model="c.startDate"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="开始时间(必填)"
                      clearable
                    >
                    </el-date-picker>
                  </el-form-item>
                </div>
                <div class="m2mb">
                  <el-form-item label="" prop="endDate">
                    <el-date-picker
                      v-model="c.endDate"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="结束时间(必填)"
                      clearable
                    >
                    </el-date-picker>
                  </el-form-item>
                </div>
                <div class="m2mb">
                  <el-form-item label="" prop="political">
                    <el-select v-model="c.political" placeholder="点击选择" clearable>
                      <el-option
                        v-for="item in dict.type.user_education"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="m2mb">
                  <el-form-item label="" prop="graduationSch">
                    <el-input
                      v-model="c.graduationSch"
                      placeholder="学校名称（必填）"
                      :maxlength="commonFun.inputMax"
                      clearable
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="m2mb">
                  <el-form-item label="" prop="speciality">
                    <el-input
                      v-model="c.speciality"
                      placeholder="专业名称"
                      :maxlength="commonFun.inputMax"
                      clearable
                    ></el-input>
                  </el-form-item>
                </div>

                <div class="m2mb">
                  <el-form-item label="">
                    <el-input
                      v-model="c.originalName"
                      placeholder="请点击选择"
                      @click.native="chooseMat(c.uid)"
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
              <el-button type="primary" @click="addPayments">添加</el-button>
            </div>
          </div>
        </div>

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </div>

        <!-- <FileUpload ref="uuList" :limit="1" style="visibility: hidden" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { checkPermi, checkRole } from '@/utils/permission'; // 权限判断函数
import { personAdd, getLoginName } from '@/api/data/person';
import { listDept } from '@/api/system/dept';
import { listPost } from '@/api/system/post';
export default {
  name: 'PersonnelInfoAdd', //添加人员信息
  dicts: [
    'sys_user_sex',
    'user_job_status',
    'user_health_status',
    'user_marital_status',
    'user_political_outlook',
    'user_education',
    'person_cert',
  ],
  components: {},
  data() {
    return {
      form: {
        password: null,
        idNumber: [],
        eduList: [],
        deptId: null,
        postId: null,
        loginName: null,
        idType: null,
        partyMembershipTime: null,
      },
      deptIds: [], //部门项
      postIds: [], //职位项
      idTypes: [], //证件类型
      oldpw: '',
      uid: '', //临时记录节点id
      ruleData: {
        phonenumber: [{ required: true, message: '联系号码不能为空', trigger: 'blur' }],
        userName: [{ required: true, message: '人员名称不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        political: [{ required: true, message: '请选择学历', trigger: 'change' }],
        graduationSch: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        speciality: [{ required: true, message: '请输入内容', trigger: 'change' }],
        startDate: [{ required: true, message: '请选择开始时间', trigger: 'change' }],
        endDate: [{ required: true, message: '请选择结束时间', trigger: 'change' }],
        sex: [{ required: true, message: '性别不能为空', trigger: ['blur', 'change'] }],
        deptId: [{ required: true, message: '部门不能为空', trigger: ['blur', 'change'] }],
        dateOfBirth: [{ required: true, message: '出生日期不能为空', trigger: ['blur', 'change'] }],
        idType: [{ required: true, message: '证件类型不能为空', trigger: ['blur', 'change'] }],
        idNum: [{ required: true, message: '证件号码不能为空', trigger: ['blur', 'change'] }],
      },
    };
  },
  created() {
    this.getDeptList();

    this.getConfigKey('sys_user.initPassword').then((response) => {
      this.form.password = response.data;
      this.form.jobState = '1';
      this.$forceUpdate();
    });
  },
  mounted() {
    //this.$refs.uList.$on('upload', this.getUlist);
    // this.$refs.uuList.$on('upload', this.getUulist);
  },
  methods: {
    checkPermi,
    checkRole,
    //加载部门列表生成级联下拉项
    getDeptList() {
      listDept({ pageNum: 1, pageSize: 999 }).then((response) => {
        response.data.forEach((item, index) => {
          this.deptIds.push({ label: item.deptName, value: item.deptId });
        });
      });
    },

    // 查询岗位列表
    getPostList(did) {
      listPost({ pageNum: 1, pageSize: 999, deptId: did }).then((response) => {
        this.postIds = [];
        this.form.postId = null;
        response.rows.forEach((item, index) => {
          this.postIds.push({ label: item.postName, value: item.postId });
        });
      });
    },

    //选择党员时，需要选择入党时间
    politicalChange() {
      if (this.form.political != 0) {
        this.form.partyMembershipTime = null;
      }
    },

    //获取登录名
    getLogin() {
      getLoginName(this.form.userName).then((response) => {
        if (response) {
          this.form.loginName = response.data;
        }
      });
    },

    //级联选择触发
    itemChange() {
      this.getPostList(this.form.deptId);
    },

    goback() {
      this.$store.dispatch('tagsView/delView', this.$route); //关闭当前标签页
      this.$router.go(-1);
    },

    //选择资产id
    chooseMat(uid) {
      this.uid = uid;
      this.$refs.uuList.clickEvent();
    },

    // 获取上传的身份证附件
    getUlist(data) {
      console.log(data);
      this.form.idNumber = data;
    },

    // 获取上传的教育附件
    getUulist(data) {
      console.log(data);
      if (data && data.length > 0) {
        this.form.eduList.find((item) => item.uid === this.uid).annexId = data[0].id;
        this.form.eduList.find((item) => item.uid === this.uid).originalName = data[0].name;
        this.$refs.uuList.clearn();
        this.$forceUpdate();
      }
    },

    //添加节点
    addPayments() {
      var nv = {
        uid: Math.floor(Math.random() * 100) + 1, //临时随机id
      };
      this.form.eduList.push(nv);
    },

    //删除节点
    delpm(uid) {
      this.form.eduList.splice(
        this.form.eduList.findIndex((item) => item.uid === uid),
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

    //保存
    save() {
      console.log(this.form);
      // if (this.oldpw != this.form.password) {
      //   this.$message.error('密码前后输入不一致');
      //   return;
      // }

      // if (this.$refs.FileChoose.fileList.length == 0) {
      //   this.$message.error('附件不能为空');
      //   return;
      // }

      if (this.form.political == 0) {
        if (this.form.partyMembershipTime == null) {
          this.$message.error('入党时间不能为空');
          return;
        }
      }
      if (this.form.idType == '0') {
        if (!this.formRules.isValidID(this.form.idNum)) {
          this.$message.error('请输入合法的身份证号');
          return;
        }
      }
      //, this.validateForm('form2')
      // ...this.form.eduList.map((item, index) => this.validateForm(`refForm${index}`)),
      Promise.all([this.validateForm('form')]).then((res) => {
        if (res) {
          this.$refs.FileChoose.asyncUpFile().then((res) => {
            if (res) {
              this.$modal.loading('正在提交，请稍候...');
              personAdd(this.form)
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
          .p2item {
            span {
              line-height: 100px;
              text-align: center;
              margin: 0 35px 0 30px;
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
              margin-top: 0px;
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

      .main3 {
        margin-top: 20px;
        // height: 360px;
        // overflow: auto;
        background: #fff;
        border-radius: 4px;
        .m3top {
          padding-top: 20px;
          margin: 20px;
          font-family: Alibaba PuHuiTi 2;
          font-size: 20px;
          font-weight: 500;
          line-height: 28px;
          letter-spacing: 0em;
          text-align: left;
        }
        .m3top::before {
          content: '\00a0    ';
          border-left: 3px solid #4da0ff;
        }
        .m3main {
          border-top: 1px solid #e4e6ed;
          .el-form-item {
            margin-top: 25px;
            margin-left: 25px;
            .el-input {
              width: 260px;
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
