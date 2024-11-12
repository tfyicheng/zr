<template class="app-container">
  <div class="main">
    <div class="mt">
      <el-button round :type="flag == 0 ? 'primary' : null" @click="tolish">项目合同</el-button>
      <el-button round :type="flag == 1 ? 'primary' : null" @click="tohis">外委合同</el-button>
    </div>
    <div class="mb">
      <div v-show="flag == 0">
        <div class="tmain">
          <div class="top">
            <el-button
              v-hasPermi="['contract:project:add']"
              type="primary"
              @click="addC"
              icon="el-icon-plus"
            >
              添加</el-button
            >
          </div>
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
              <el-table-column prop="contNumber" label="合同编号"> </el-table-column>
              <el-table-column prop="contName" label="合同名称"> </el-table-column>
              <el-table-column label="合同类型">
                <template slot-scope="scope">
                  {{
                    dict.type.cont_type[scope.row.contType]
                      ? dict.type.cont_type[scope.row.contType].label
                      : ''
                  }}
                </template>
              </el-table-column>
              <el-table-column label="合同状态">
                <template slot-scope="scope">
                  {{
                    dict.type.contract_status[scope.row.status]
                      ? dict.type.contract_status[scope.row.status].label
                      : ''
                  }}
                </template>
              </el-table-column>

              <el-table-column prop="clientName" label="客户名称"> </el-table-column>
              <el-table-column prop="deptName" label="部门"> </el-table-column>
              <el-table-column prop="contacts" label="联系人"> </el-table-column>
              <el-table-column prop="contStartDate" label="签订日期"> </el-table-column>
              <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                  <el-button
                    v-hasPermi="['contract:project:query']"
                    @click="handleCheck(scope.row)"
                    type="text"
                    size="small"
                    style="font-size: 14px"
                    >查看</el-button
                  >
                  <el-button
                    v-hasPermi="['contract:project:edit']"
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
              v-hasPermi="['contract:outsourcing:add']"
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
              v-loading="loading2"
            >
              <!-- <el-table-column type="selection" width="55" reserve-selection /> -->
              <!-- <el-table-column prop="id" label="ID"></el-table-column> -->
              <el-table-column prop="contNumber" label="合同编号"> </el-table-column>
              <el-table-column prop="contName" label="合同名称"> </el-table-column>
              <!-- <el-table-column label="合同类型">
                <template slot-scope="scope">
                  {{
                    dict.type.cont_type[scope.row.contType]
                      ? dict.type.cont_type[scope.row.contType].label
                      : ''
                  }}
                </template>
              </el-table-column> -->
              <el-table-column label="合同状态">
                <template slot-scope="scope">
                  {{
                    dict.type.contract_status[scope.row.status]
                      ? dict.type.contract_status[scope.row.status].label
                      : ''
                  }}
                </template>
              </el-table-column>

              <el-table-column prop="clientName" label="客户名称"> </el-table-column>
              <el-table-column prop="deptName" label="部门"> </el-table-column>
              <el-table-column prop="contacts" label="联系人"> </el-table-column>
              <el-table-column prop="contStartDate" label="签订日期"> </el-table-column>
              <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                  <el-button
                    v-hasPermi="['contract:outsourcing:query']"
                    @click="handleCheck2(scope.row)"
                    type="text"
                    size="small"
                    style="font-size: 14px"
                    >查看</el-button
                  >
                  <el-button
                    v-hasPermi="['contract:outsourcing:edit']"
                    type="text"
                    size="small"
                    @click="handleEdit2(scope.row)"
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
import { proContList } from '@/api/data/project';

export default {
  name: 'Cont', //项目合同
  props: { uid: null },
  dicts: ['handover_status', 'project_role', 'reason_handover', 'cont_type', 'contract_status'],
  data() {
    return {
      flag: 0,
      loading: true, // 遮罩层
      loading2: true, // 遮罩层

      tableData: [], //信息表格数据
      tableData2: [], //信息表格数据
      dialogTableVisible: false,
      dialogTableVisible2: false,
      fileview: '', //文件预览地址
      ChooseOne: '', //当前弹窗目标
    };
  },
  created() {},
  methods: {
    //查询
    getList(id) {
      proContList(id, 0).then((response) => {
        this.tableData = response.data;
        this.loading = false;
      });

      proContList(id, 1).then((response) => {
        this.tableData2 = response.data;
        this.loading2 = false;
      });
    },

    tolish() {
      this.flag = 0;
    },
    tohis() {
      this.flag = 1;
    },

    //添加
    addC() {
      this.$router.push({ path: '/data-d/projectContractAdd' });
    },

    //查看
    handleCheck(row) {
      this.$router.push({ path: '/data-d/projectContractInfo', query: { id: row.id } });
    },

    //编辑
    handleEdit(row) {
      this.$router.push({ path: '/data-d/projectContractEdit', query: { id: row.id } });
    },

    //添加
    addC2() {
      this.$router.push({ path: '/data-d/outsourcingContractAdd' });
    },

    //查看
    handleCheck2(row) {
      console.log(row);
      this.$router.push({ path: '/data-d/outsourcingContractInfo', query: { id: row.id } });
    },

    //编辑
    handleEdit2(row) {
      this.$router.push({ path: '/data-d/outsourcingContractEdit', query: { id: row.id } });
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
