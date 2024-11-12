<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <div class="top">审批处理</div>
        <div class="main">
          <el-tabs type="border-card" v-model="tabPaneName">
            <el-tab-pane name="o" v-if="checkPermi(['car:car:pendingApproval0'])" label="领用审批"
              ><CarReceiveCheck ref="CarReceiveCheck"
            /></el-tab-pane>
            <el-tab-pane name="t" v-if="checkPermi(['car:car:pendingApproval1'])" label="出库审批"
              ><CarOutboundCheck ref="CarOutboundCheck"
            /></el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { checkPermi, checkRole } from '@/utils/permission'; // 权限判断函数
import CarReceiveCheck from '@/views/car/carApproval/carReceiveCheck';
import CarOutboundCheck from '@/views/car/carApproval/carOutboundCheck';
export default {
  name: 'CarApprovalCheck', //查看审批处理
  components: {
    CarReceiveCheck,
    CarOutboundCheck,
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
      this.$refs.CarReceiveCheck.getList(this.$route.query);
      this.$refs.CarOutboundCheck.getList(this.$route.query);
    } else {
      this.$refs.CarReceiveCheck.getList();
      this.$refs.CarOutboundCheck.getList();
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
          this.$refs.CarReceiveCheck.getList(this.$route.query);
          this.$refs.CarOutboundCheck.getList(this.$route.query);
        } else {
          this.$refs.CarReceiveCheck.getList();
          this.$refs.CarOutboundCheck.getList();
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
