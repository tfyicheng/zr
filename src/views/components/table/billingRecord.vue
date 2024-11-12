<template class="app-container">
  <div class="appo">
    <el-table :data="payments" style="width: 100%" :max-height="maxtbheigth" ref="multipleTable" v-loading="loading">
      <!-- <el-table-column prop="id" label="ID"> </el-table-column> -->
      <el-table-column prop="invoiceNumber" label="发票编号"> </el-table-column>
      <el-table-column label="票据类型">
        <template slot-scope="scope">
            <dict-tag
                    :flag="false"
                    :options="dict.type.invoice_type"
                    :value="scope.row.billType"
                  />
        </template>
      </el-table-column>
      <el-table-column prop="invoicingDate" label="开票日期"> </el-table-column>
      <el-table-column prop="currentAmount" label="开票金额(元)"> </el-table-column>
      <!-- <el-table-column label="发票附件">

      </el-table-column> -->
    </el-table>

  </div>
</template>

<script>
import { invoiceList } from '@/api/data/contract';

export default {
  name: "BillingRecord",//开票记录
  props:['maxtbheigth', 'id'],
   dicts: ['invoice_type'], 
  data() {
    return {
      loading: true, // 遮罩层
      payments: [
        // {
        //   id: '1213', //id
        // },  
      ],
    };
  },
  created() {},
  methods: {
        /** 查询列表 */
    getList(id) {
      if(id){
      invoiceList(id).then((response) => {
        this.payments = response.data;
      });
      this.loading = false;
      }

    },

  },
  //   watch: {
  //   id: {
  //     handler(val) {
  //       if (val) {
  //         //console.log('获取参数:' + val);
  //         this.getList();
  //       }
  //     },
  //     deep: true,
  //     immediate: true,
  //   },
  // },
};
</script>

<style lang="scss" scoped>

</style>

.appo {
  overflow: auto;
 .appi {
  padding: 20px;
  min-width: 1220px;
 }
}
</style>