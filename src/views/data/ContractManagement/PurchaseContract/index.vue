<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <div class="top">采购合同</div>
        <div class="main">
          <el-tabs type="border-card">
            <el-tab-pane v-if="checkPermi(['contract:propertyBuy:list'])" label="固定资产采购合同"
              ><FixedAssetsPCIndex ref="findex"
            /></el-tab-pane>
            <el-tab-pane v-if="checkPermi(['contract:serviceBuy:list'])" label="服务采购合同"
              ><ServicePCIndex ref="sindex"
            /></el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { checkPermi, checkRole } from '@/utils/permission'; // 权限判断函数
import FixedAssetsPCIndex from '@/views/data/ContractManagement/PurchaseContract/fixedAssetsPCIndex';
import ServicePCIndex from '@/views/data/ContractManagement/PurchaseContract/servicePCIndex';
export default {
  name: 'PurchaseContractIndex', //采购合同统计
  components: {
    FixedAssetsPCIndex,
    ServicePCIndex,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    checkPermi,
    checkRole,
  },
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name) {
        console.log('getss');
        this.$refs.findex.getList();
        this.$refs.sindex.getList();
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
