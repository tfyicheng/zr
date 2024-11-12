<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <div class="top">审批处理</div>
        <div class="main">
          <el-tabs type="border-card" v-model="tabPaneName">
            <el-tab-pane
              name="o"
              v-if="checkPermi(['property:stock0:pendingApproval'])"
              label="领用审批"
              ><ReceiveCheck ref="ReceiveCheck"
            /></el-tab-pane>
            <el-tab-pane
              name="t"
              v-if="checkPermi(['property:stock1:pendingApproval'])"
              label="出库审批"
              ><OutboundCheck ref="OutboundCheck"
            /></el-tab-pane>
            <el-tab-pane
              name="h"
              v-if="checkPermi(['property:stock2:pendingApproval'])"
              label="入库审批"
              ><InboundCheck ref="InboundCheck"
            /></el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { checkPermi, checkRole } from '@/utils/permission'; // 权限判断函数
import ReceiveCheck from '@/views/purchase/assetManagement/approvalHandle/receiveCheck';
import OutboundCheck from '@/views/purchase/assetManagement/approvalHandle/outboundCheck';
import InboundCheck from '@/views/purchase/assetManagement/approvalHandle/inboundCheck';
export default {
  name: 'ApprovalHandleCheck', //查看审批
  components: {
    ReceiveCheck,
    OutboundCheck,
    InboundCheck,
  },
  data() {
    return {
      tabPaneName: 'o',
    };
  },
  created() {},
  mounted() {
    if (this.$route.query.tab != null) {
      if (this.$route.query.tab == 0) {
        this.tabPaneName = 'o';
      } else if (this.$route.query.tab == 1) {
        this.tabPaneName = 't';
      } else {
        this.tabPaneName = 'h';
      }
      this.$router.push({ path: this.$router.currentRoute.path, query: null });
    }

    if (this.$route.query != null) {
      this.$refs.ReceiveCheck.getList(this.$route.query);
      this.$refs.OutboundCheck.getList(this.$route.query);
      this.$refs.InboundCheck.getList(this.$route.query);
    } else {
      this.$refs.ReceiveCheck.getList();
      this.$refs.OutboundCheck.getList();
      this.$refs.InboundCheck.getList();
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
          } else if (this.$route.query.tab == 1) {
            this.tabPaneName = 't';
          } else {
            this.tabPaneName = 'h';
          }
          this.$router.push({ path: this.$router.currentRoute.path, query: null });
        }

        if (this.$route.query != null) {
          this.$refs.ReceiveCheck.getList(this.$route.query);
          this.$refs.OutboundCheck.getList(this.$route.query);
          this.$refs.InboundCheck.getList(this.$route.query);
        } else {
          this.$refs.ReceiveCheck.getList();
          this.$refs.OutboundCheck.getList();
          this.$refs.InboundCheck.getList();
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
