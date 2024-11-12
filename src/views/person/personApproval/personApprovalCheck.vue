<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <div class="top">审批处理</div>
        <div class="main">
          <el-tabs type="border-card" v-model="tabPaneName">
            <el-tab-pane name="o" v-if="checkPermi(['person:apply:listApprove0'])" label="外出审批"
              ><PersonOutCheck ref="PersonOutCheck"
            /></el-tab-pane>
            <el-tab-pane name="t" v-if="checkPermi(['person:apply:listApprove1'])" label="请假审批"
              ><PersonLeaveCheck ref="PersonLeaveCheck"
            /></el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { checkPermi, checkRole } from '@/utils/permission'; // 权限判断函数
import PersonOutCheck from '@/views/person/personApproval/personOutCheck';
import PersonLeaveCheck from '@/views/person/personApproval/personLeaveCheck';
export default {
  name: 'PersonApprovalCheck', //查看审批处理
  components: {
    PersonOutCheck,
    PersonLeaveCheck,
  },
  data() {
    return { tabPaneName: 'o' };
  },
  created() {},
  mounted() {
    if (this.$route.query.tab != null) {
      if (this.$route.query.tab == 0) {
        this.tabPaneName = 'o';
      } else {
        this.tabPaneName = 't';
      }
      this.$router.push({ path: this.$router.currentRoute.path, query: null });
    }

    if (this.$route.query != null) {
      this.$refs.PersonOutCheck.getList(this.$route.query);
      this.$refs.PersonLeaveCheck.getList(this.$route.query);
    } else {
      this.$refs.PersonOutCheck.getList();
      this.$refs.PersonLeaveCheck.getList();
    }
  },
  methods: {
    checkPermi,
    checkRole,
  },
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name) {
        if (this.$route.query.tab != null) {
          if (this.$route.query.tab == 0) {
            this.tabPaneName = 'o';
          } else {
            this.tabPaneName = 't';
          }
          this.$router.push({ path: this.$router.currentRoute.path, query: null });
        }

        if (this.$route.query != null) {
          this.$refs.PersonOutCheck.getList(this.$route.query);
          this.$refs.PersonLeaveCheck.getList(this.$route.query);
        } else {
          this.$refs.PersonOutCheck.getList();
          this.$refs.PersonLeaveCheck.getList();
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
