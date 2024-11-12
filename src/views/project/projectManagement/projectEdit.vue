<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['项目管理', '项目管理统计', '项目列表', '编辑项目信息']" />

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

          <div class="p0" v-if="false">
            <el-form :model="form" :inline="true" ref="form" :rules="ruleData">
              <el-form-item label="项 目 编 号" prop="prjName">
                <el-input v-model="form.showPrjNumber" disabled></el-input>
              </el-form-item>

              <el-form-item label="项 目 名 称" prop="prjName">
                <el-input
                  v-model="form.prjName"
                  placeholder="填入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="项 目 区 域" prop="area">
                <el-cascader
                  :key="modalKey"
                  v-model="form.area"
                  :props="props"
                  ref="cascaderAddr"
                  placeholder="请选择区域"
                  @change="areaChange"
                  clearable
                ></el-cascader>
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

              <el-form-item label="项 目 规 模" prop="scaleUnit">
                <el-select v-model="form.scaleUnit" placeholder="点击选择" clearable>
                  <el-option
                    v-for="item in dict.type.project_scale"
                    :key="item.value"
                    :label="item.label"
                    :value="Number(item.value)"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="开 始 日 期" prop="startDate">
                <el-date-picker
                  v-model="form.startDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  clearable
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item label="交 付 日 期" prop="deliveryDate">
                <el-date-picker
                  v-model="form.deliveryDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  clearable
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item label="客 户 名 称" prop="clientName">
                <el-input
                  v-model="form.clientName"
                  placeholder="点击选择"
                  @click.native="chooseClient"
                  readonly
                >
                  <svg-icon
                    slot="suffix"
                    icon-class="choose"
                    style="cursor: pointer; margin-right: 10px"
                  />
                </el-input>
              </el-form-item>

              <el-form-item label="联 系 人" prop="contacts">
                <el-input
                  v-model="form.contacts"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="联 系 号 码" prop="phone">
                <el-input
                  v-model="form.phone"
                  @input="$forceUpdate()"
                  @blur="(e) => (form.phone = e.target.value)"
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

              <el-form-item label="联 系 地 址">
                <el-input
                  v-model="form.addr"
                  placeholder="请输入内容"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
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

              <!-- <el-form-item label="合 同 附 件" class="file" prop="fileIds">
                  <FileChoose :value.sync="c.fileIds" />
                </el-form-item> -->
            </el-form>
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
import { projEdit, projInfo } from '@/api/data/project';
import { getCity, getProvince } from '@/api/system/user';
export default {
  name: 'ProjectEdit', //编辑项目
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
        startDate: null,
        deliveryDate: null,
        personList: [],
        taskPlanList: [],
      },
      payments: [
        {
          id: '1213',
          issue: '1',
          planname: '项目阶段计划名称',
          sum: 21.1,
          percentage: 0.5,
        },
      ],
      paymentShow: true,
      paymentShow2: true,

      dialogTableVisible: false,
      flagId: null,
      ChooseOne: '', //当前弹窗目标
      ruleData: {
        prjName: [{ required: true, message: '项目名称不能为空', trigger: 'blur' }],
        prjType: [{ required: true, message: '项目类型不能为空', trigger: 'change' }],
        scaleUnit: [{ required: true, message: '项目规模不能为空', trigger: 'change' }],
        prjScale: [{ required: true, message: '项目规模不能为空', trigger: 'change' }],
        startDate: [{ required: true, message: '请选择开始日期', trigger: 'change' }],
        deliveryDate: [{ required: true, message: '请选择交付日期', trigger: 'change' }],
        bidNumber: [{ required: true, message: '请选择投标编号', trigger: 'change' }],
        clientName: [{ required: true, message: '请选择客户', trigger: 'change' }],
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
      },
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      if (this.$route.query.id) {
        this.flagId = this.$route.query.id;
        projInfo(this.$route.query.id).then((response) => {
          console.log(response);
          this.form = { ...this.form, ...response.data };

          //区域数据回传
          this.commonFun.backAreaVal(this.form, response.data);
        });
      }
    },

    //获取合同信息
    getCont(data) {
      if (data && data.length > 0) {
        this.form.contName = data[0].contName;
        // this.form.contNumber = data[0].contNumber;
        this.form.contId = data[0].id;
        //this.getInfo(data[0].id);
      } else {
        this.form.contName = null;
        this.form.contId = null;
        //this.form.settlementAmount = 0; //结算金额取自合同
        //  this.form.cumulativeAmount = 0; //累计合同取接口实时计算
      }
    },

    //添加节点
    addPayments() {
      this.chooseUser();
    },
    //删除节点
    delpm(id) {
      this.form.personList.splice(
        this.form.personList.findIndex((item) => item.userId === id),
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

    goback() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
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
      Promise.all([this.validateForm('form')]).then((res) => {
        if (res) {
          this.commonFun.ConverAreaVal(this.form);
          this.$modal.loading('正在提交，请稍候...');
          projEdit(this.form)
            .then((res) => {
              console.log(res);
              this.$modal.closeLoading();
              if (res.code == 200) {
                this.$message.success('修改成功');
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
        this.getInfo();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/commonAE.scss';
</style>
