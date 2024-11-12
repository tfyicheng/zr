<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['人员管理', '人员业绩管理', '人员业绩列表', '人员业绩详情']" />
        <div class="main">
          <div class="p0">
            <el-form :model="form" :inline="true" class="info">
              <el-form-item label="项 目 名 称">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.prjName"></InputTip>
                </div>
              </el-form-item>
              <el-form-item class="pline" :label="'关联项目\n合同编号'">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.contNumber"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="类   别" prop="prjType">
                <div class="info">
                  <dict-tag :options="dict.type.project_type" :value="form.prjType" />
                </div>
              </el-form-item>

              <el-form-item label="总投资 (元)" prop="totalAmount">
                <div class="info">{{ commonFun.amountConversion2(form.totalInvestment) }}</div>
              </el-form-item>

              <el-form-item label="项 目 区 域">
                <div class="info">
                  {{ form.area }}
                </div>
              </el-form-item>

              <el-form-item label="工 程 等 级">
                <div class="info">
                  <dict-tag :options="dict.type.engineering_level" :value="form.engineeringLevel" />
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

              <el-form-item label="开 始 时 间">
                <div class="info">
                  <!-- <span>{{ commonFun.coverTime(form.contStartDate) }}</span> -->
                  <span>{{ form.startTime }}</span>
                </div>
              </el-form-item>

              <el-form-item label="完 成 时 间">
                <div class="info">
                  <!-- <span>{{ commonFun.coverTime(form.contStartDate) }}</span> -->
                  <span>{{ form.endTime }}</span>
                </div>
              </el-form-item>

              <el-form-item label="人 员 名 称">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.userName"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="项 目 角 色">
                <div class="info">
                  <dict-tag :options="dict.type.project_role" :value="form.prjRole" />
                </div>
              </el-form-item>

              <el-form-item label="业 绩 描 述" class="remark">
                <div class="info">
                  <el-input
                    type="textarea"
                    autosize
                    resize="none"
                    readonly
                    v-model="form.remark"
                  ></el-input>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <!-- <el-button @click="Output" type="warning">导出</el-button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { performanceInfo } from '@/api/data/person';
export default {
  name: 'PersonAchievementInfo', //人员业绩信息
  dicts: [
    'project_type',
    'project_role',
    'project_scale',

    'engineering_level0',
    'project_plan',
    'engineering_level',
  ],
  data() {
    return {
      maxtbheigth: '300',
      form: {},
      inputTipWidth: this.commonFun.inputTipWidth,
      dialogTableVisible: false,
      fileview: '', //文件预览地址
      queryId: '',
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
        this.queryId = this.$route.query.id;
        this.flagId = this.$route.query.id;
        performanceInfo(this.$route.query.id).then((response) => {
          this.form = response.data;
          this.commonFun.ShowAreaVal(this.form, response.data);
        });
      }
    },

    //返回
    goback() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
    },

    //导出
    Output() {},

    //刷新视图
    refreshView() {
      this.$store.dispatch('tagsView/delAllCachedViews', this.$route); //删除当前路径所有缓存视图
      const { fullPath } = this.$route; //获取全路径
      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + fullPath,
        });
      });
    },
  },

  // 使用 watch 监听路由变化，手动更新数据
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name && this.flagId != this.$route.query.id) {
        // this.getInfo();
        this.$tab.refreshPage();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/commonAE.scss';
</style>
