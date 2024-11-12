<template class="app-container">
  <div class="appo">
    <el-table :data="payments" style="width: 100%" :max-height="maxtbheigth"  v-loading="loading" ref="multipleTable">
      <!-- <el-table-column prop="id" label="ID"> </el-table-column> -->
      <!-- <el-table-column prop="handledByName" label="申请人"> </el-table-column> -->
       <el-table-column prop="nodeName" label="收付款节点名称"> </el-table-column>
      <el-table-column label="收付款方式">
        <template slot-scope="scope">
          
           <dict-tag
                    :flag="false"
                    :options="dict.type.payment_type"
                    :value="scope.row.paymentMethod"
                  />
        </template>
      </el-table-column>
      <el-table-column prop="paymentTime" label="收付款日期"> </el-table-column>
      <el-table-column prop="period" label="收付款期数"> </el-table-column>  
      <el-table-column prop="currentAmount" label="收款金额(元)"> </el-table-column>
      <el-table-column prop="bankAccount" label="账户"> </el-table-column>
      <el-table-column prop="remark" label="备注"> </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { paymentList } from '@/api/data/contract';
export default {
  name: "IncomeRecord",//收款记录
  props:['maxtbheigth', 'id'],
   dicts: ['payment_type'], 
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
   getList(id) {
      if(id){
      paymentList(id).then((response) => {
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