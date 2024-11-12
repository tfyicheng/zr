<template class="app-container">
  <div class="appo">
    <el-table
      :data="paymentNodes"
      style="width: 100%"
      :max-height="maxtbheigth"
      v-loading="loading"
      ref="multipleTable"
    >
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="period" label="期次"> </el-table-column>
      <el-table-column prop="nodeName" label="节点名称"> </el-table-column>
      <el-table-column prop="amount" label="金额（元）"> </el-table-column>
      <el-table-column prop="ratio" label="比例"> </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <dict-tag :flag="false" :options="dict.type.in_node_status" :value="scope.row.status" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { paymentNodeList } from '@/api/data/contract';
export default {
  name: 'IncomeNode', //收款节点
  props: ['maxtbheigth', 'id'],
  dicts: ['in_node_status'],
  data() {
    return {
      loading: true, // 遮罩层
      paymentNodes: [
        // {
        //   id: '1213', //id
        //   issue: '1', //期次
        //   planname: '项目阶段计划名称', //项目阶段计划名称
        //   sum: 21.1, //金额
        //   operation: 1, //操作
        //   state: 0, //状态
        // },
      ],
    };
  },
  created() {
    //this.getList();
  },
  methods: {
    /** 查询列表 */
    getList(id) {
      if (id) {
        paymentNodeList(id).then((response) => {
          this.paymentNodes = response.data.paymentNodes;
        });
        this.loading = false;
      }
    },
  },
  // watch: {
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

<style lang="scss" scoped></style>
