<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['项目管理', '项目管理统计', '项目列表']" />
        <div class="main">
          <el-tabs type="border-card">
            <el-tab-pane label="所有项目"><ProjectAll ref="pa" /></el-tab-pane>
            <el-tab-pane label="我参与的"><ProjectMine ref="pm" /></el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectAll from '@/views/project/projectManagement/projectAll';
import ProjectMine from '@/views/project/projectManagement/projectMine';
export default {
  name: 'ProjectCheck', //查看项目列表
  components: {
    ProjectAll,
    ProjectMine,
  },
  data() {
    return {};
  },
  created() {},
  mounted() {
    if (this.$route.query.status != null) {
      this.$refs.pa.getList(this.$route.query);
      this.$refs.pm.getList(this.$route.query);
      //this.$router.push({ path: this.$router.currentRoute.path, query: null });
    } else {
      this.$refs.pa.getList();
      this.$refs.pm.getList();
    }
  },
  methods: {},

  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name) {
        if (this.$route.query.status != null) {
          this.$refs.pa.getList(this.$route.query);
          this.$refs.pm.getList(this.$route.query);
          //this.$router.push({ path: this.$router.currentRoute.path, query: null });
        } else {
          this.$refs.pa.getList();
          this.$refs.pm.getList();
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
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
      .top::before {
        content: '\00a0 ';
        border-left: 3px solid #4da0ff;
        margin-right: 5px;
      }
      .main {
        background: #fff;
        border-radius: 4px;
        .el-tabs {
          border: 0;
        }
      }
    }
  }
}
</style>
