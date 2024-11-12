<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['资产采购管理', '采购合同管理', '采购合同列表']" />
        <div class="main">
          <el-tabs type="border-card" v-model="tabPaneName">
            <el-tab-pane
              name="o"
              v-if="checkPermi(['contract:propertyBuy:list'])"
              label="固定资产采购合同"
              ><FixedAssetsPCIndex ref="pa"
            /></el-tab-pane>
            <el-tab-pane
              name="t"
              v-if="checkPermi(['contract:serviceBuy:list'])"
              label="服务采购合同"
              ><ServicePCIndex ref="pm"
            /></el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { checkPermi, checkRole } from '@/utils/permission'; // 权限判断函数
import FixedAssetsPCIndex from '@/views/purchase/purchaseManagement/purchaseContract/fixedAssetsPCIndex';
import ServicePCIndex from '@/views/purchase/purchaseManagement/purchaseContract/servicePCIndex';
export default {
  name: 'purchaseContractIndex', //采购合同统计
  components: {
    FixedAssetsPCIndex,
    ServicePCIndex,
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
      } else {
        this.tabPaneName = 't';
      }
      this.$router.push({ path: this.$router.currentRoute.path, query: null });
    }

    if (this.$route.query != null) {
      this.$refs.pa.getList(this.$route.query);
      this.$refs.pm.getList(this.$route.query);
      //this.$router.push({ path: this.$router.currentRoute.path, query: null });
    } else {
      this.$refs.pa.getList();
      this.$refs.pm.getList();
    }
  },
  methods: {
    checkPermi,
    checkRole,
  },
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
        this.$refs.pa.getList(this.$route.query);
        this.$refs.pm.getList(this.$route.query);
        //this.$router.push({ path: this.$router.currentRoute.path, query: null });
      } else {
        this.$refs.pa.getList();
        this.$refs.pm.getList();
      }
    }
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
