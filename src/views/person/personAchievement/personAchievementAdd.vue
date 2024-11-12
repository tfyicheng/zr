<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['人员管理', '人员业绩管理', '人员业绩列表', '添加人员业绩']" />
        <div class="main">
          <div class="p0">
            <el-form :model="form" :inline="true" ref="form" :rules="ruleData">
              <el-form-item label="项 目 名 称" prop="prjName">
                <el-input
                  v-model="form.prjName"
                  placeholder="请输入"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item class="pline" :label="'关联项目\n合同编号'">
                <el-input
                  v-model="form.contNumber"
                  placeholder="请输入"
                  :maxlength="commonFun.inputMax"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="类   别" prop="prjType">
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

              <el-form-item label="总投资 (元)" prop="totalInvestment">
                <el-input-number
                  v-model="form.totalInvestment"
                  :precision="2"
                  @input="$forceUpdate()"
                  :controls="false"
                  :min="0"
                  placeholder="请输入"
                  clearable
                >
                </el-input-number>
              </el-form-item>

              <el-form-item label="项 目 区 域" prop="prjArea">
                <AddrCascader :data.sync="form.prjArea" />
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

              <el-form-item label="开 始 时 间" prop="startTime">
                <el-date-picker
                  v-model="form.startTime"
                  type="date"
                  placeholder="选择时间"
                  value-format="yyyy-MM-dd"
                  clearable
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item label="完 成 时 间" prop="endTime">
                <el-date-picker
                  v-model="form.endTime"
                  type="date"
                  placeholder="选择时间"
                  value-format="yyyy-MM-dd"
                  clearable
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item label="人 员 名 称" prop="userId">
                <PersonChoose :data.sync="form.userId" :Multiple="false" />
              </el-form-item>

              <el-form-item label="项 目 角 色" prop="prjRole">
                <el-select v-model="form.prjRole" placeholder="点击选择" clearable>
                  <el-option
                    v-for="item in dict.type.project_role"
                    :key="item.value"
                    :label="item.label"
                    :value="Number(item.value)"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="业 绩 描 述" class="remark">
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="form.remark"
                  maxlength="200"
                  show-word-limit
                  resize="none"
                >
                </el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </div>

        <el-dialog :visible.sync="dialogTableVisible">
          <PersonList v-show="this.ChooseOne == 'pList'" :Multiple="false" ref="pList" />
          <!-- <DeptList   v-show="this.form.certType == 1" ref="dList" /> -->
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { performanceAdd } from '@/api/data/person';
import PersonList from '@/views/components/dialog/personlist';
// import DeptList from '@/views/components/dialog/deptlist';
import { projectContInfo } from '@/api/data/contract';
export default {
  name: 'PersonAchievementAdd', //添加人员业绩
  dicts: [
    'project_type',
    'project_role',
    'project_scale',

    'engineering_level0',
    'project_plan',
    'engineering_level',
  ],
  components: { PersonList },
  data() {
    return {
      form: {},
      ChooseOne: '', //当前弹窗目标
      dialogTableVisible: false,
      ruleData: {
        prjName: [{ required: true, message: '项目名称不能为空', trigger: 'blur' }],
        userId: [{ required: true, message: '人员名称不能为空', trigger: ['blur', 'change'] }],
        prjType: [{ required: true, message: '请选择类型', trigger: 'change' }],
        prjRole: [{ required: true, message: '请选择角色', trigger: 'change' }],
        prjScale: [{ required: true, message: '请选择规模', trigger: 'change' }],
        startTime: [{ required: true, message: '请选择开始时间', trigger: 'change' }],
        endTime: [{ required: true, message: '请选择结束时间', trigger: 'change' }],
        totalAmount: [
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
        prjArea: [{ required: true, message: '请选择区域', trigger: ['blur', 'change'] }],
        engineeringLevel: [
          { required: true, message: '工程等级不能为空', trigger: ['blur', 'change'] },
        ],
        engineeringLevelType: [
          { required: true, message: '工程级别不能为空', trigger: ['blur', 'change'] },
        ],
      },
    };
  },

  mounted() {
    // this.$refs.uList.$on('upload', this.getUlist);
  },

  created() {},
  methods: {
    //选择人员
    choosePerson() {
      this.dialogTableVisible = true;
      this.ChooseOne = 'pList';
      this.$nextTick(() => {
        this.$refs.pList.$off('getChoose', this.getChoose);
        this.$refs.pList.$on('getChoose', this.getChoose);
        this.$refs.pList.$on('closeChoose', this.closeChoose);
      }, 500);
    },

    getChoose(data) {
      this.dialogTableVisible = false;
      if (data) {
        this.form.userId = data[0].userId;
        this.form.userName = data[0].userName;
      }
    },

    //关闭选择人员弹窗
    closeChoose() {
      this.dialogTableVisible = false;
    },

    // 获取上传的文件
    // getUlist(data) {
    //   console.log(data);
    //   this.form.annexFile = data;
    // },

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
          performanceAdd(this.form)
            .then((res) => {
              this.$modal.closeLoading();
              if (res.code == 200) {
                this.$message.success('添加成功');
                this.goback();
              }
            })
            .catch((error) => {
              this.$modal.closeLoading();
            });
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
