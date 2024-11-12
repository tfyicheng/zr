<template class="app-container">
  <div class="main">
    <div class="mt">
      <el-button round :type="flag == 0 ? 'primary' : null" @click="tolish">付款节点</el-button>
      <el-button round :type="flag == 1 ? 'primary' : null" @click="tohis">收票申请</el-button>
      <el-button round :type="flag == 2 ? 'primary' : null" @click="tohis2">付款记录</el-button>
    </div>
    <div class="mb">
      <div v-show="flag == 0">
        <div class="tmain">
          <!-- <div class="top">
            <el-button type="primary" @click="addC" icon="el-icon-plus"> 添加</el-button>
          </div> -->
          <div class="body">
            <el-table
              :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
              :cell-style="{ textAlign: 'left' }"
              :data="tableData"
              style="width: 100%"
              max-height="560"
              ref="multipleTable"
              row-key="id"
              v-loading="loading"
            >
              <!-- <el-table-column type="selection" width="55" reserve-selection /> -->
              <!-- <el-table-column prop="id" label="ID"></el-table-column> -->
              <el-table-column prop="nodeName" label="节点名称"> </el-table-column>
              <el-table-column prop="contName" label="合同名称"> </el-table-column>
              <!-- <el-table-column prop="prjName" label="项目名称"> </el-table-column> -->
              <el-table-column label="状态">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.out_node_status"
                    :value="scope.row.status"
                  />
                  <!-- <span v-if="scope.row.status === 0" style="color: #666666">{{
                    dict.type.out_node_status[scope.row.status].label
                  }}</span>
                  <span v-else-if="scope.row.status === 1" style="color: #fac06a">{{
                    dict.type.out_node_status[scope.row.status].label
                  }}</span>
                  <span v-else-if="scope.row.status === 2" style="color: #1890ff">{{
                    dict.type.out_node_status[scope.row.status].label
                  }}</span>
                  <span v-else-if="scope.row.status === 3" style="color: #07c15f">{{
                    dict.type.out_node_status[scope.row.status].label
                  }}</span> -->
                </template>
              </el-table-column>

              <el-table-column prop="amount" label="金额"> </el-table-column>
              <!-- <el-table-column prop="nodeName" label="节点名称"> </el-table-column> -->
              <el-table-column prop="period" label="期次"> </el-table-column>
              <el-table-column fixed="right" label="操作" :show-overflow-tooltip="false">
                <template slot-scope="scope">
                  <!-- <el-button
                    @click="handleCheck(scope.row)"
                    type="text"
                    size="small"
                    style="font-size: 14px"
                    >查看</el-button
                  > -->
                  <el-button
                    v-hasPermi="['contract:payment1:edit']"
                    type="text"
                    size="small"
                    @click="handleEdit(scope.row)"
                    style="font-size: 14px"
                    >编辑</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div v-show="flag == 1">
        <div class="tmain">
          <div class="top">
            <el-button
              v-hasPermi="['produce:invoice1:add']"
              type="primary"
              @click="addC2"
              icon="el-icon-plus"
            >
              添加</el-button
            >
          </div>
          <div class="body">
            <el-table
              :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
              :cell-style="{ textAlign: 'left' }"
              :data="tableData2"
              style="width: 100%"
              max-height="560"
              ref="multipleTable"
              row-key="id"
              v-loading="loading"
            >
              <el-table-column type="selection" width="55" reserve-selection />
              <!-- <el-table-column prop="id" label="ID"></el-table-column> -->
              <el-table-column prop="invoiceNumber" label="开票编号"> </el-table-column>
              <el-table-column prop="contName" label="合同名称"> </el-table-column>
              <el-table-column prop="applyUser" label="申请人"> </el-table-column>
              <!-- <el-table-column prop="prjName" label="项目名称"> </el-table-column> -->
              <el-table-column prop="invoicingDate" label="日期"> </el-table-column>
              <el-table-column fixed="right" label="操作" :show-overflow-tooltip="false">
                <template slot-scope="scope">
                  <el-button
                    v-hasPermi="['produce:invoice1:info']"
                    @click="handleCheck(scope.row)"
                    type="text"
                    size="small"
                    style="font-size: 14px"
                    >查看</el-button
                  >
                  <el-button
                    v-hasPermi="['produce:invoice1:edit']"
                    type="text"
                    size="small"
                    @click="handleEdit(scope.row)"
                    style="font-size: 14px"
                    >编辑</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div v-show="flag == 2">
        <div class="tmain">
          <div class="top">
            <el-button
              v-hasPermi="['produce:payment0:add']"
              type="primary"
              @click="addC3"
              icon="el-icon-plus"
            >
              添加</el-button
            >
          </div>
          <div class="body">
            <el-table
              :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
              :cell-style="{ textAlign: 'left' }"
              :data="tableData3"
              style="width: 100%"
              max-height="560"
              ref="multipleTable"
              row-key="id"
              v-loading="loading"
            >
              <el-table-column type="selection" width="55" reserve-selection />
              <el-table-column prop="contNumber" label="合同编号"></el-table-column>
              <el-table-column prop="contName" label="合同名称"> </el-table-column>
              <!-- <el-table-column prop="prjName" label="项目名称"> </el-table-column> -->
              <el-table-column prop="handledByName" label="经办人"> </el-table-column>
              <!-- <el-table-column prop="nodeName" label="节点名称"> </el-table-column> -->
              <el-table-column prop="period" label="期次"> </el-table-column>
              <el-table-column prop="paymentDate" label="收付款日期"> </el-table-column>
              <el-table-column fixed="right" label="操作" :show-overflow-tooltip="false">
                <template slot-scope="scope">
                  <el-button
                    v-hasPermi="['produce:payment0:query']"
                    @click="handleCheck(scope.row)"
                    type="text"
                    size="small"
                    style="font-size: 14px"
                    >查看</el-button
                  >
                  <el-button
                    v-hasPermi="['produce:payment0:edit']"
                    type="text"
                    size="small"
                    @click="handleEdit(scope.row)"
                    style="font-size: 14px"
                    >编辑</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { proPayNodeList, proTickList, proPayRectList } from '@/api/data/project';

export default {
  name: 'Pay', //合同付款
  props: { uid: null },
  dicts: ['out_node_status'],
  data() {
    return {
      flag: 0,
      loading: true, // 遮罩层
      loading2: true, // 遮罩层
      loading3: true, // 遮罩层

      tableData: [], //信息表格数据
      tableData2: [], //信息表格数据
      tableData3: [], //信息表格数据
      dialogTableVisible: false,
      fileview: '', //文件预览地址
      ChooseOne: '', //当前弹窗目标
    };
  },
  created() {},
  methods: {
    //查询
    getList(id) {
      proPayNodeList(2, id).then((response) => {
        this.tableData = response.data;
        this.loading = false;
      });

      proTickList(2, id).then((response) => {
        this.tableData2 = response.data;
        this.loading2 = false;
      });

      proPayRectList(2, id).then((response) => {
        this.tableData3 = response.data;
        this.loading3 = false;
      });
    },

    tolish() {
      this.flag = 0;
    },
    tohis() {
      this.flag = 1;
    },
    tohis2() {
      this.flag = 2;
    },

    //添加
    // addC() {
    //   this.$router.push({ path: '/data-d/projectContractAdd' });
    // },

    // //查看
    // handleCheck(row) {
    //   this.$router.push({ path: '/data-d/projectContractInfo', query: { id: row.id } });
    // },

    //编辑
    handleEdit(row) {
      this.$router.push({ path: '/production-d/paymentNodeEdit', query: { id: row.id } });
    },

    //查看
    handleCheck2(row) {
      console.log(row);
      this.$router.push({ path: '/production-d/receiptRecordInfo', query: { id: row.id } });
    },

    //编辑
    handleEdit2(row) {
      this.$router.push({ path: '/production-d/receiptRecordEdit', query: { id: row.id } });
    },

    //添加
    addC2() {
      this.$router.push({ path: '/production-d/receiptRecordAdd' });
    },

    //查看
    handleCheck3(row) {
      console.log(row);
      this.$router.push({ path: '/production-d/paymentRequestInfo', query: { id: row.id } });
    },

    //编辑
    handleEdit3(row) {
      console.log(row);
      this.$router.push({ path: '/production-d/paymentRequestEdit', query: { id: row.id } });
    },

    //添加
    addC3() {
      this.$router.push({ path: '/production-d/paymentRequestAdd' });
    },
  },
  // watch: {
  //   uid: {
  //     handler(val) {
  //       if (val) {
  //         console.log('参数:' + val);
  //         this.getList(val);
  //       }
  //     },
  //     deep: true,
  //     immediate: true,
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.main {
  .mb {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #e4e6ed;
    .tmain {
      .top {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
